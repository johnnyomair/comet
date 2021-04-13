import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function Minimize(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M6.5,9 L6.5534276,9.00282096 L6.62814577,9.01660826 L6.69103656,9.03779224 L6.76701032,9.07718801 L6.82213721,9.11758372 L6.85355339,9.14644661 L6.89103898,9.18833775 L6.93325257,9.25023485 L6.96238944,9.3094049 L6.98338918,9.37186086 L6.99791201,9.45421382 L7,9.5 L7,12.5 C7,12.7761424 6.77614237,13 6.5,13 C6.25454011,13 6.05039163,12.8231248 6.00805567,12.5898756 L6,12.5 L5.999,10.707 L1.85355339,14.8535534 C1.65829124,15.0488155 1.34170876,15.0488155 1.14644661,14.8535534 C0.972880258,14.679987 0.953595107,14.4105626 1.08859116,14.2156945 L1.14644661,14.1464466 L5.292,10 L3.5,10 C3.25454011,10 3.05039163,9.82312484 3.00805567,9.58987563 L3,9.5 C3,9.25454011 3.17687516,9.05039163 3.41012437,9.00805567 L3.5,9 L6.5,9 Z M14.8535534,1.14644661 C15.0271197,1.32001296 15.0464049,1.58943736 14.9114088,1.7843055 L14.8535534,1.85355339 L10.708,6 L12.5,6 C12.7454599,6 12.9496084,6.17687516 12.9919443,6.41012437 L13,6.5 C13,6.74545989 12.8231248,6.94960837 12.5898756,6.99194433 L12.5,7 L9.5,7 L9.4465724,6.99717904 L9.37185423,6.98339174 L9.30896344,6.96220776 L9.23298968,6.92281199 L9.17786279,6.88241628 L9.14644661,6.85355339 L9.10896102,6.81166225 L9.06674743,6.74976515 L9.03761056,6.6905951 L9.01661082,6.62813914 L9.00208799,6.54578618 L9,6.5 L9,3.5 C9,3.22385763 9.22385763,3 9.5,3 C9.74545989,3 9.94960837,3.17687516 9.99194433,3.41012437 L10,3.5 L10.001,5.293 L14.1464466,1.14644661 C14.3417088,0.951184464 14.6582912,0.951184464 14.8535534,1.14644661 Z" />
        </SvgIcon>
    );
}
