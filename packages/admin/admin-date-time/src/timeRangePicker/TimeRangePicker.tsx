import { ThemedComponentBaseProps } from "@comet/admin";
import { ComponentsOverrides, FormControl, Theme, Typography } from "@mui/material";
import { css, styled, useThemeProps } from "@mui/material/styles";
import * as React from "react";
import { FormatDateOptions, FormattedMessage, useIntl } from "react-intl";

import { TimePicker as TimePickerBase } from "../timePicker/TimePicker";

export type TimeRangePickerClassKey =
    | "root"
    | "startFormControl"
    | "endFormControl"
    | "timePicker"
    | "startTimePicker"
    | "endTimePicker"
    | "separator";

const Root = styled("div", {
    name: "CometAdminTimeRangePicker",
    slot: "root",
    overridesResolver(_, styles) {
        return [styles.root];
    },
})(css`
    display: flex;
    align-items: center;
`);

const StartFormControl = styled(FormControl, {
    name: "CometAdminTimeRangePicker",
    slot: "startFormControl",
    overridesResolver(_, styles) {
        return [styles.startFormControl];
    },
})(css`
    flex-grow: 1;
`);

const EndFormControl = styled(FormControl, {
    name: "CometAdminTimeRangePicker",
    slot: "endFormControl",
    overridesResolver(_, styles) {
        return [styles.endFormControl];
    },
})(css`
    flex-grow: 1;
`);

const StartTimePicker = styled(TimePickerBase, {
    name: "CometAdminTimeRangePicker",
    slot: "startTimePicker",
    overridesResolver(_, styles) {
        return [styles.startTimePicker];
    },
})(css``);

const EndTimePicker = styled(TimePickerBase, {
    name: "CometAdminTimeRangePicker",
    slot: "endTimePicker",
    overridesResolver(_, styles) {
        return [styles.endTimePicker];
    },
})(css``);

const Separator = styled(Typography, {
    name: "CometAdminTimeRangePicker",
    slot: "separator",
    overridesResolver(_, styles) {
        return [styles.separator];
    },
})(
    ({ theme }) => css`
        margin-left: ${theme.spacing(2)};
        margin-right: ${theme.spacing(2)};
    `,
);

export type TimeRange = {
    start: string;
    end: string;
};

export interface TimeRangePickerProps
    extends ThemedComponentBaseProps<{
        root: "div";
        startFormControl: typeof FormControl;
        endFormControl: typeof FormControl;
        startTimePicker: typeof TimePickerBase;
        endTimePicker: typeof TimePickerBase;
        separator: typeof Typography;
    }> {
    onChange?: (timeRange?: TimeRange) => void;
    value?: TimeRange;
    formatOptions?: FormatDateOptions;
    minuteStep?: number;
    min?: string;
    max?: string;
    clearable?: boolean;
    separatorText?: React.ReactNode;
}

type IndividualTimeValue = string | undefined;

export const TimeRangePicker = (inProps: TimeRangePickerProps) => {
    const {
        onChange,
        value,
        separatorText = <FormattedMessage id="comet.dateTime.fromToSeparatorText" defaultMessage="to" />,
        className,
        sx,
        slotProps,
        ...propsForBothTimePickers
    } = useThemeProps({ props: inProps, name: "CometAdminTimeRangePicker" });
    const intl = useIntl();

    const [startTime, setStartTime] = React.useState<IndividualTimeValue>(value?.start);
    const [endTime, setEndTime] = React.useState<IndividualTimeValue>(value?.end);

    const [startPickerIsOpen, setStartPickerIsOpen] = React.useState<boolean>(false);
    const [endPickerIsOpen, setEndPickerIsOpen] = React.useState<boolean>(false);

    const startPickerRef = React.useRef<HTMLElement>(null);
    const endPickerRef = React.useRef<HTMLElement>(null);

    const onChangeTimeValue = React.useCallback(
        (newTimeValue: IndividualTimeValue, type: "start" | "end") => {
            if (newTimeValue === undefined) {
                onChange?.(undefined);
                setStartTime(undefined);
                setEndTime(undefined);
            } else if (type === "start") {
                setStartTime(newTimeValue);

                if (endTime) {
                    onChange?.({ start: newTimeValue, end: endTime });
                } else {
                    endPickerRef.current?.focus();
                }
            } else if (type === "end") {
                setEndTime(newTimeValue);

                if (startTime) {
                    onChange?.({ start: startTime, end: newTimeValue });
                } else {
                    startPickerRef.current?.focus();
                }
            }
        },
        [startTime, endTime, onChange],
    );

    // Setting both values the same when closing the pickers and one value is undefined needs to be handled inside `useEffect`, as `setStartTime`/`setEndTime` might not be complete when calling `onClosePopper`.
    React.useEffect(() => {
        if (!startPickerIsOpen && !endPickerIsOpen) {
            if (startTime !== undefined && endTime === undefined) {
                onChangeTimeValue(startTime, "end");
            } else if (startTime === undefined && endTime !== undefined) {
                onChangeTimeValue(endTime, "start");
            }
        }
    }, [onChangeTimeValue, startPickerIsOpen, endPickerIsOpen, startTime, endTime]);

    return (
        <Root sx={sx} className={className} {...slotProps?.root}>
            <StartFormControl {...slotProps?.startFormControl}>
                <StartTimePicker
                    inputRef={startPickerRef}
                    value={startTime}
                    placeholder={intl.formatMessage({ id: "comet.timeRangePicker.start", defaultMessage: "Start" })}
                    onChange={(time) => onChangeTimeValue(time, "start")}
                    onOpenPopper={() => setStartPickerIsOpen(true)}
                    onClosePopper={() => setStartPickerIsOpen(false)}
                    fullWidth
                    {...propsForBothTimePickers}
                    {...slotProps?.startTimePicker}
                />
            </StartFormControl>
            <Separator {...slotProps?.separator}>{separatorText}</Separator>
            <EndFormControl {...slotProps?.endFormControl}>
                <EndTimePicker
                    inputRef={endPickerRef}
                    value={endTime}
                    placeholder={intl.formatMessage({ id: "comet.timeRangePicker.end", defaultMessage: "End" })}
                    onChange={(time) => onChangeTimeValue(time, "end")}
                    onOpenPopper={() => setEndPickerIsOpen(true)}
                    onClosePopper={() => setEndPickerIsOpen(false)}
                    fullWidth
                    {...propsForBothTimePickers}
                    {...slotProps?.endTimePicker}
                />
            </EndFormControl>
        </Root>
    );
};

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminTimeRangePicker: TimeRangePickerClassKey;
    }

    interface ComponentsPropsList {
        CometAdminTimeRangePicker: TimeRangePickerProps;
    }

    interface Components {
        CometAdminTimeRangePicker?: {
            defaultProps?: Partial<ComponentsPropsList["CometAdminTimeRangePicker"]>;
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminTimeRangePicker"];
        };
    }
}
