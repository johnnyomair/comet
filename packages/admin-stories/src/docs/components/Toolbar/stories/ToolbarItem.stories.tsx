import { Toolbar, ToolbarAutomaticTitleItem, ToolbarItem } from "@comet/admin";
import { Typography } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import StoryRouter from "storybook-react-router";

import { toolbarDecorator } from "../toolbar.decorator";

storiesOf("stories/components/Toolbar/Toolbar Item", module)
    .addDecorator(toolbarDecorator())
    .addDecorator(StoryRouter())
    .add("Toolbar Item", () => {
        return (
            <Toolbar>
                <ToolbarItem>
                    <Typography>Item 1</Typography>
                </ToolbarItem>
                <ToolbarItem>
                    <Typography>Item 2</Typography>
                </ToolbarItem>
                <ToolbarItem>
                    <Typography>Item 3</Typography>
                </ToolbarItem>
            </Toolbar>
        );
    })
    .add("Toolbar Item mixing with other components", () => {
        return (
            <Toolbar>
                <ToolbarItem>
                    <Typography>Item 1</Typography>
                </ToolbarItem>
                <ToolbarAutomaticTitleItem />
                <ToolbarItem>
                    <Typography>Item 2</Typography>
                </ToolbarItem>
                <ToolbarItem>
                    <Typography>Item 3</Typography>
                </ToolbarItem>
            </Toolbar>
        );
    });
