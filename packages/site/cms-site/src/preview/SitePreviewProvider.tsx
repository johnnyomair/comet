import { useRouter } from "next/router";
import * as React from "react";

import { IFrameLocationMessage, IFrameMessageType } from "../iframebridge/IFrameMessage";
import { useIFrameBridge } from "../iframebridge/useIFrameBridge";
import { previewStateUrlParamName } from "./constants";
import { PreviewContext, Url } from "./PreviewContext";
import { createPathToPreviewPath, defaultPreviewPath, parsePreviewState } from "./utils";

interface Props {
    previewPath?: string;
}

export const SitePreviewProvider: React.FunctionComponent<Props> = ({ children, previewPath = defaultPreviewPath }) => {
    const router = useRouter();

    const iFrame = useIFrameBridge();

    React.useEffect(() => {
        function sendUpstreamMessage() {
            const url = new URL(router.asPath, window.location.origin);
            const { pathname, searchParams } = url;
            searchParams.delete(previewStateUrlParamName); // Remove __preview query parameter -> that's frontend preview internal

            const message: IFrameLocationMessage = {
                cometType: IFrameMessageType.SitePreviewLocation,
                data: { search: searchParams.toString(), pathname },
            };
            window.parent.postMessage(JSON.stringify(message), "*");
        }
        sendUpstreamMessage();
        window.addEventListener("load", sendUpstreamMessage);
        () => {
            window.removeEventListener("load", sendUpstreamMessage);
        };
    }, [router, iFrame]);

    const previewState = parsePreviewState(router.query);

    // maps the original-path to the preview-path
    const pathToPreviewPath = React.useCallback(
        (path: Url) => {
            return createPathToPreviewPath({ path, previewPath, previewState, baseUrl: window.location.origin });
        },
        [previewPath, previewState],
    );
    const previewPathToPath = React.useCallback(
        (previewUrl: string) => {
            // Parse url
            const { pathname, searchParams } = new URL(previewUrl, window.location.origin);

            // remove previewPath Prefix e.g. '/preview' from path
            const replaceRegex = new RegExp(`^${previewPath}`);

            // remove __preview query parameter from searchParams
            searchParams.delete("__preview");

            // Create new Url
            const newUrl = new URL(pathname.replace(replaceRegex, ""), window.location.origin);

            // copy search params to newUrl
            searchParams.forEach((value, key) => {
                newUrl.searchParams.set(key, value);
            });

            return `${newUrl.pathname}${newUrl.search}`;
        },
        [previewPath],
    );
    return (
        <PreviewContext.Provider
            value={{
                previewType: "SitePreview",
                showPreviewSkeletons: false,
                pathToPreviewPath,
                previewPathToPath,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
};