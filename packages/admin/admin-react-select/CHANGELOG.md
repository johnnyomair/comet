# @comet/admin-react-select

## 7.0.0-beta.1

### Major Changes

-   107df9f: Test change

### Patch Changes

-   Updated dependencies [107df9f]
    -   @comet/admin@7.0.0-beta.1

## 7.0.0-beta.0

### Major Changes

-   e00c8e1f: Remove `ControlInput` component

    `ControlInput` was never intended to be exported, use MUI's `InputBase` instead.

-   92eae2ba: Change the method of overriding the styling of Admin components

    -   Remove dependency on the legacy `@mui/styles` package in favor of `@mui/material/styles`.
    -   Add the ability to style components using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/).
    -   Add the ability to style individual elements (slots) of a component using the `slotProps` and `sx` props.
    -   The `# @comet/admin-react-select syntax in the theme's `styleOverrides` is no longer supported, see: https://mui.com/material-ui/migration/v5-style-changes/#migrate-theme-styleoverrides-to-emotion

    ```diff
     const theme = createCometTheme({
         components: {
             CometAdminMyComponent: {
                 styleOverrides: {
    -                root: {
    -                    "&$hasShadow": {
    -                        boxShadow: "2px 2px 5px 0 rgba(0, 0, 0, 0.25)",
    -                    },
    -                    "& $header": {
    -                        backgroundColor: "lime",
    -                    },
    -                },
    +                hasShadow: {
    +                    boxShadow: "2px 2px 5px 0 rgba(0, 0, 0, 0.25)",
    +                },
    +                header: {
    +                    backgroundColor: "lime",
    +                },
                 },
             },
         },
     });
    ```

    -   Overriding a component's styles using `withStyles` is no longer supported. Use the `sx` and `slotProps` props instead:

    ```diff
    -import { withStyles } from "@mui/styles";
    -
    -const StyledMyComponent = withStyles({
    -    root: {
    -        backgroundColor: "lime",
    -    },
    -    header: {
    -        backgroundColor: "fuchsia",
    -    },
    -})(MyComponent);
    -
    -// ...
    -
    -<StyledMyComponent title="Hello World" />;
    +<MyComponent
    +    title="Hello World"
    +    sx={{
    +        backgroundColor: "lime",
    +    }}
    +    slotProps={{
    +        header: {
    +            sx: {
    +                backgroundColor: "fuchsia",
    +            },
    +        },
    +    }}
    +/>
    ```

    -   The module augmentation for the `DefaultTheme` type from `@mui/styles/defaultTheme` is no longer needed and needs to be removed from the admins theme file, usually located in `admin/src/theme.ts`:

    ```diff
    -declare module "@mui/styles/defaultTheme" {
    -    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    -    export interface DefaultTheme extends Theme {}
    -}
    ```

    -   Class-keys originating from MUI components have been removed from Comet Admin components, causing certain class-names and `styleOverrides` to no longer be applied.
        The components `root` class-key is not affected. Other class-keys will retain the class-names and `styleOverrides` from the underlying MUI component.
        For example, in `ClearInputAdornment` (when used with `position="end"`) the class-name `CometAdminClearInputAdornment-positionEnd` and the `styleOverrides` for `CometAdminClearInputAdornment.positionEnd` will no longer be applied.
        The component will retain the class-names `MuiInputAdornment-positionEnd`, `MuiInputAdornment-root`, and `CometAdminClearInputAdornment-root`.
        Also, the `styleOverrides` for `MuiInputAdornment.positionEnd`, `MuiInputAdornment.root`, and `CometAdminClearInputAdornment.root` will continue to be applied.

        This affects the following components:

        -   `AppHeader`
        -   `AppHeaderMenuButton`
        -   `ClearInputAdornment`
        -   `Tooltip`
        -   `CancelButton`
        -   `DeleteButton`
        -   `OkayButton`
        -   `SaveButton`
        -   `StackBackButton`
        -   `DatePicker`
        -   `DateRangePicker`
        -   `TimePicker`

    -   For more details, see MUI's migration guide: https://mui.com/material-ui/migration/v5-style-changes/#mui-styles

### Patch Changes

-   b5753e61: Allow partial props in the theme's `defaultProps` instead of requiring all props when setting the `defaultProps` of a component
-   Updated dependencies [865f253d]
-   Updated dependencies [05ce68ec]
-   Updated dependencies [51a0861d]
-   Updated dependencies [54f7754]
-   Updated dependencies [73140014]
-   Updated dependencies [6054fdca]
-   Updated dependencies [d0869ac]
-   Updated dependencies [47ec528a]
-   Updated dependencies [956111ab]
-   Updated dependencies [19eaee4c]
-   Updated dependencies [758c6565]
-   Updated dependencies [04ed68cc]
-   Updated dependencies [4ca4830]
-   Updated dependencies [3397ec1]
-   Updated dependencies [20b2bafd]
-   Updated dependencies [8e3dec5]
-   Updated dependencies [51a0861d]
-   Updated dependencies [b5753e61]
-   Updated dependencies [2a7bc765]
-   Updated dependencies [f8114cd3]
-   Updated dependencies [b87c3c29]
-   Updated dependencies [2a7bc765]
-   Updated dependencies [d2e64d1e]
-   Updated dependencies [241249bd]
-   Updated dependencies [be4e6392]
-   Updated dependencies [a5354543]
-   Updated dependencies [1a1d8315]
-   Updated dependencies [a2f278bb]
-   Updated dependencies [66330e4e]
-   Updated dependencies [92eae2ba]
    -   @comet/admin@7.0.0-beta.0

## 6.10.0

### Patch Changes

-   Updated dependencies [a8a098a24]
-   Updated dependencies [d4a269e1e]
-   Updated dependencies [52130afba]
-   Updated dependencies [e938254bf]
    -   @comet/admin@6.10.0

## 6.9.0

### Patch Changes

-   Updated dependencies [9ff9d66c6]
-   Updated dependencies [e85837a17]
    -   @comet/admin@6.9.0

## 6.8.0

### Patch Changes

-   @comet/admin@6.8.0

## 6.7.0

### Patch Changes

-   @comet/admin@6.7.0

## 6.6.2

### Patch Changes

-   @comet/admin@6.6.2

## 6.6.1

### Patch Changes

-   @comet/admin@6.6.1

## 6.6.0

### Patch Changes

-   Updated dependencies [95b97d768]
-   Updated dependencies [6b04ac9a4]
    -   @comet/admin@6.6.0

## 6.5.0

### Patch Changes

-   Updated dependencies [6cb2f9046]
    -   @comet/admin@6.5.0

## 6.4.0

### Patch Changes

-   Updated dependencies [8ce21f34b]
-   Updated dependencies [811903e60]
    -   @comet/admin@6.4.0

## 6.3.0

### Patch Changes

-   @comet/admin@6.3.0

## 6.2.1

### Patch Changes

-   @comet/admin@6.2.1

## 6.2.0

### Patch Changes

-   @comet/admin@6.2.0

## 6.1.0

### Patch Changes

-   Updated dependencies [dcfa03ca]
-   Updated dependencies [b35bb8d1]
-   Updated dependencies [8eb13750]
-   Updated dependencies [a4fac913]
    -   @comet/admin@6.1.0

## 6.0.0

### Patch Changes

-   Updated dependencies [921f6378]
-   Updated dependencies [298b63b7]
-   Updated dependencies [0d768540]
-   Updated dependencies [62779124]
    -   @comet/admin@6.0.0

## 5.6.0

### Patch Changes

-   @comet/admin@5.6.0

## 5.5.0

### Patch Changes

-   @comet/admin@5.5.0

## 5.4.0

### Patch Changes

-   Updated dependencies [ba800163]
-   Updated dependencies [60a18392]
    -   @comet/admin@5.4.0

## 5.3.0

### Patch Changes

-   Updated dependencies [a677a162]
-   Updated dependencies [60cc1b2a]
-   Updated dependencies [5435b278]
    -   @comet/admin@5.3.0

## 5.2.0

### Patch Changes

-   Updated dependencies [25daac07]
-   Updated dependencies [0bed4e7c]
    -   @comet/admin@5.2.0

## 5.1.0

### Patch Changes

-   Updated dependencies [21c30931]
-   Updated dependencies [93b3d971]
-   Updated dependencies [e33cd652]
    -   @comet/admin@5.1.0

## 5.0.0

### Patch Changes

-   Updated dependencies [0453c36a]
-   Updated dependencies [692c8555]
-   Updated dependencies [2559ff74]
-   Updated dependencies [fe5e0735]
-   Updated dependencies [ed692f50]
-   Updated dependencies [987f08b3]
-   Updated dependencies [d0773a1a]
-   Updated dependencies [5f0f8e6e]
-   Updated dependencies [7c6eb68e]
-   Updated dependencies [d4bcab04]
-   Updated dependencies [0f2794e7]
-   Updated dependencies [80b007ae]
-   Updated dependencies [a7116784]
-   Updated dependencies [e57c6c66]
    -   @comet/admin@5.0.0

## 4.7.0

### Patch Changes

-   Updated dependencies [eac9990b]
-   Updated dependencies [fe310df8]
-   Updated dependencies [fde8e42b]
    -   @comet/admin@4.7.0

## 4.6.0

### Patch Changes

-   @comet/admin@4.6.0

## 4.5.0

### Patch Changes

-   Updated dependencies [46cf5a8b]
-   Updated dependencies [8a2c3302]
-   Updated dependencies [6d4ca5bf]
-   Updated dependencies [07d921d2]
    -   @comet/admin@4.5.0

## 4.4.3

### Patch Changes

-   @comet/admin@4.4.3

## 4.4.2

### Patch Changes

-   @comet/admin@4.4.2

## 4.4.1

### Patch Changes

-   Updated dependencies [662abcc9]
    -   @comet/admin@4.4.1

## 4.4.0

### Patch Changes

-   Updated dependencies [e824ffa6]
-   Updated dependencies [3e15b819]
-   Updated dependencies [a77da844]
    -   @comet/admin@4.4.0

## 4.3.0

### Patch Changes

-   @comet/admin@4.3.0

## 4.2.0

### Patch Changes

-   Updated dependencies [67e54a82]
-   Updated dependencies [3567533e]
-   Updated dependencies [7b614c13]
-   Updated dependencies [aaf1586c]
-   Updated dependencies [d25a7cbb]
    -   @comet/admin@4.2.0

## 4.1.0

### Patch Changes

-   Updated dependencies [51466b1a]
-   Updated dependencies [51466b1a]
-   Updated dependencies [51466b1a]
-   Updated dependencies [51466b1a]
-   Updated dependencies [51466b1a]
-   Updated dependencies [c5f2f918]
    -   @comet/admin@4.1.0
