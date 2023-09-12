import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";

import { UserContentScopesInput } from "./dto/user-content-scopes.input";
import { UserContentScopes } from "./entities/user-content-scopes.entity";
import { ContentScope } from "./interfaces/content-scope.interface";
import { UserPermissionsService } from "./user-permissions.service";

@Resolver()
export class UserContentScopesResolver {
    constructor(
        @InjectRepository(UserContentScopes) private readonly repository: EntityRepository<UserContentScopes>,
        private readonly userService: UserPermissionsService,
    ) {}

    @Mutation(() => [GraphQLJSONObject])
    async userPermissionsUpdateContentScope(
        @Args("input", { type: () => UserContentScopesInput }) { userId, contentScopes }: UserContentScopesInput,
    ): Promise<ContentScope[]> {
        this.userService.checkContentScopes(contentScopes);
        let entity = await this.repository.findOne({ userId });
        if (entity) {
            entity = this.repository.assign(entity, { userId, contentScopes });
        } else {
            entity = this.repository.create({ userId, contentScopes });
        }
        await this.repository.persistAndFlush(entity);
        return this.userService.getContentScopes(userId);
    }

    @Query(() => [GraphQLJSONObject])
    async userPermissionsContentScope(
        @Args("userId", { type: () => String }) userId: string,
        @Args("skipManual", { type: () => Boolean, nullable: true }) skipManual = false,
    ): Promise<ContentScope[]> {
        return this.userService.getContentScopes(userId, skipManual);
    }

    @Query(() => [GraphQLJSONObject])
    async userPermissionsAvailableContentScopes(): Promise<ContentScope[]> {
        return this.userService.getAvailableContentScopes();
    }
}
