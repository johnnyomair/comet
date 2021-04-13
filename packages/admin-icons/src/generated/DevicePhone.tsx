import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function DevicePhone(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M12.5,0 C12.7454599,0 12.9496084,0.176875161 12.9919443,0.410124368 L13,0.5 L13,10.5 C13,10.7761424 12.7761424,11 12.5,11 C12.2545401,11 12.0503916,10.8231248 12.0080557,10.5898756 L12,10.5 L12,1 L4,1 L4,13 L12.5,13 C12.7761424,13 13,13.2238576 13,13.5 L13,15.5 C13,15.7454599 12.8231248,15.9496084 12.5898756,15.9919443 L12.5,16 L3.5,16 C3.25454011,16 3.05039163,15.8231248 3.00805567,15.5898756 L3,15.5 L3,0.5 C3,0.254540111 3.17687516,0.0503916296 3.41012437,0.00805566941 L3.5,0 L12.5,0 Z M8,13.75 C7.58578644,13.75 7.25,14.0857864 7.25,14.5 C7.25,14.9142136 7.58578644,15.25 8,15.25 C8.41421356,15.25 8.75,14.9142136 8.75,14.5 C8.75,14.0857864 8.41421356,13.75 8,13.75 Z" />
        </SvgIcon>
    );
}
