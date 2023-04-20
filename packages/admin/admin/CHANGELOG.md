# @comet/admin

## 4.1.1

### Patch Changes

-   @comet/admin-icons@4.1.1

## 4.1.0

### Minor Changes

-   f803c48: Add initial sort to `useDataGridRemote` hook
-   f803c48: Add optional prop `disableCloseAfterSubmit` to `EditDialog`. It prevents the default closing behavior of `EditDialog`.
-   f803c48: Add optional prop `onAfterSave()` to `EditDialog`. It is called after successfully saving a `FinalForm` within the `EditDialog`
-   f803c48: Added `RowActionsMenu` and `RowActionsItem` components for creating IconButtons with nested Menus and Items for actions in table rows and other listed items.
-   f803c48: Add Tooltip Component that adds to MUI Tooltip a trigger prop that allows showing the Tooltip on focus/click without the need for `ClickAwayListener`.

### Patch Changes

-   f803c48: Add compatible x-data-grid-\* versions as optional peerDependency
-   Updated dependencies [f803c48]
    -   @comet/admin-icons@4.1.0
