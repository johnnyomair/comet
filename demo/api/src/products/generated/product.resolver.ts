// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { AffectedEntity, extractGraphqlFields, RequiredPermission, validateNotModified } from "@comet/cms-api";
import { FindOptions, Reference } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";

import { Product } from "../entities/product.entity";
import { ProductCategory } from "../entities/product-category.entity";
import { ProductStatistics } from "../entities/product-statistics.entity";
import { ProductTag } from "../entities/product-tag.entity";
import { ProductToTag } from "../entities/product-to-tag.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { PaginatedProducts } from "./dto/paginated-products";
import { ProductInput, ProductUpdateInput } from "./dto/product.input";
import { ProductsArgs } from "./dto/products.args";
import { ProductsService } from "./products.service";

@Resolver(() => Product)
@RequiredPermission(["products"], { skipScopeCheck: true })
export class ProductResolver {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly productsService: ProductsService,
        @InjectRepository(Product) private readonly repository: EntityRepository<Product>,
        @InjectRepository(ProductCategory) private readonly productCategoryRepository: EntityRepository<ProductCategory>,
        @InjectRepository(ProductStatistics) private readonly productStatisticsRepository: EntityRepository<ProductStatistics>,
        @InjectRepository(ProductVariant) private readonly productVariantRepository: EntityRepository<ProductVariant>,
        @InjectRepository(ProductToTag) private readonly productToTagRepository: EntityRepository<ProductToTag>,
        @InjectRepository(ProductTag) private readonly productTagRepository: EntityRepository<ProductTag>,
    ) {}

    @Query(() => Product)
    @AffectedEntity(Product)
    async product(@Args("id", { type: () => ID }) id: string): Promise<Product> {
        const product = await this.repository.findOneOrFail(id);
        return product;
    }

    @Query(() => Product, { nullable: true })
    async productBySlug(@Args("slug") slug: string): Promise<Product | null> {
        const product = await this.repository.findOne({ slug });

        return product ?? null;
    }

    @Query(() => PaginatedProducts)
    async products(@Args() { search, filter, sort, offset, limit }: ProductsArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProducts> {
        const where = this.productsService.getFindCondition({ search, filter });

        const fields = extractGraphqlFields(info, { root: "nodes" });
        const populate: string[] = [];
        if (fields.includes("category")) {
            populate.push("category");
        }
        if (fields.includes("variants")) {
            populate.push("variants");
        }
        if (fields.includes("tagsWithStatus")) {
            populate.push("tagsWithStatus");
        }
        if (fields.includes("tags")) {
            populate.push("tags");
        }
        if (fields.includes("statistics")) {
            populate.push("statistics");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: FindOptions<Product, any> = { offset, limit, populate };

        if (sort) {
            options.orderBy = sort.map((sortItem) => {
                return {
                    [sortItem.field]: sortItem.direction,
                };
            });
        }

        const [entities, totalCount] = await this.repository.findAndCount(where, options);
        return new PaginatedProducts(entities, totalCount);
    }

    @Mutation(() => Product)
    async createProduct(@Args("input", { type: () => ProductInput }) input: ProductInput): Promise<Product> {
        const {
            variants: variantsInput,
            tagsWithStatus: tagsWithStatusInput,
            tags: tagsInput,
            category: categoryInput,
            statistics: statisticsInput,
            image: imageInput,
            ...assignInput
        } = input;
        const product = this.repository.create({
            ...assignInput,
            visible: false,

            category: categoryInput ? Reference.create(await this.productCategoryRepository.findOneOrFail(categoryInput)) : undefined,
            image: imageInput.transformToBlockData(),
        });
        if (variantsInput) {
            await product.variants.loadItems();
            product.variants.set(
                variantsInput.map((variantInput) => {
                    const { image: imageInput, ...assignInput } = variantInput;
                    return this.productVariantRepository.assign(new ProductVariant(), {
                        ...assignInput,

                        image: imageInput.transformToBlockData(),
                    });
                }),
            );
        }
        if (tagsWithStatusInput) {
            await product.tagsWithStatus.loadItems();
            product.tagsWithStatus.set(
                await Promise.all(
                    tagsWithStatusInput.map(async (tagsWithStatusInput) => {
                        const { tag: tagInput, ...assignInput } = tagsWithStatusInput;
                        return this.productToTagRepository.assign(new ProductToTag(), {
                            ...assignInput,

                            tag: Reference.create(await this.productTagRepository.findOneOrFail(tagInput)),
                        });
                    }),
                ),
            );
        }
        if (tagsInput) {
            const tags = await this.productTagRepository.find({ id: tagsInput });
            if (tags.length != tagsInput.length) throw new Error("Couldn't find all tags that were passed as input");
            await product.tags.loadItems();
            product.tags.set(tags.map((tag) => Reference.create(tag)));
        }

        if (statisticsInput) {
            const statistic = new ProductStatistics();

            this.productStatisticsRepository.assign(statistic, {
                ...statisticsInput,
            });
        }

        await this.entityManager.flush();

        return product;
    }

    @Mutation(() => Product)
    @AffectedEntity(Product)
    async updateProduct(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductUpdateInput }) input: ProductUpdateInput,
        @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
    ): Promise<Product> {
        const product = await this.repository.findOneOrFail(id);
        if (lastUpdatedAt) {
            validateNotModified(product, lastUpdatedAt);
        }

        const {
            variants: variantsInput,
            tagsWithStatus: tagsWithStatusInput,
            tags: tagsInput,
            category: categoryInput,
            statistics: statisticsInput,
            image: imageInput,
            ...assignInput
        } = input;
        product.assign({
            ...assignInput,
        });
        if (variantsInput) {
            await product.variants.loadItems();
            product.variants.set(
                variantsInput.map((variantInput) => {
                    const { image: imageInput, ...assignInput } = variantInput;
                    return this.productVariantRepository.assign(new ProductVariant(), {
                        ...assignInput,

                        image: imageInput.transformToBlockData(),
                    });
                }),
            );
        }
        if (tagsWithStatusInput) {
            await product.tagsWithStatus.loadItems();
            product.tagsWithStatus.set(
                await Promise.all(
                    tagsWithStatusInput.map(async (tagsWithStatusInput) => {
                        const { tag: tagInput, ...assignInput } = tagsWithStatusInput;
                        return this.productToTagRepository.assign(new ProductToTag(), {
                            ...assignInput,

                            tag: Reference.create(await this.productTagRepository.findOneOrFail(tagInput)),
                        });
                    }),
                ),
            );
        }
        if (tagsInput) {
            const tags = await this.productTagRepository.find({ id: tagsInput });
            if (tags.length != tagsInput.length) throw new Error("Couldn't find all tags that were passed as input");
            await product.tags.loadItems();
            product.tags.set(tags.map((tag) => Reference.create(tag)));
        }

        if (statisticsInput) {
            const statistic = product.statistics ? await product.statistics.load() : new ProductStatistics();

            this.productStatisticsRepository.assign(statistic, {
                ...statisticsInput,
            });
        }
        if (categoryInput !== undefined) {
            product.category = categoryInput ? Reference.create(await this.productCategoryRepository.findOneOrFail(categoryInput)) : undefined;
        }

        if (imageInput) {
            product.image = imageInput.transformToBlockData();
        }

        await this.entityManager.flush();

        return product;
    }

    @Mutation(() => Boolean)
    @AffectedEntity(Product)
    async deleteProduct(@Args("id", { type: () => ID }) id: string): Promise<boolean> {
        const product = await this.repository.findOneOrFail(id);
        this.entityManager.remove(product);
        await this.entityManager.flush();
        return true;
    }

    @Mutation(() => Product)
    @AffectedEntity(Product)
    async updateProductVisibility(
        @Args("id", { type: () => ID }) id: string,
        @Args("visible", { type: () => Boolean }) visible: boolean,
    ): Promise<Product> {
        const product = await this.repository.findOneOrFail(id);

        product.assign({
            visible,
        });
        await this.entityManager.flush();

        return product;
    }

    @ResolveField(() => ProductCategory, { nullable: true })
    async category(@Parent() product: Product): Promise<ProductCategory | undefined> {
        return product.category?.load();
    }

    @ResolveField(() => [ProductVariant])
    async variants(@Parent() product: Product): Promise<ProductVariant[]> {
        return product.variants.loadItems();
    }

    @ResolveField(() => [ProductToTag])
    async tagsWithStatus(@Parent() product: Product): Promise<ProductToTag[]> {
        return product.tagsWithStatus.loadItems();
    }

    @ResolveField(() => [ProductTag])
    async tags(@Parent() product: Product): Promise<ProductTag[]> {
        return product.tags.loadItems();
    }

    @ResolveField(() => ProductStatistics, { nullable: true })
    async statistics(@Parent() product: Product): Promise<ProductStatistics | undefined> {
        return product.statistics?.load();
    }
}
