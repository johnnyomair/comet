import { Injectable } from "@nestjs/common";
import { PassportStrategy, Type } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { CurrentUser } from "../../user-permissions/dto/current-user";
import { UserPermissionsService } from "../../user-permissions/user-permissions.service";

interface AuthProxyJwtStrategyConfig {
    jwksUri: string;
    strategyName?: string;
    audience?: string;
    strategyOptions?: Omit<StrategyOptions, "jwtFromRequest">;
}

export function createAuthProxyJwtStrategy({
    jwksUri,
    audience,
    strategyOptions,
    strategyName = "auth-proxy-jwt",
}: AuthProxyJwtStrategyConfig): Type {
    @Injectable()
    class AuthProxyJwtStrategy extends PassportStrategy(Strategy, strategyName) {
        constructor(private readonly service: UserPermissionsService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKeyProvider: passportJwtSecret({
                    jwksUri,
                }),
                audience,
                ...strategyOptions,
            });
        }

        async validate(data: JwtPayload): Promise<CurrentUser> {
            return this.service.createCurrentUser(await this.service.createUserFromIdToken(data));
        }
    }
    return AuthProxyJwtStrategy;
}
