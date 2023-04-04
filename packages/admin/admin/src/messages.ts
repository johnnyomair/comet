import { defineMessages } from "react-intl";

export const messages = defineMessages({
    edit: { id: "comet.generic.edit", defaultMessage: "Edit" },
    add: { id: "comet.generic.add", defaultMessage: "Add" },
    saveUnsavedChanges: {
        id: "comet.generic.doYouWantToSaveYourChanges",
        defaultMessage: "Do you want to save your changes?",
        description: "Prompt to save unsaved changes",
    },
    save: { id: "comet.generic.save", defaultMessage: "Save" },
    saveAndGoBack: { id: "comet.generic.saveAndGoBack", defaultMessage: "Save and go back" },
    cancel: { id: "comet.generic.cancel", defaultMessage: "Cancel" },
    delete: { id: "comet.generic.delete", defaultMessage: "Delete" },
    ok: { id: "comet.generic.ok", defaultMessage: "OK" },
    unsavedChanges: { id: "comet.generic.unsavedChanges", defaultMessage: "Unsaved Changes" },
    discard: { id: "comet.generic.discard", defaultMessage: "Discard" },
    undo: { id: "comet.generic.undo", defaultMessage: "Undo" },
    back: { id: "comet.generic.back", defaultMessage: "Back" },
    reset: { id: "comet.generic.reset", defaultMessage: "Reset" },
    apply: { id: "comet.generic.apply", defaultMessage: "Apply" },
    copy: { id: "comet.generic.copy", defaultMessage: "Copy" },
    paste: { id: "comet.generic.paste", defaultMessage: "Paste" },
    left: { id: "comet.generic.left", defaultMessage: "Left" },
    right: { id: "comet.generic.right", defaultMessage: "Right" },
    link: { id: "comet.generic.link", defaultMessage: "Link" },
    text: { id: "comet.generic.text", defaultMessage: "Text" },
    file: { id: "comet.generic.file", defaultMessage: "File" },
    image: { id: "comet.generic.image", defaultMessage: "Image" },
    page: { id: "comet.generic.page", defaultMessage: "Page" },
    yes: { id: "comet.generic.yes", defaultMessage: "Yes" },
    no: { id: "comet.generic.no", defaultMessage: "No" },
    globalContentScope: { id: "comet.generic.globalContentScope", defaultMessage: "Global Content" },
    invalidData: { id: "comet.generic.invalidData", defaultMessage: "Invalid Data" },
    saveConflict: { id: "comet.generic.saveConflict", defaultMessage: "Save Conflict" },
    retry: { id: "comet.generic.retry", defaultMessage: "Retry" },
    networkError: {
        id: "comet.generic.errors.networkError",
        defaultMessage: "<strong>Could not connect to server.</strong> Please check your internet connection.",
    },
    unknownError: {
        id: "comet.generic.errors.unknownError",
        defaultMessage: "<strong>Something went wrong.</strong> Please try again later.",
    },
    warning: { id: "comet.generic.warning", defaultMessage: "Warning" },
    content: { id: "comet.generic.content", defaultMessage: "Content" },
    close: { id: "comet.generic.close", defaultMessage: "Close" },
    url: { id: "comet.generic.url", defaultMessage: "URL" },
    filter: { id: "comet.generic.filter", defaultMessage: "Filter" },
    copyUrl: { id: "comet.generic.copyUrl", defaultMessage: "Copy URL" },
    deleteItem: { id: "comet.generic.deleteItem", defaultMessage: "Delete Item" },
});
