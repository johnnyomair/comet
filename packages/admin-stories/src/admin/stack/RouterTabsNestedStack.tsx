import { RouterTab, RouterTabs, Stack, StackBreadcrumbs, StackPage, StackSwitch, StackSwitchApiContext } from "@comet/admin";
import { Button } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { storyRouterDecorator } from "../../story-router.decorator";

function Story() {
    const [state, setState] = React.useState<boolean>(true);

    return (
        <Stack topLevelTitle="Root Stack">
            <Button
                onClick={() => {
                    setState((prevState) => !prevState);
                }}
            >
                Toggle
            </Button>
            <StackBreadcrumbs />
            <RouterTabs>
                <RouterTab label="Page 1" path="">
                    <Stack topLevelTitle="Nested Stack">
                        <StackBreadcrumbs />
                        <StackSwitch>
                            <StackPage name="table">
                                <StackSwitchApiContext.Consumer>
                                    {(stackApi) => (
                                        <Button color="primary" variant="contained" onClick={() => stackApi.activatePage("edit", "test")}>
                                            Test
                                        </Button>
                                    )}
                                </StackSwitchApiContext.Consumer>
                            </StackPage>
                            <StackPage name="edit" title="Edit">
                                <RouterTabs>
                                    <RouterTab label="Page 3" path="">
                                        Page 3
                                    </RouterTab>
                                </RouterTabs>
                            </StackPage>
                        </StackSwitch>
                    </Stack>
                </RouterTab>
                {state && (
                    <RouterTab label="Mid Page" path="/mid-page">
                        Mid Page
                    </RouterTab>
                )}
                <RouterTab label="Page 2" path="/page2">
                    Page 2
                </RouterTab>
            </RouterTabs>
        </Stack>
    );
}

storiesOf("@comet/admin/stack", module)
    .addDecorator(storyRouterDecorator())
    .add("RouterTabs with nested Stack", () => <Story />);
