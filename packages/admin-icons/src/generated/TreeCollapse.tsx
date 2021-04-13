import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function TreeCollapse(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M13.5,0 C14.8807119,0 16,1.11928813 16,2.5 L16,2.5 L16,13.5 C16,14.8807119 14.8807119,16 13.5,16 L13.5,16 L2.5,16 C1.11928813,16 0,14.8807119 0,13.5 L0,13.5 L0,2.5 C0,1.11928813 1.11928813,0 2.5,0 L2.5,0 Z M12.5,7.5 L3.5,7.5 C3.22385763,7.5 3,7.72385763 3,8 C3,8.27614237 3.22385763,8.5 3.5,8.5 L3.5,8.5 L12.5,8.5 C12.7761424,8.5 13,8.27614237 13,8 C13,7.72385763 12.7761424,7.5 12.5,7.5 L12.5,7.5 Z" />
        </SvgIcon>
    );
}
