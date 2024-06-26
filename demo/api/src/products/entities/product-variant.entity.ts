import { BlockDataInterface, RootBlock, RootBlockEntity } from "@comet/blocks-api";
import { CrudField, DamImageBlock, RootBlockDataScalar, RootBlockType } from "@comet/cms-api";
import { BaseEntity, Entity, ManyToOne, OptionalProps, PrimaryKey, Property, Ref } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";

import { Product } from "./product.entity";

@ObjectType()
@Entity()
@RootBlockEntity()
export class ProductVariant extends BaseEntity<ProductVariant, "id"> {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property()
    @Field()
    name: string;

    @Property({ customType: new RootBlockType(DamImageBlock) })
    @Field(() => RootBlockDataScalar(DamImageBlock))
    @RootBlock(DamImageBlock)
    image: BlockDataInterface;

    @ManyToOne(() => Product, { ref: true })
    @CrudField({
        resolveField: true, // default is true
        // search: true, // not yet supported for nested
        // filter: true, // not yet supported for nested
        // sort: true, // not yet supported for nested
        // input: true, // not supported for nested, doesn't make sense
    })
    product: Ref<Product>;

    @Property()
    @Field()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
