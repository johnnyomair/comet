import { BlockDataInterface, RootBlock, RootBlockEntity } from "@comet/blocks-api";
import { DocumentInterface, RootBlockType } from "@comet/cms-api";
import { BaseEntity, Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { v4 as uuid } from "uuid";

import { PageContentBlock } from "../blocks/PageContentBlock";
import { SeoBlock } from "../blocks/seo.block";

@Entity()
@ObjectType({
    implements: () => [DocumentInterface],
})
@RootBlockEntity()
export class Page extends BaseEntity<Page, "id"> implements DocumentInterface {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @PrimaryKey({ columnType: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @RootBlock(PageContentBlock)
    @Property({ customType: new RootBlockType(PageContentBlock) })
    @Field(() => GraphQLJSONObject)
    content: BlockDataInterface;

    @Property({ customType: new RootBlockType(SeoBlock) })
    @Field(() => GraphQLJSONObject)
    seo: BlockDataInterface;

    @Property({
        columnType: "timestamp with time zone",
    })
    @Field()
    createdAt: Date = new Date();

    @Property({
        columnType: "timestamp with time zone",
        onUpdate: () => new Date(),
    })
    @Field()
    updatedAt: Date = new Date();
}