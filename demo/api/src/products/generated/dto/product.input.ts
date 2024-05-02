// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { BlockInputInterface, isBlockInputInterface } from "@comet/blocks-api";
import { DamImageBlock, IsNullable, IsSlug, PartialType, RootBlockInputScalar } from "@comet/cms-api";
import { Field, ID, InputType } from "@nestjs/graphql";
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";

import { ProductDimensions, ProductDiscounts, ProductStatus } from "../../entities/product.entity";
import { ProductType } from "../../entities/product-type.enum";
<<<<<<< HEAD
import { ProductColorInput } from "./product-color.nested.input";
import { ProductStatisticsInput } from "./product-statistics.nested.input";
=======
import { ProductNestedProductStatisticsInput } from "./product-nested-product-statistics.input";
import { ProductNestedProductToTagInput } from "./product-nested-product-to-tag.input";
import { ProductNestedProductVariantInput } from "./product-nested-product-variant.input";
>>>>>>> main

@InputType()
export class ProductInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @IsNotEmpty()
    @IsEnum(ProductStatus)
    @Field(() => ProductStatus, { defaultValue: ProductStatus.Unpublished })
    status: ProductStatus;

    @IsNotEmpty()
    @IsString()
    @IsSlug()
    @Field()
    slug: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    description: string;

    @IsNotEmpty()
    @IsEnum(ProductType)
    @Field(() => ProductType)
    type: ProductType;

    @IsNullable()
    @IsNumber()
    @Field({ nullable: true, defaultValue: null })
    price?: number;

    @IsNotEmpty()
    @IsBoolean()
    @Field({ defaultValue: true })
    inStock: boolean;

    @IsNullable()
    @IsDate()
    @Field({ nullable: true, defaultValue: null })
    availableSince?: Date;

    @IsNotEmpty()
    @Field(() => RootBlockInputScalar(DamImageBlock))
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : DamImageBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    image: BlockInputInterface;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => ProductDiscounts)
    @Field(() => [ProductDiscounts], { defaultValue: [] })
    discounts: ProductDiscounts[];

    @IsNotEmpty()
    @IsArray()
    @Field(() => [String], { defaultValue: [] })
    @IsString({ each: true })
    articleNumbers: string[];

    @IsNullable()
    @ValidateNested()
    @Type(() => ProductDimensions)
    @Field(() => ProductDimensions, { nullable: true })
    dimensions?: ProductDimensions;

    @IsNullable()
    @Field(() => ProductNestedProductStatisticsInput, { nullable: true })
    @Type(() => ProductNestedProductStatisticsInput)
    @ValidateNested()
    statistics?: ProductNestedProductStatisticsInput;

<<<<<<< HEAD
    @Field(() => [ProductColorInput], { defaultValue: [] })
    @IsArray()
    @Type(() => ProductColorInput)
    colors: ProductColorInput[];
=======
    @Field(() => [ProductNestedProductVariantInput], { defaultValue: [] })
    @IsArray()
    @Type(() => ProductNestedProductVariantInput)
    variants: ProductNestedProductVariantInput[];
>>>>>>> main

    @IsNullable()
    @Field(() => ID, { nullable: true, defaultValue: null })
    @IsUUID()
    category?: string;

    @Field(() => [ID], { defaultValue: [] })
    @IsArray()
    @IsUUID(undefined, { each: true })
    tags: string[];

<<<<<<< HEAD
    @IsNullable()
    @Field(() => ID, { nullable: true, defaultValue: null })
    @IsUUID()
    manufacturer?: string;
=======
    @Field(() => [ProductNestedProductToTagInput], { defaultValue: [] })
    @IsArray()
    @Type(() => ProductNestedProductToTagInput)
    tagsWithStatus: ProductNestedProductToTagInput[];
>>>>>>> main
}

@InputType()
export class ProductUpdateInput extends PartialType(ProductInput) {}
