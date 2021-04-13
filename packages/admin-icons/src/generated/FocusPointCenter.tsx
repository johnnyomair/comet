import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function FocusPointCenter(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M12.5,2 C12.7761424,2 13,2.22385763 13,2.5 C13,2.74545989 12.8231248,2.94960837 12.5898756,2.99194433 L12.5,3 L1,3 L1,13 L15,13 L15,2.5 C15,2.25454011 15.1768752,2.05039163 15.4101244,2.00805567 L15.5,2 C15.7454599,2 15.9496084,2.17687516 15.9919443,2.41012437 L16,2.5 L16,13.5 C16,13.7454599 15.8231248,13.9496084 15.5898756,13.9919443 L15.5,14 L0.5,14 C0.254540111,14 0.0503916296,13.8231248 0.00805566941,13.5898756 L0,13.5 L0,2.5 C0,2.25454011 0.176875161,2.05039163 0.410124368,2.00805567 L0.5,2 L12.5,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z" />
        </SvgIcon>
    );
}
