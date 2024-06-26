import { BlockDataInterface, RootBlock, RootBlockEntity } from "@comet/blocks-api";
import { CrudField, CrudGenerator, DamImageBlock, RootBlockDataScalar, RootBlockType } from "@comet/cms-api";
import {
    BaseEntity,
    Collection,
    Entity,
    Enum,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    OptionalProps,
    PrimaryKey,
    Property,
    Ref,
    types,
} from "@mikro-orm/core";
import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { v4 as uuid } from "uuid";

import { ProductCategory } from "./product-category.entity";
import { ProductStatistics } from "./product-statistics.entity";
import { ProductTag } from "./product-tag.entity";
import { ProductToTag } from "./product-to-tag.entity";
import { ProductType } from "./product-type.enum";
import { ProductVariant } from "./product-variant.entity";

@ObjectType()
@InputType("ProductDiscountsInput")
export class ProductDiscounts {
    @Field()
    @IsNumber()
    quantity: number;

    @Field()
    @IsNumber()
    price: number;
}

@ObjectType()
@InputType("ProductDimensionsInput")
export class ProductDimensions {
    @Field()
    @IsNumber()
    width: number;

    @Field()
    @IsNumber()
    height: number;

    @Field()
    @IsNumber()
    depth: number;
}

@ObjectType()
@Entity()
@RootBlockEntity<Product>({ isVisible: (product) => product.visible })
@CrudGenerator({ targetDirectory: `${__dirname}/../generated/` })
export class Product extends BaseEntity<Product, "id"> {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property()
    @Field()
    @CrudField({
        search: true, //default is true
        filter: true, //default is true
        sort: true, //default is true
        input: true, //default is true
    })
    title: string;

    @Property()
    @Field()
    visible: boolean;

    @Property()
    @Field()
    slug: string;

    @Property()
    @Field()
    description: string;

    @Enum({ items: () => ProductType })
    @Field(() => ProductType)
    type: ProductType;

    @Property({ type: types.decimal, nullable: true })
    @Field({ nullable: true })
    price?: number;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Property({ type: types.boolean })
    @Field()
    inStock: boolean = true;

    @Property({ type: types.decimal, nullable: true })
    @Field(() => Int, { nullable: true })
    @CrudField({
        input: false,
    })
    soldCount?: number;

    @Property({ customType: new RootBlockType(DamImageBlock) })
    @Field(() => RootBlockDataScalar(DamImageBlock))
    @RootBlock(DamImageBlock)
    image: BlockDataInterface;

    @Property({ type: "json" })
    @Field(() => [ProductDiscounts])
    discounts?: ProductDiscounts[] = [];

    @Property({ type: "json" })
    @Field(() => [String])
    articleNumbers?: string[] = [];

    @Property({ type: "json", nullable: true })
    @Field(() => ProductDimensions, { nullable: true })
    dimensions?: ProductDimensions = undefined;

    @OneToOne(() => ProductStatistics, { inversedBy: "product", owner: true, ref: true, nullable: true })
    @Field(() => ProductStatistics, { nullable: true })
    statistics?: Ref<ProductStatistics> = undefined;

    @OneToMany(() => ProductVariant, (variant) => variant.product, { orphanRemoval: true })
    @CrudField({
        resolveField: true, //default is true
        //search: true, //not yet implemented
        //filter: true, //not yet implemented
        //sort: true, //not yet implemented
        input: true, //default is true
    })
    variants = new Collection<ProductVariant>(this);

    @ManyToOne(() => ProductCategory, { nullable: true, ref: true })
    @CrudField({
        resolveField: true, //default is true
        search: true, //default is true
        filter: true, //default is true
        sort: true, //default is true
        input: true, //default is true
    })
    category?: Ref<ProductCategory> = undefined;

    @ManyToMany(() => ProductTag, "products", { owner: true })
    @CrudField({
        resolveField: true, //default is true
        //search: true, //not yet implemented
        //filter: true, //not yet implemented
        //sort: true, //not yet implemented
        input: true, //default is true
    })
    tags = new Collection<ProductTag>(this);

    @OneToMany(() => ProductToTag, (productToTag) => productToTag.product, { orphanRemoval: true })
    tagsWithStatus = new Collection<ProductToTag>(this);

    @Property()
    @Field()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
