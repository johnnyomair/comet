# @comet/admin

## 4.1.0

### Minor Changes

-   51466b1: Add initial sort to `useDataGridRemote` hook
-   51466b1: Add optional prop `disableCloseAfterSubmit` to `EditDialog`. It prevents the default closing behavior of `EditDialog`.
-   51466b1: Add optional prop `onAfterSave()` to `EditDialog`. It is called after successfully saving a `FinalForm` within the `EditDialog`
-   51466b1: Added `RowActionsMenu` and `RowActionsItem` components for creating IconButtons with nested Menus and Items for actions in table rows and other listed items.
-   c5f2f91: Add Tooltip Component that adds to MUI Tooltip a trigger prop that allows showing the Tooltip on focus/click without the need for `ClickAwayListener`.

### Patch Changes

-   51466b1: Add compatible x-data-grid-\* versions as optional peerDependency
-   Updated dependencies [51466b1]
    -   @comet/admin-icons@4.1.0
