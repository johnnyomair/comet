// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { IsSlug, PartialType } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class ProductCategoryInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsSlug()
    @Field()
    slug: string;

    @Field(() => [String])
    @IsArray()
    @IsUUID(undefined, { each: true })
    products: string[];
}

@InputType()
export class ProductCategoryUpdateInput extends PartialType(ProductCategoryInput) {}
