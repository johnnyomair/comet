import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function Close(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M1.86167237,1.14783961 L7.99937289,7.28564792 L14.1383276,1.14783961 C14.3354471,0.950720131 14.6550409,0.950720131 14.8521604,1.14783961 C15.0492799,1.34495908 15.0492799,1.66455289 14.8521604,1.86167237 L8.71309785,7.99937289 L14.8521604,14.1383276 C15.0492799,14.3354471 15.0492799,14.6550409 14.8521604,14.8521604 C14.6550409,15.0492799 14.3354471,15.0492799 14.1383276,14.8521604 L7.99937289,8.71309785 L1.86167237,14.8521604 C1.66455289,15.0492799 1.34495908,15.0492799 1.14783961,14.8521604 C0.950720131,14.6550409 0.950720131,14.3354471 1.14783961,14.1383276 L7.28564792,7.99937289 L1.14783961,1.86167237 C0.950720131,1.66455289 0.950720131,1.34495908 1.14783961,1.14783961 C1.34495908,0.950720131 1.66455289,0.950720131 1.86167237,1.14783961 Z" />
        </SvgIcon>
    );
}
