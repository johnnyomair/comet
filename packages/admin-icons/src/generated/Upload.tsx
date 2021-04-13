import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function Upload(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M13.5,13.5 C13.7761424,13.5 14,13.7238576 14,14 C14,14.2454599 13.8231248,14.4496084 13.5898756,14.4919443 L13.5,14.5 L2.5,14.5 C2.22385763,14.5 2,14.2761424 2,14 C2,13.7545401 2.17687516,13.5503916 2.41012437,13.5080557 L2.5,13.5 L13.5,13.5 Z M8,4.5 C8.24545989,4.5 8.44960837,4.67687516 8.49194433,4.91012437 L8.5,5 L8.5,11 C8.5,11.2761424 8.27614237,11.5 8,11.5 C7.75454011,11.5 7.55039163,11.3231248 7.50805567,11.0898756 L7.5,11 L7.5,5 C7.5,4.72385763 7.72385763,4.5 8,4.5 Z M8,1 L12.8372815,6.01647488 C13.0542395,6.24146985 13.0542395,6.60625879 12.8372815,6.83125377 C12.64443,7.0312493 12.3450696,7.05347103 12.1285494,6.89791895 L12.0516073,6.83125377 L8,2.62943474 L3.94839266,6.83125377 C3.75554115,7.0312493 3.45618071,7.05347103 3.23966055,6.89791895 L3.16271845,6.83125377 C2.96986695,6.63125823 2.94843901,6.32080821 3.09843462,6.09626723 L3.16271845,6.01647488 L8,1 Z" />
        </SvgIcon>
    );
}
