import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function ToggleOff(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M11.5,3.5 C13.9852814,3.5 16,5.51471863 16,8 C16,10.4142733 14.0987635,12.3844891 11.7118357,12.495102 L11.5,12.5 L11,12.5 C10.7238576,12.5 10.5,12.2761424 10.5,12 C10.5,11.7545401 10.6768752,11.5503916 10.9101244,11.5080557 L11,11.5 L11.5,11.5 C13.4329966,11.5 15,9.93299662 15,8 C15,6.1314366 13.5357224,4.60487355 11.6920352,4.50517886 L11.5,4.5 L4.5,4.5 C2.56700338,4.5 1,6.06700338 1,8 C1,9.8685634 2.4642776,11.3951264 4.3079648,11.4948211 L4.5,11.5 L7,11.5 C7.27614237,11.5 7.5,11.7238576 7.5,12 C7.5,12.2454599 7.32312484,12.4496084 7.08987563,12.4919443 L7,12.5 L4.5,12.5 C2.01471863,12.5 0,10.4852814 0,8 C0,5.58572667 1.90123652,3.61551091 4.2881643,3.50489799 L4.5,3.5 L11.5,3.5 Z M4.5,5.5 C5.88071187,5.5 7,6.61928813 7,8 C7,9.38071187 5.88071187,10.5 4.5,10.5 C3.11928813,10.5 2,9.38071187 2,8 C2,6.61928813 3.11928813,5.5 4.5,5.5 Z" />
        </SvgIcon>
    );
}
