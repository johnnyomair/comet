import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

import { CurrentUserInterface } from "../../auth/current-user/current-user";
import { ContentScopeService } from "../content-scope.service";
import { RequiredPermission } from "../decorators/required-permission.decorator";
import { ACCESS_CONTROL_SERVICE } from "../user-permissions.constants";
import { AccessControlServiceInterface } from "../user-permissions.types";

@Injectable()
export class UserPermissionsGuard implements CanActivate {
    constructor(
        protected reflector: Reflector,
        private readonly contentScopeService: ContentScopeService,
        @Inject(ACCESS_CONTROL_SERVICE) private readonly accessControlService: AccessControlServiceInterface,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublicApi = this.reflector.getAllAndOverride("publicApi", [context.getHandler(), context.getClass()]);
        if (isPublicApi) {
            return true;
        }

        const request =
            context.getType().toString() === "graphql" ? GqlExecutionContext.create(context).getContext().req : context.switchToHttp().getRequest();
        const user = request.user as CurrentUserInterface | undefined;
        if (!user) return false;

        const requiredPermission = this.reflector.getAllAndOverride<RequiredPermission>("requiredPermission", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermission) {
            throw new Error(`RequiredPermission decorator is missing in ${context.getClass().name}::${context.getHandler().name}()`);
        }

        if (!requiredPermission.options?.skipScopeCheck) {
            const requestScope = await this.contentScopeService.inferScopeFromExecutionContext(context);
            if (!requestScope) {
                throw new Error(
                    `Could not get ContentScope. Either pass a scope-argument or add @AffectedEntity()-decorator or enable skipScopeCheck in @RequiredPermission() (${
                        context.getClass().name
                    }::${context.getHandler().name}())`,
                );
            }
            if (!this.accessControlService.canAccessScope(requestScope, user)) {
                return false;
            }
        }

        return requiredPermission.requiredPermission.some((permission) => this.accessControlService.isAllowed(user, permission));
    }
}
