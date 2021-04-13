import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function Sort(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M7.5,11.5 C7.77614237,11.5 8,11.7238576 8,12 C8,12.2761424 7.77614237,12.5 7.5,12.5 L0.5,12.5 C0.223857625,12.5 3.38176876e-17,12.2761424 0,12 C-3.38176876e-17,11.7238576 0.223857625,11.5 0.5,11.5 L7.5,11.5 Z M11.5,7.5 C11.7761424,7.5 12,7.72385763 12,8 C12,8.27614237 11.7761424,8.5 11.5,8.5 L0.5,8.5 C0.223857625,8.5 3.38176876e-17,8.27614237 0,8 C-3.38176876e-17,7.72385763 0.223857625,7.5 0.5,7.5 L11.5,7.5 Z M15.5,3.5 C15.7761424,3.5 16,3.72385763 16,4 C16,4.27614237 15.7761424,4.5 15.5,4.5 L0.5,4.5 C0.223857625,4.5 3.38176876e-17,4.27614237 0,4 C-3.38176876e-17,3.72385763 0.223857625,3.5 0.5,3.5 L15.5,3.5 Z" />
        </SvgIcon>
    );
}
