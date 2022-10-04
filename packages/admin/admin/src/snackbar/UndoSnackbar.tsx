import { Button, Slide, Snackbar, SnackbarProps } from "@mui/material";
import { SlideProps } from "@mui/material/Slide/Slide";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { messages } from "../messages";
import { useSnackbarApi } from "./SnackbarProvider";

export interface UndoSnackbarProps<Payload> extends Omit<SnackbarProps, "action"> {
    message: React.ReactNode;
    onUndoClick: (payload?: Payload) => void;
    payload?: Payload;
}

export const UndoSnackbar = <Payload,>({ onUndoClick, payload, ...props }: UndoSnackbarProps<Payload>) => {
    const snackbarApi = useSnackbarApi();

    const onClick = () => {
        snackbarApi.hideSnackbar();
        onUndoClick(payload);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={5000}
            action={
                <Button color="secondary" size="small" onClick={onClick}>
                    <FormattedMessage {...messages.undo} />
                </Button>
            }
            TransitionComponent={(props: SlideProps) => <Slide {...props} direction="right" />}
            {...props}
        />
    );
};
