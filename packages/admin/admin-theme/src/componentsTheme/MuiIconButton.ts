import { mergeOverrideStyles } from "../utils/mergeOverrideStyles";
import { GetMuiComponentTheme } from "./getComponentsTheme";

export const getMuiIconButton: GetMuiComponentTheme<"MuiIconButton"> = (styleOverrides, { palette }) => ({
    styleOverrides: mergeOverrideStyles<"MuiIconButton">(styleOverrides, {
        root: {
            color: palette.grey[900],
        },
        colorInherit: {
            color: "inherit",
        },
        colorPrimary: {
            color: palette.primary.main,
        },
        colorSecondary: {
            color: palette.secondary.main,
        },
        // The following classes are missing from the type `IconButtonClasses`, but they do exist.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        colorWarning: {
            color: palette.warning.main,
        },
        colorError: {
            color: palette.error.main,
        },
        colorSuccess: {
            color: palette.success.main,
        },
        colorInfo: {
            color: palette.info.main,
        },
    }),
});
