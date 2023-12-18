import { ComponentsOverrides } from "@mui/material";
import { css, styled, Theme, useThemeProps } from "@mui/material/styles";
import * as React from "react";

import { ThemedComponentBaseProps } from "../../../helpers/ThemedComponentBaseProps";

export type ToolbarActionsClassKey = "root";
interface Props extends ThemedComponentBaseProps {
    children: React.ReactNode;
}

const Root = styled("div", {
    name: "CometAdminToolbarActions",
    slot: "root",
    overridesResolver(_, styles) {
        return [styles.root];
    },
})(css`
    display: flex;
    align-items: center;
`);

export const ToolbarActions = (inProps: Props) => {
    const { children, ...restProps } = useThemeProps({ props: inProps, name: "CometAdminToolbarActions" });
    return <Root {...restProps}>{children}</Root>;
};

declare module "@mui/material/styles" {
    interface ComponentNameToClassKey {
        CometAdminToolbarActions: ToolbarActionsClassKey;
    }

    interface Components {
        CometAdminToolbarActions?: {
            styleOverrides?: ComponentsOverrides<Theme>["CometAdminToolbarActions"];
        };
    }
}
