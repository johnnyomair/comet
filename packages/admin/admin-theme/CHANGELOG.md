# @comet/admin-theme

## 7.0.0-beta.1

### Major Changes

-   107df9f: Test change

### Patch Changes

-   @comet/admin-icons@7.0.0-beta.1

## 7.0.0-beta.0

### Major Changes

-   803bc607: Rework theme of MUI's `Chip` to match the updated Comet CI
-   33ba5071: Rework `typographyOptions`

    -   Replace `typographyOptions` with `createTypographyOptions()` to enable using the theme's breakpoints for media queries
    -   Add new styles for `button` variant

-   33ba5071: Rework colors

    -   Rename `bluePalette` to `primaryPalette`
    -   Rename `neutrals` to `greyPalette`
    -   Remove `greenPalette`
    -   Change colors in all palettes
    -   Change `text` colors
    -   Add `highlight` colors `purple`, `green`, `orange`, `yellow` and `red` to palette

    Hint: To use the `highlight` colors without getting a type error, you must adjust the `vendors.d.ts` in your project:

    ```diff
    + /// <reference types="@comet/admin-theme" />

    // ...
    ```

-   33ba5071: Change `Link` text styling
-   cce88d44: Adapt `Typography` headlines for mobile devices (<900px)
-   92eae2ba: Change the method of overriding the styling of Admin components

    -   Remove dependency on the legacy `@mui/styles` package in favor of `@mui/material/styles`.
    -   Add the ability to style components using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/).
    -   Add the ability to style individual elements (slots) of a component using the `slotProps` and `sx` props.
    -   The `# @comet/admin-theme syntax in the theme's `styleOverrides` is no longer supported, see: https://mui.com/material-ui/migration/v5-style-changes/#migrate-theme-styleoverrides-to-emotion

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

-   33ba5071: Rework shadows

    -   Change shadows 1 - 4

### Minor Changes

-   53544462: Slightly increase the default size of dialogs
-   f9615fbf: Adapt styling of filter panel in `DataGrid` for mobile devices (<900px)
-   33ba5071: Add `breakpointsOptions` to theme
-   865f253d: Add custom `Typography` variants for displaying inline lists

    ```tsx
    <Typography variant="list">
        <Typography variant="listItem">Lorem ipsum</Typography>
        <Typography variant="listItem">Lorem ipsum</Typography>
        <Typography variant="listItem">Lorem ipsum</Typography>
    </Typography>
    ```

    Hint: To use the custom variants without getting a type error, you must adjust the `vendors.d.ts` in your project:

    ```diff
    + /// <reference types="@comet/admin-theme" />

    // ...
    ```

### Patch Changes

-   @comet/admin-icons@7.0.0-beta.0

## 6.10.0

### Patch Changes

-   @comet/admin-icons@6.10.0

## 6.9.0

### Patch Changes

-   @comet/admin-icons@6.9.0

## 6.8.0

### Patch Changes

-   @comet/admin-icons@6.8.0

## 6.7.0

### Patch Changes

-   @comet/admin-icons@6.7.0

## 6.6.2

### Patch Changes

-   @comet/admin-icons@6.6.2

## 6.6.1

### Patch Changes

-   @comet/admin-icons@6.6.1

## 6.6.0

### Patch Changes

-   @comet/admin-icons@6.6.0

## 6.5.0

### Patch Changes

-   @comet/admin-icons@6.5.0

## 6.4.0

### Patch Changes

-   @comet/admin-icons@6.4.0

## 6.3.0

### Patch Changes

-   @comet/admin-icons@6.3.0

## 6.2.1

### Patch Changes

-   @comet/admin-icons@6.2.1

## 6.2.0

### Patch Changes

-   @comet/admin-icons@6.2.0

## 6.1.0

### Minor Changes

-   a4fac913: Rework `Alert` component

    -   Use theme wherever possible
    -   Move styles where they're more fitting
    -   Fix some paddings

### Patch Changes

-   Updated dependencies [08e0da09]
    -   @comet/admin-icons@6.1.0

## 6.0.0

### Patch Changes

-   Updated dependencies [76e50aa8]
-   Updated dependencies [a525766c]
    -   @comet/admin-icons@6.0.0

## 5.6.0

### Minor Changes

-   fb6c8063: Change `DataGrid`'s `noRowsLabel` from "No rows" to "No results found."

### Patch Changes

-   @comet/admin-icons@5.6.0

## 5.5.0

### Patch Changes

-   @comet/admin-icons@5.5.0

## 5.4.0

### Patch Changes

-   @comet/admin-icons@5.4.0

## 5.3.0

### Patch Changes

-   Updated dependencies [0ff9b9ba]
-   Updated dependencies [0ff9b9ba]
    -   @comet/admin-icons@5.3.0

## 5.2.0

### Patch Changes

-   Updated dependencies [9fc7d474]
    -   @comet/admin-icons@5.2.0

## 5.1.0

### Patch Changes

-   @comet/admin-icons@5.1.0

## 5.0.0

### Patch Changes

-   Updated dependencies [ed692f50]
    -   @comet/admin-icons@5.0.0

## 4.7.0

### Minor Changes

-   d1c7a1c5: Add custom default styling for LinearProgress

    The LinearProgress is intended to be used as a LoadingOverlay in the DataGrid. This styling change adjusts it for this purpose.

### Patch Changes

-   fe310df8: Prevent the clear-button and the select-arrow from overlapping when using `FinalFormSelect` with the `clearable` prop.
-   Updated dependencies [dbdc0f55]
    -   @comet/admin-icons@4.7.0

## 4.6.0

### Patch Changes

-   Updated dependencies [c3b7f992]
-   Updated dependencies [c3b7f992]
    -   @comet/admin-icons@4.6.0

## 4.5.0

### Minor Changes

-   01677075: Fix some DataGrid styling issues and style the DataGrid components to match the Comet CI more closely.

### Patch Changes

-   @comet/admin-icons@4.5.0

## 4.4.3

### Patch Changes

-   @comet/admin-icons@4.4.3

## 4.4.2

### Patch Changes

-   @comet/admin-icons@4.4.2

## 4.4.1

### Patch Changes

-   @comet/admin-icons@4.4.1

## 4.4.0

### Patch Changes

-   @comet/admin-icons@4.4.0

## 4.3.0

### Patch Changes

-   @comet/admin-icons@4.3.0

## 4.2.0

### Patch Changes

-   67e54a82: Add styling variants to Tooltip
    -   @comet/admin-icons@4.2.0

## 4.1.0

### Patch Changes

-   Updated dependencies [51466b1a]
    -   @comet/admin-icons@4.1.0
