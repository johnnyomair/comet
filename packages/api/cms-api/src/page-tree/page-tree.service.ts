import { EntityManager } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { forwardRef, Inject, Injectable, Scope } from "@nestjs/common";

import { CometValidationException } from "../common/errors/validation.exception";
import { RedirectsService } from "../redirects/redirects.service";
import { AttachedDocumentStrictInput } from "./dto/attached-document.input";
import { MovePageTreeNodesByPosInput, PageTreeNodeBaseCreateInput } from "./dto/page-tree-node.input";
import { AttachedDocument } from "./entities/attached-document.entity";
import { PAGE_TREE_CONFIG, PAGE_TREE_REPOSITORY } from "./page-tree.constants";
import { PageTreeConfig } from "./page-tree.module";
import { createReadApi, PageTreeReadApi } from "./page-tree-read-api";
import {
    PageTreeNodeCategory,
    PageTreeNodeInterface,
    PageTreeNodeUpdateInputInterface,
    PageTreeNodeVisibility,
    PageTreeNodeVisibility as Visibility,
    ScopeInterface,
} from "./types";
export { PageTreeReadApi } from "./page-tree-read-api";

@Injectable({ scope: Scope.REQUEST })
export class PageTreeService {
    private readApi = new Map<string, PageTreeReadApi>();
    constructor(
        @Inject(forwardRef(() => PAGE_TREE_REPOSITORY)) public readonly pageTreeRepository: EntityRepository<PageTreeNodeInterface>,
        @InjectRepository(AttachedDocument) public readonly attachedDocumentsRepository: EntityRepository<AttachedDocument>,
        private readonly em: EntityManager,
        private readonly redirectsService: RedirectsService,
        @Inject(PAGE_TREE_CONFIG) private readonly config: PageTreeConfig,
    ) {}

    async createNode(input: PageTreeNodeBaseCreateInput, category: PageTreeNodeCategory, scope?: ScopeInterface): Promise<PageTreeNodeInterface> {
        // TODO: check for unique id
        // TODO: check ParentId
        const readApi = this.getReadApi({ visibility: "all" });

        const path = await this.pathForParentAndSlug(input.parentId || null, input.slug);

        if (this.config.reservedPaths.includes(path)) {
            throw new CometValidationException("Reserved path");
        }

        const nodeWithSamePath = await this.nodeWithSamePath(path, scope);
        if (nodeWithSamePath) {
            throw new CometValidationException("Slug leads to duplicate path");
        }

        const { attachedDocument: attachedDocumentInput, parentId, ...restInput } = input;

        const siblingNodeWithHighestPosition = await this.pageTreeRepository
            .createQueryBuilder()
            .where({
                parentId: parentId ?? null,
                scope,
            })
            .orderBy({ pos: "DESC" })
            .getSingleResult();

        // insert newly created nodes at the last position
        const pos = siblingNodeWithHighestPosition ? siblingNodeWithHighestPosition.pos + 1 : 1;

        const newNode = this.pageTreeRepository.create({
            ...restInput,
            parentId,
            pos,
            visibility: input.slug === "home" ? Visibility.Published : Visibility.Unpublished,
            scope,
            category,
            documentType: attachedDocumentInput.type,
        });
        await this.pageTreeRepository.persistAndFlush(newNode);

        if (attachedDocumentInput.id) {
            await this.attachedDocumentsRepository.persistAndFlush(
                this.attachedDocumentsRepository.create({
                    pageTreeNodeId: newNode.id,
                    type: attachedDocumentInput.type,
                    documentId: attachedDocumentInput.id,
                }),
            );
        }

        return readApi.getNodeOrFail(newNode.id);
    }

    async updateNode(id: string, input: PageTreeNodeUpdateInputInterface): Promise<PageTreeNodeInterface> {
        const readApi = this.getReadApi({ visibility: "all" });

        const existingNode = await readApi.getNodeOrFail(id);
        if (!existingNode) throw new Error("Can't find page-tree-node with id");

        if (existingNode.slug != input.slug) {
            await this.redirectsService.createAutomaticRedirects(existingNode);
        }

        const existingNodePath = await readApi.nodePath(existingNode);
        const newPath = this.newPathForSlug(existingNodePath, input.slug);

        if (this.config.reservedPaths.includes(newPath)) {
            throw new CometValidationException("Reserved path");
        }

        const nodeWithSamePath = await this.nodeWithSamePath(newPath, existingNode.scope);

        if (nodeWithSamePath && nodeWithSamePath.id !== id) {
            throw new CometValidationException("Slug leads to duplicate path");
        }

        const { attachedDocument: attachedDocumentInput, ...restInput } = input;

        // check if attached document exists
        if (attachedDocumentInput.id) {
            const document = await this.resolveDocument(attachedDocumentInput.type, attachedDocumentInput.id);
            if (!document) {
                throw new Error(`The assigned document does not exist or is not of type ${attachedDocumentInput.type}`);
            }

            // check if document is already attached and attach if not
            const attachedDocument = await this.attachedDocumentsRepository.findOne({ pageTreeNodeId: id, documentId: attachedDocumentInput.id });
            if (!attachedDocument) {
                await this.attachedDocumentsRepository.persistAndFlush(
                    this.attachedDocumentsRepository.create({
                        pageTreeNodeId: id,
                        type: attachedDocumentInput.type,
                        documentId: attachedDocumentInput.id,
                    }),
                );
            }
        }

        await this.pageTreeRepository.persistAndFlush(
            existingNode.assign({
                ...restInput,
                documentType: attachedDocumentInput.type,
            }),
        );

        return readApi.getNodeOrFail(id); // refresh data
    }

