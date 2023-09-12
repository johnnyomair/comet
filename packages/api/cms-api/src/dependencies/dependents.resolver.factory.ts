import { AnyEntity } from "@mikro-orm/core";
import { Type } from "@nestjs/common";
import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { DependenciesService } from "./dependencies.service";
import { DependentsArgs } from "./dto/dependencies.args";
import { PaginatedDependencies } from "./dto/paginated-dependencies";

export class DependentsResolverFactory {
    static create<T extends Type<AnyEntity<{ id: string }>>>(classRef: T) {
        @Resolver(() => classRef)
        class DependentsResolver {
            constructor(readonly dependenciesService: DependenciesService) {}

            @ResolveField(() => PaginatedDependencies)
            async dependents(
                @Parent() node: AnyEntity<{ id: string }>,
                @Args() { filter, offset, limit, forceRefresh }: DependentsArgs,
            ): Promise<PaginatedDependencies> {
                return this.dependenciesService.getDependents(node, filter, { offset, limit }, { force: forceRefresh });
            }
        }

        return DependentsResolver;
    }
}
