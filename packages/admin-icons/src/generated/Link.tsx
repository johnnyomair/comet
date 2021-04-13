import { SvgIcon, SvgIconProps } from "@material-ui/core";
import * as React from "react";

export default function Link(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 16 16">
            <path d="M8,1.372583 C9.83011067,-0.457527667 12.7973063,-0.457527667 14.627417,1.372583 C16.4052388,3.1504048 16.4560337,6.00126353 14.7798017,7.84040172 L14.627417,8 L14.2592272,8.36818983 C14.0558815,8.57153546 13.7261931,8.57153546 13.5228475,8.36818983 C13.3420958,8.18743816 13.3220123,7.9068601 13.4625969,7.70392479 L13.5228475,7.63181017 L13.8910373,7.26362033 C15.3144567,5.84020092 15.3144567,3.53238208 13.8910373,2.10896267 C12.5150652,0.732990573 10.312671,0.687124836 8.88160409,1.97136546 L8.73637967,2.10896267 L5.42267117,5.42267117 C5.21932554,5.6260168 4.88963713,5.6260168 4.6862915,5.42267117 C4.50553983,5.2419195 4.48545631,4.96134143 4.62604094,4.75840612 L4.6862915,4.6862915 L8,1.372583 Z M1.74077284,7.63181017 C1.94411847,7.42846454 2.27380687,7.42846454 2.4771525,7.63181017 C2.65790417,7.81256184 2.67798769,8.0931399 2.53740306,8.29607521 L2.4771525,8.36818983 L2.10896267,8.73637967 C0.685543259,10.1597991 0.685543259,12.4676179 2.10896267,13.8910373 C3.48493476,15.2670094 5.687329,15.3128752 7.11839591,14.0286345 L7.26362033,13.8910373 L10.5773288,10.5773288 C10.7806745,10.3739832 11.1103629,10.3739832 11.3137085,10.5773288 C11.4944602,10.7580805 11.5145437,11.0386586 11.3739591,11.2415939 L11.3137085,11.3137085 L8,14.627417 C6.16988933,16.4575277 3.20269367,16.4575277 1.372583,14.627417 C-0.405238791,12.8495952 -0.456033699,9.99873647 1.22019828,8.15959828 L1.372583,8 L1.74077284,7.63181017 Z M10.5773288,4.6862915 C10.7806745,4.48294587 11.1103629,4.48294587 11.3137085,4.6862915 C11.4944602,4.86704317 11.5145437,5.14762123 11.3739591,5.35055655 L11.3137085,5.42267117 L5.42267117,11.3137085 C5.21932554,11.5170541 4.88963713,11.5170541 4.6862915,11.3137085 C4.50553983,11.1329568 4.48545631,10.8523788 4.62604094,10.6494435 L4.6862915,10.5773288 L10.5773288,4.6862915 Z" />
        </SvgIcon>
    );
}