    async updateNodeVisibility(id: string, newVisibility: Visibility): Promise<void> {
        const node = await this.getReadApi({ visibility: "all" }).getNodeOrFail(id);
        if (!node) throw new Error("Can't find page-tree-node with id");

        if (node.slug === "home" && newVisibility !== PageTreeNodeVisibility.Published) {
            throw new Error(`Page "home" cannot be ${newVisibility.toLowerCase()}`);
        }

        let changedSlug: string | undefined = undefined;
        if (node.visibility === PageTreeNodeVisibility.Archived && newVisibility !== PageTreeNodeVisibility.Archived) {
            const readApi = this.getReadApi({ visibility: "all" });
            const existingNodePath = await readApi.nodePath(node);
            const slug = node.slug;

            let slugIncrement = 0;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const nextSlugToTest = slugIncrement ? `${slug}-${slugIncrement}` : slug;

                const newPath = this.newPathForSlug(existingNodePath, nextSlugToTest);
                const nodeWithSamePath = await this.nodeWithSamePath(newPath, node.scope);

                if (!nodeWithSamePath) {
                    break;
                }
                slugIncrement++;
            }
            changedSlug = slugIncrement ? `${slug}-${slugIncrement}` : slug;
        }

        await this.pageTreeRepository
            .createQueryBuilder()
            .update({ visibility: newVisibility, slug: changedSlug ? changedSlug : node.slug })
            .where({ id })
            .execute();
    }

    async updateNodePosition(id: string, input: MovePageTreeNodesByPosInput): Promise<PageTreeNodeInterface> {
        const readApi = this.getReadApi({ visibility: "all" });
        const existingNode = await readApi.getNodeOrFail(id);
        if (!existingNode) throw new Error("Can't find page-tree-node with id");

        const requestedPath = await this.pathForParentAndSlug(input.parentId, existingNode.slug);

        if (this.config.reservedPaths.includes(requestedPath)) {
            throw new CometValidationException("Reserved path");
        }

        const nodeWithSamePath = await this.nodeWithSamePath(requestedPath, existingNode.scope);
        if (nodeWithSamePath && nodeWithSamePath.id !== existingNode.id) {
            // @TODO: Or handle gracefully by incrementing the slug ?
            throw new Error(`Path collision. The path ${requestedPath} is already used`);
        }

        const parentId = input.parentId;

        if (input.pos !== existingNode.pos || input.parentId !== existingNode.parentId) {
            await this.pageTreeRepository.persistAndFlush(existingNode.assign({ parentId, pos: input.pos }));

            const qb = this.pageTreeRepository
                .createQueryBuilder()
                .select(["id", "pos"])
                .where({
                    pos: { $gte: input.pos },
                    id: { $ne: id },
                    parentId,
                });

            if (parentId) {
                qb.andWhere({ parentId });
            }

            if (existingNode.scope) {
                qb.andWhere({ scope: existingNode.scope });
            }

            const nodesToIncrement = await qb.getResultList();
            await this.pageTreeRepository.persistAndFlush(nodesToIncrement.map((c) => c.assign({ pos: c.pos + 1 })));
        }

        return readApi.getNodeOrFail(existingNode.id);
    }

    async updateCategory(id: string, category: PageTreeNodeCategory): Promise<void> {
        const readApi = this.getReadApi({ visibility: "all" });

        const node = await readApi.getNodeOrFail(id);

        if (!node) {
            throw new Error("Can't find page-tree-node with id");
        }

        const descendants = await readApi.getDescendants(node);

        await this.pageTreeRepository
            .createQueryBuilder()
            .update({ category })
            .where({ id: { $in: descendants.map((node) => node.id) } })
            .execute();

        const rootNodes = await readApi.pageTreeRootNodeList({ category, scope: node.scope });

        // 0 is added to avoid negative infinity for empty array
        const lastPosition = Math.max(0, ...rootNodes.map((node) => node.pos)) + 1;

        await this.pageTreeRepository.persistAndFlush(node.assign({ category, parentId: null, pos: lastPosition }));
    }

    async delete(pageTreeNode: PageTreeNodeInterface): Promise<boolean> {
        if (pageTreeNode.slug === "home") {
            throw new Error(`Page "home" cannot be deleted`);
        }

        const readApi = this.getReadApi();
        const childNodes = await readApi.getChildNodes(pageTreeNode);

        // recursively delete all child nodes
        for (const childNode of childNodes) {
            await this.delete(childNode);
        }

        // 1. Delete all attached documents
        const attachedDocuments = await this.attachedDocumentsRepository.find({ pageTreeNodeId: pageTreeNode.id });
        for (const attachedDocument of attachedDocuments) {
            if (attachedDocument.id) {
                try {
                    const repository = this.em.getRepository(attachedDocument.type);
                    await repository.removeAndFlush(attachedDocument);
                    await this.attachedDocumentsRepository.removeAndFlush(attachedDocument);
                } catch {
                    throw new Error(`documentType ${attachedDocument.type} and documentId ${attachedDocument.id} cannot resolve`);
                }
            }
        }

        // 2. Delete page tree node itself
        try {
            await this.pageTreeRepository.removeAndFlush(pageTreeNode);
            return true;
        } catch {
            return false;
        }
    }

    async resolveDocument(documentType: string, documentId: string): Promise<unknown | null> {
        try {
            const repository = this.em.getRepository(documentType);
            const document = await repository.findOne(documentId);
            return document ?? null;
        } catch {
            throw new Error(`documentType ${documentType} and documentId ${documentId} cannot resolve`);
        }
    }

    async getAttachedDocuments(pageTreeNodeId: string): Promise<AttachedDocument[]> {
        return this.attachedDocumentsRepository.find({ pageTreeNodeId: pageTreeNodeId });
    }

    async getActiveAttachedDocument(pageTreeNodeId: string, activeType: string): Promise<AttachedDocument | null> {
        const node = await this.pageTreeRepository.findOneOrFail(pageTreeNodeId);

        if (node.documentType !== activeType) {
            return null;
        }

        const activeDocument = await this.attachedDocumentsRepository.findOne({ pageTreeNodeId: pageTreeNodeId, type: activeType });
        if (!activeDocument) {
            return null;
        }

        return activeDocument;
    }

    async attachDocument(attachedDocumentInput: AttachedDocumentStrictInput, pageTreeId: string): Promise<void> {
        const node = await this.pageTreeRepository.findOne(pageTreeId);
        if (!node) {
            throw new Error(`Can't find page-tree-node with id ${pageTreeId}`);
        }
        const resolvedDocument = await this.resolveDocument(attachedDocumentInput.type, attachedDocumentInput.id);
        if (!resolvedDocument) {
            throw new Error(`The assigned document does not exist or is not of type ${attachedDocumentInput.type}`);
        }

        // check if document is already attached and attach if not
        const attachedDocument = await this.attachedDocumentsRepository.findOne({ pageTreeNodeId: node.id, documentId: attachedDocumentInput.id });

        if (!attachedDocument) {
            this.attachedDocumentsRepository.persist(
                this.attachedDocumentsRepository.create({
                    pageTreeNodeId: node.id,
                    type: attachedDocumentInput.type,
                    documentId: attachedDocumentInput.id,
                }),
            );
        }
    }

    public async pathForParentAndSlug(parentId: null | string, slug: string): Promise<string> {
        const readApi = this.getReadApi({ visibility: "all" });

        let parentPath = parentId ? await readApi.nodePathById(parentId) : "";

        if (parentPath === "/") {
            parentPath = "/home";
        }

        return `${parentPath}/${slug}`;
    }

    public async nodeWithSamePath(path: string, scope?: ScopeInterface): Promise<PageTreeNodeInterface | null> {
        return this.getReadApi({ visibility: [Visibility.Published, Visibility.Unpublished] }).getNodeByPath(path, {
            scope,
        }); // Slugs of archived pages can be reused
    }

    /**
     * @deprecated use getReadApi instead
     */
    createReadApi(
        options: {
            visibility?: Visibility | Visibility[] | "all";
        } = {},
    ): PageTreeReadApi {
        return this.getReadApi(options);
    }

    getReadApi(
        options: {
            visibility?: Visibility | Visibility[] | "all";
        } = {},
    ): PageTreeReadApi {
        const key = JSON.stringify(options);
        if (!this.readApi.has(key)) {
            this.readApi.set(key, createReadApi(this, options));
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.readApi.get(key)!;
    }

    private newPathForSlug(existingNodePath: string, slug: string): string {
        const parentPath = existingNodePath.split("/").slice(0, -1).join("/");
        const newPath = `${parentPath || ""}/${slug}`;
        return newPath;
    }
}
