// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { PartialType } from "@comet/cms-api";
import { Field, ID, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class ProductTagInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @Field(() => [ID], { defaultValue: [] })
    @IsArray()
    @IsUUID(undefined, { each: true })
    products: string[];
}

@InputType()
export class ProductTagUpdateInput extends PartialType(ProductTagInput) {}
