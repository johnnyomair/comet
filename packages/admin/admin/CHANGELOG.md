# @comet/admin

## 4.1.0

### Minor Changes

-   e74366e: Add initial sort to `useDataGridRemote` hook
-   e74366e: Add optional prop `disableCloseAfterSubmit` to `EditDialog`. It prevents the default closing behavior of `EditDialog`.
-   e74366e: Add optional prop `onAfterSave()` to `EditDialog`. It is called after successfully saving a `FinalForm` within the `EditDialog`
-   e74366e: Added `RowActionsMenu` and `RowActionsItem` components for creating IconButtons with nested Menus and Items for actions in table rows and other listed items.
-   e74366e: Add Tooltip Component that adds to MUI Tooltip a trigger prop that allows showing the Tooltip on focus/click without the need for `ClickAwayListener`.

### Patch Changes

-   e74366e: Add compatible x-data-grid-\* versions as optional peerDependency
-   Updated dependencies [e74366e]
    -   @comet/admin-icons@4.1.0
