// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { DateFilter, NumberFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType()
export class ManufacturerFilter {
    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    addressAsEmbeddable_street?: StringFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    addressAsEmbeddable_streetNumber?: NumberFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    addressAsEmbeddable_zip?: NumberFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    addressAsEmbeddable_country?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    addressAsEmbeddable_alternativeAddress_street?: StringFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    addressAsEmbeddable_alternativeAddress_streetNumber?: NumberFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    addressAsEmbeddable_alternativeAddress_zip?: NumberFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    addressAsEmbeddable_alternativeAddress_country?: StringFilter;

    @Field(() => DateFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateFilter)
    updatedAt?: DateFilter;

    @Field(() => [ManufacturerFilter], { nullable: true })
    @Type(() => ManufacturerFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ManufacturerFilter[];

    @Field(() => [ManufacturerFilter], { nullable: true })
    @Type(() => ManufacturerFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ManufacturerFilter[];
}
