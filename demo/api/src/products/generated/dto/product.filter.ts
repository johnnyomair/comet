// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { BooleanFilter, createEnumFilter, DateFilter, ManyToOneFilter, NumberFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

import { ProductType } from "../../entities/product-type.enum";

@InputType()
class ProductTypeEnumFilter extends createEnumFilter(ProductType) {}

@InputType()
export class ProductFilter {
    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    title?: StringFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    visible?: BooleanFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    slug?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    description?: StringFilter;

    @Field(() => ProductTypeEnumFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ProductTypeEnumFilter)
    type?: ProductTypeEnumFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    price?: NumberFilter;

    @Field(() => BooleanFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => BooleanFilter)
    inStock?: BooleanFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    soldCount?: NumberFilter;

    @Field(() => DateFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateFilter)
    availableSince?: DateFilter;

    @Field(() => ManyToOneFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToOneFilter)
    category?: ManyToOneFilter;

    @Field(() => DateFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateFilter)
    createdAt?: DateFilter;

    @Field(() => DateFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateFilter)
    updatedAt?: DateFilter;

    @Field(() => ManyToOneFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToOneFilter)
    manufacturer?: ManyToOneFilter;

    @Field(() => [ProductFilter], { nullable: true })
    @Type(() => ProductFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductFilter[];

    @Field(() => [ProductFilter], { nullable: true })
    @Type(() => ProductFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductFilter[];
}
