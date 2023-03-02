import { EntityRepository } from "@mikro-orm/postgresql";
import { LinkBlock } from "@src/common/blocks/linkBlock/link.block";
import { PageTreeNodesFixtures } from "@src/db/fixtures/fixtures.console";
import { Link } from "@src/links/entities/link.entity";
import { InternalLinkBlock } from "@src/pages/blocks/InternalLinkBlock";

export const generateLinks = async (linksRepository: EntityRepository<Link>, pageTreeNodes: PageTreeNodesFixtures): Promise<void> => {
    await linksRepository.persistAndFlush(
        linksRepository.create({
            id: "46ce964c-f029-46f0-9961-ef436e2391f2",
            content: LinkBlock.blockInputFactory({
                attachedBlocks: [
                    {
                        type: "internal",
                        props: InternalLinkBlock.blockInputFactory({
                            targetPageId: pageTreeNodes.home?.id,
                        }),
                    },
                ],
                activeType: "internal",
            }).transformToBlockData(),
        }),
    );
};
