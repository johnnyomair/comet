// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { IsNullable, PartialType } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

import { Address, AddressAsEmbeddable } from "../../entities/manufacturer.entity";

@InputType()
export class ManufacturerInput {
    @IsNullable()
    @ValidateNested()
    @Type(() => Address)
    @Field(() => Address, { nullable: true })
    address?: Address;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressAsEmbeddable)
    @Field(() => AddressAsEmbeddable)
    addressAsEmbeddable: AddressAsEmbeddable;
}

@InputType()
export class ManufacturerUpdateInput extends PartialType(ManufacturerInput) {}