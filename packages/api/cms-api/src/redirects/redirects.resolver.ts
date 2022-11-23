import { FindOptions, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { forwardRef, Inject, Type } from "@nestjs/common";
import { Args, ArgsType, CONTEXT, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request } from "express";

import { getRequestContextHeadersFromRequest } from "../common/decorators/request-context.decorator";
import { SubjectEntity } from "../common/decorators/subject-entity.decorator";
import { CometValidationException } from "../common/errors/validation.exception";
import { ScopeGuardActive } from "../content-scope/decorators/scope-guard-active.decorator";
import { validateNotModified } from "../document/validateNotModified";
import { PageTreeReadApi, PageTreeService } from "../page-tree/page-tree.service";
import { PageTreeNodeVisibility } from "../page-tree/types";
import { EmptyRedirectScope } from "./dto/empty-redirect-scope";
import { RedirectInputInterface } from "./dto/redirect-input.factory";
import { RedirectUpdateActivenessInput } from "./dto/redirect-update-activeness.input";
import { RedirectsArgsFactory } from "./dto/redirects-args.factory";
import { RedirectInterface } from "./entities/redirect-entity.factory";
import { RedirectsService } from "./redirects.service";
import { RedirectScopeInterface } from "./types";

export function createRedirectsResolver({
    Redirect,
    RedirectInput,
    Scope: PassedScope,
}: {
    Redirect: Type<RedirectInterface>;
    RedirectInput: Type<RedirectInputInterface>;
    Scope?: Type<RedirectScopeInterface>;
}): Type<unknown> {
    const Scope = PassedScope || EmptyRedirectScope;

    const hasNonEmptyScope = !!PassedScope;

    function nonEmptyScopeOrNothing(scope: RedirectScopeInterface): RedirectScopeInterface | undefined {
        // GraphQL sends the scope object with a null prototype ([Object: null prototype] { <key>: <value> }), but MikroORM uses the
        // object's hasOwnProperty method internally, resulting in a "object.hasOwnProperty is not a function" error. To fix this, we
        // create a "real" JavaScript object by using the spread operator.
        // See https://github.com/mikro-orm/mikro-orm/issues/2846 for more information.
        return hasNonEmptyScope ? { ...scope } : undefined;
    }

    @ArgsType()
    class RedirectsArgs extends RedirectsArgsFactory.create({ Scope }) {}

    @Resolver(() => Redirect)
    @ScopeGuardActive(hasNonEmptyScope)
    class RedirectsResolver {
        protected pageTreeReadApi: PageTreeReadApi;

        constructor(
            private readonly redirectService: RedirectsService,
            @InjectRepository("Redirect") private readonly repository: EntityRepository<RedirectInterface>,
            @Inject(forwardRef(() => PageTreeService)) private readonly pageTreeService: PageTreeService,
            @Inject(CONTEXT) private context: { req: Request },
        ) {
            const { includeInvisiblePages } = getRequestContextHeadersFromRequest(this.context.req);
            this.pageTreeReadApi = this.pageTreeService.createReadApi({
                visibility: [PageTreeNodeVisibility.Published, ...(includeInvisiblePages || [])],
            });
        }

        @Query(() => [Redirect])
        async redirects(@Args() { scope, query, type, active, sortColumnName, sortDirection }: RedirectsArgs): Promise<RedirectInterface[]> {
            const where = this.redirectService.getFindCondition({ query, type, active });
            if (hasNonEmptyScope) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (where as any).scope = scope;
            }

            const options: FindOptions<RedirectInterface> = {};
            if (sortColumnName) {
                options.orderBy = { [sortColumnName]: sortDirection };
            }

            return this.repository.find(where, options);
        }

        @Query(() => Redirect)
        @SubjectEntity(Redirect)
        async redirect(@Args("id", { type: () => ID }) id: string): Promise<RedirectInterface | null> {
            const redirect = await this.repository.findOne(id);
            return redirect ?? null;
        }

        @Query(() => Boolean)
        async redirectSourceAvailable(
            @Args("scope", { type: () => Scope, defaultValue: hasNonEmptyScope ? undefined : {} }) scope: typeof Scope,
            @Args("source", { type: () => String }) source: string,
        ): Promise<boolean> {
            const redirect = await this.repository.findOne({ source, ...(hasNonEmptyScope ? { scope: nonEmptyScopeOrNothing(scope) } : {}) });
            return redirect === null;
        }

        @Mutation(() => Redirect)
        async createRedirect(
            @Args("scope", { type: () => Scope, defaultValue: hasNonEmptyScope ? undefined : {} }) scope: typeof Scope,
            @Args("input", { type: () => RedirectInput }) input: RedirectInputInterface,
        ): Promise<RedirectInterface> {
            const tranformedInput = plainToInstance(RedirectInput, input);

            const errors = await validate(tranformedInput, { whitelist: true, forbidNonWhitelisted: true });

            if (errors.length > 0) {
                throw new CometValidationException("Validation failed", errors);
            }

            const entity = this.repository.create({
                scope: nonEmptyScopeOrNothing(scope),
                ...tranformedInput,
                target: tranformedInput.target.transformToBlockData(),
            });
            await this.repository.persistAndFlush(entity);
            return this.repository.findOneOrFail(entity.id);
        }

        @Mutation(() => Redirect)
        @SubjectEntity(Redirect)
        async updateRedirect(
            @Args("id", { type: () => ID }) id: string,
            @Args("input", { type: () => RedirectInput }) input: RedirectInputInterface,
            @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
        ): Promise<RedirectInterface> {
            const tranformedInput = plainToInstance(RedirectInput, input);

            const errors = await validate(tranformedInput, { whitelist: true, forbidNonWhitelisted: true });

            if (errors.length > 0) {
                throw new CometValidationException("Validation failed", errors);
            }

            const redirect = await this.repository.findOneOrFail(id);
            if (redirect != null && lastUpdatedAt) {
                validateNotModified(redirect, lastUpdatedAt);
            }

            wrap(redirect).assign({ ...tranformedInput, target: tranformedInput.target.transformToBlockData() });
            await this.repository.persistAndFlush(redirect);
            return this.repository.findOneOrFail(id);
        }

        @Mutation(() => Redirect)
        @SubjectEntity(Redirect)
        async updateRedirectActiveness(
            @Args("id", { type: () => ID }) id: string,
            @Args("input", { type: () => RedirectUpdateActivenessInput }) input: RedirectUpdateActivenessInput,
        ): Promise<RedirectInterface> {
            const redirect = await this.repository.findOneOrFail(id);

            wrap(redirect).assign({ active: input.active });
            await this.repository.persistAndFlush(redirect);

            return this.repository.findOneOrFail(id);
        }

        @Mutation(() => Boolean)
        @SubjectEntity(Redirect)
        async deleteRedirect(@Args("id", { type: () => ID }) id: string): Promise<boolean> {
            const entity = await this.repository.findOneOrFail(id);
            await this.repository.removeAndFlush(entity);
            return true;
        }
    }

    return RedirectsResolver;
}