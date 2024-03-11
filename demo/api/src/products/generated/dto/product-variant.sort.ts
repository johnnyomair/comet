// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { SortDirection } from "@comet/cms-api";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

export enum ProductVariantSortField {
    name = "name",
    product = "product",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
}
registerEnumType(ProductVariantSortField, {
    name: "ProductVariantSortField",
});

@InputType()
export class ProductVariantSort {
    @Field(() => ProductVariantSortField)
    @IsEnum(ProductVariantSortField)
    field: ProductVariantSortField;

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    @IsEnum(SortDirection)
    direction: SortDirection = SortDirection.ASC;
}
