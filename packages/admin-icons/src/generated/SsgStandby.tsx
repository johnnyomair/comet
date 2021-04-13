import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function SsgStandby(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M15.5,9 C15.7761424,9 16,9.22385763 16,9.5 L16,14.5 C16,14.7761424 15.7761424,15 15.5,15 L0.5,15 C0.223857625,15 3.38176876e-17,14.7761424 0,14.5 L0,9.5 C-3.38176876e-17,9.22385763 0.223857625,9 0.5,9 L15.5,9 Z M15,10 L1,10 L1,14 L15,14 L15,10 Z M4,11 L4,13 L2,13 L2,11 L4,11 Z M15.5,1 C15.7761424,1 16,1.22385763 16,1.5 L16,6.5 C16,6.77614237 15.7761424,7 15.5,7 L0.5,7 C0.223857625,7 3.38176876e-17,6.77614237 0,6.5 L0,1.5 C-3.38176876e-17,1.22385763 0.223857625,1 0.5,1 L15.5,1 Z M15,2 L1,2 L1,6 L15,6 L15,2 Z M4,3 L4,5 L2,5 L2,3 L4,3 Z" />
        </SvgIcon>
    );
}
