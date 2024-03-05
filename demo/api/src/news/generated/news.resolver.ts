// This file has been generated by comet api-generator.
// You may choose to use this file as scaffold by moving this file out of generated folder and removing this comment.
import { AffectedEntity, extractGraphqlFields, RequiredPermission, validateNotModified } from "@comet/cms-api";
import { FindOptions } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";

import { News, NewsContentScope } from "../entities/news.entity";
import { NewsComment } from "../entities/news-comment.entity";
import { NewsInput, NewsUpdateInput } from "./dto/news.input";
import { NewsListArgs } from "./dto/news-list.args";
import { PaginatedNews } from "./dto/paginated-news";
import { NewsService } from "./news.service";

@Resolver(() => News)
@RequiredPermission(["news"])
export class NewsResolver {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly newsService: NewsService,
        @InjectRepository(News) private readonly repository: EntityRepository<News>,
    ) {}

    @Query(() => News)
    @AffectedEntity(News)
    async news(@Args("id", { type: () => ID }) id: string): Promise<News> {
        const news = await this.repository.findOneOrFail(id);
        return news;
    }

    @Query(() => News, { nullable: true })
    async newsBySlug(@Args("slug") slug: string, @Args("scope", { type: () => NewsContentScope }) scope: NewsContentScope): Promise<News | null> {
        const news = await this.repository.findOne({ slug, scope });

        return news ?? null;
    }

    @Query(() => PaginatedNews)
    async newsList(
        @Args() { scope, status, search, filter, sort, offset, limit }: NewsListArgs,
        @Info() info: GraphQLResolveInfo,
    ): Promise<PaginatedNews> {
        const where = this.newsService.getFindCondition({ search, filter });

        where.status = status;
        where.scope = scope;

        const fields = extractGraphqlFields(info, { root: "nodes" });
        const populate: string[] = [];
        if (fields.includes("comments")) {
            populate.push("comments");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: FindOptions<News, any> = { offset, limit, populate };

        if (sort) {
            options.orderBy = sort.map((sortItem) => {
                return {
                    [sortItem.field]: sortItem.direction,
                };
            });
        }

        const [entities, totalCount] = await this.repository.findAndCount(where, options);
        return new PaginatedNews(entities, totalCount);
    }

    @Mutation(() => News)
    async createNews(
        @Args("scope", { type: () => NewsContentScope }) scope: NewsContentScope,
        @Args("input", { type: () => NewsInput }) input: NewsInput,
    ): Promise<News> {
        const { image: imageInput, content: contentInput, ...assignInput } = input;
        const news = this.repository.create({
            ...assignInput,
            scope,

            image: imageInput.transformToBlockData(),
            content: contentInput.transformToBlockData(),
        });

        await this.entityManager.flush();

        return news;
    }

    @Mutation(() => News)
    @AffectedEntity(News)
    async updateNews(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => NewsUpdateInput }) input: NewsUpdateInput,
        @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
    ): Promise<News> {
        const news = await this.repository.findOneOrFail(id);
        if (lastUpdatedAt) {
            validateNotModified(news, lastUpdatedAt);
        }

        const { image: imageInput, content: contentInput, ...assignInput } = input;
        news.assign({
            ...assignInput,
        });

        if (imageInput) {
            news.image = imageInput.transformToBlockData();
        }
        if (contentInput) {
            news.content = contentInput.transformToBlockData();
        }

        await this.entityManager.flush();

        return news;
    }

    @Mutation(() => Boolean)
    @AffectedEntity(News)
    async deleteNews(@Args("id", { type: () => ID }) id: string): Promise<boolean> {
        const news = await this.repository.findOneOrFail(id);
        await this.entityManager.remove(news);
        await this.entityManager.flush();
        return true;
    }

    @ResolveField(() => [NewsComment])
    async comments(@Parent() news: News): Promise<NewsComment[]> {
        return news.comments.loadItems();
    }
}
