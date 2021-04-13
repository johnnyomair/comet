import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function PageTree(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M5.5,1.5 C5.77614237,1.5 6,1.72385763 6,2 L6,4 L10,4 L10,2 C10,1.72385763 10.2238576,1.5 10.5,1.5 L15.5,1.5 C15.7761424,1.5 16,1.72385763 16,2 L16,7 C16,7.27614237 15.7761424,7.5 15.5,7.5 L10.5,7.5 C10.2238576,7.5 10,7.27614237 10,7 L10,5 L8.5,5 L8.5,11 L10,11 L10,9 C10,8.72385763 10.2238576,8.5 10.5,8.5 L15.5,8.5 C15.7761424,8.5 16,8.72385763 16,9 L16,14 C16,14.2761424 15.7761424,14.5 15.5,14.5 L10.5,14.5 C10.2238576,14.5 10,14.2761424 10,14 L10,12 L7.5,12 L7.5,5 L6,5 L6,7 C6,7.27614237 5.77614237,7.5 5.5,7.5 L0.5,7.5 C0.223857625,7.5 3.38176876e-17,7.27614237 0,7 L0,2 C-3.38176876e-17,1.72385763 0.223857625,1.5 0.5,1.5 L5.5,1.5 Z M11,13.5 L15,13.5 L15,9.5 L11,9.5 L11,13.5 Z M5,2.5 L1,2.5 L1,6.5 L5,6.5 L5,2.5 Z M15,2.5 L11,2.5 L11,6.5 L15,6.5 L15,2.5 Z" />
        </SvgIcon>
    );
}
