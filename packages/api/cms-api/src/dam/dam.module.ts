import { MikroOrmModule } from "@mikro-orm/nestjs";
import { DynamicModule, Global, Module, Type, ValueProvider } from "@nestjs/common";
import { TypeMetadataStorage } from "@nestjs/graphql";

import { BlobStorageModule } from "..";
import { ScaledImagesCacheService } from "./cache/scaled-images-cache.service";
import { DamConfig } from "./dam.config";
import { DAM_CONFIG, IMGPROXY_CONFIG } from "./dam.constants";
import { createDamItemsResolver } from "./files/dam-items.resolver";
import { DamItemsService } from "./files/dam-items.service";
import { createFileEntity, FILE_ENTITY, FileInterface } from "./files/entities/file.entity";
import { FileImage } from "./files/entities/file-image.entity";
import { createFolderEntity, FolderInterface } from "./files/entities/folder.entity";
import { FileImagesResolver } from "./files/file-image.resolver";
import { FileLicensesResolver } from "./files/file-licenses.resolver";
import { createFilesController } from "./files/files.controller";
import { createFilesResolver } from "./files/files.resolver";
import { FilesService } from "./files/files.service";
import { createFoldersResolver } from "./files/folders.resolver";
import { FoldersService } from "./files/folders.service";
import { CalculateDominantImageColor } from "./images/calculateDominantImageColor.console";
import { ImageCropArea } from "./images/entities/image-crop-area.entity";
import { ImagesController } from "./images/images.controller";
import { ImagesService } from "./images/images.service";
import { IsAllowedImageAspectRatioConstraint } from "./images/validators/is-allowed-aspect-ratio.validator";
import { IsAllowedImageSizeConstraint } from "./images/validators/is-allowed-image-size.validator";
import { IsValidImageAspectRatioConstraint } from "./images/validators/is-valid-aspect-ratio.validator";
import { ImgproxyConfig, ImgproxyService } from "./imgproxy/imgproxy.service";
import { DamScopeInterface } from "./types";

interface DamModuleOptions {
    damConfig: DamConfig;
    imgproxyConfig: ImgproxyConfig;
    Scope?: Type<DamScopeInterface>;
    Folder?: Type<FolderInterface>;
    File?: Type<FileInterface>;
}

@Global()
@Module({})
export class DamModule {
    static register({
        damConfig,
        imgproxyConfig,
        Scope,
        Folder = createFolderEntity({ Scope }),
        File = createFileEntity({ Scope, Folder }),
    }: DamModuleOptions): DynamicModule {
        if (File.name !== FILE_ENTITY) {
            throw new Error(`DamModule: Your File entity must be named ${FILE_ENTITY}`);
        }

        const damConfigProvider: ValueProvider<DamConfig> = {
            provide: DAM_CONFIG,
            useValue: damConfig,
        };

        const imgproxyConfigProvider: ValueProvider<ImgproxyConfig> = {
            provide: IMGPROXY_CONFIG,
            useValue: imgproxyConfig,
        };

        const DamItemsResolver = createDamItemsResolver({ File, Folder, Scope });
        const FilesResolver = createFilesResolver({ File, Scope });
        const FoldersResolver = createFoldersResolver({ Folder, Scope });

        if (Scope) {
            // Scope validation needs to happen after resolver generation. Otherwise the input type metadata has not been defined yet.
            const scopeObjectType = TypeMetadataStorage.getObjectTypeMetadataByTarget(Scope);

            if (scopeObjectType?.name !== "DamScope") {
                throw new Error(
                    `Invalid object type name for provided DAM scope class. Make sure to decorate the class with @ObjectType("DamScope")`,
                );
            }

            const scopeInputType = TypeMetadataStorage.getInputTypeMetadataByTarget(Scope);

            if (scopeInputType?.name !== "DamScopeInput") {
                throw new Error(
                    `Invalid input type name for provided DAM scope class. Make sure to decorate the class with @InputType("DamScopeInput")`,
                );
            }
        }

        return {
            module: DamModule,
            imports: [MikroOrmModule.forFeature([File, Folder, FileImage, ImageCropArea]), BlobStorageModule],
            providers: [
                damConfigProvider,
                DamItemsResolver,
                DamItemsService,
                imgproxyConfigProvider,
                ScaledImagesCacheService,
                ImgproxyService,
                FilesResolver,
                FilesService,
                FileLicensesResolver,
                FoldersResolver,
                FoldersService,
                ImagesService,
                IsAllowedImageSizeConstraint,
                IsAllowedImageAspectRatioConstraint,
                IsValidImageAspectRatioConstraint,
                FileImagesResolver,
                CalculateDominantImageColor,
            ],
            controllers: [createFilesController({ Scope }), ImagesController],
            exports: [ImgproxyService, FilesService, FoldersService, ImagesService, ScaledImagesCacheService, damConfigProvider],
        };
    }
}
