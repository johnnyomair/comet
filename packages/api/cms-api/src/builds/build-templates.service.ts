import { V1CronJob } from "@kubernetes/client-node";
import { Inject, Injectable } from "@nestjs/common";

import { CurrentUser } from "../auth/dto/current-user";
import { BUILDER_LABEL, BUILDS_CONFIG, INSTANCE_LABEL } from "./builds.constants";
import { BuildsConfig } from "./builds.module";
import { KubernetesService } from "./kubernetes.service";

@Injectable()
export class BuildTemplatesService {
    constructor(@Inject(BUILDS_CONFIG) readonly config: BuildsConfig, private readonly kubernetesService: KubernetesService) {}

    async getAllowedBuilderCronJobs(user: CurrentUser): Promise<V1CronJob[]> {
        const allCronJobs = await this.kubernetesService.getAllCronJobs(
            `${BUILDER_LABEL} = true, ${INSTANCE_LABEL} = ${this.kubernetesService.helmRelease}`,
        );

        return allCronJobs.filter((cronJob) => {
            return this.config.isContentScopeAllowed(user, this.kubernetesService.getContentScope(cronJob));
        });
    }
}
