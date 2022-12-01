export async function writeClipboardText(data: string): Promise<void> {
    if (!("clipboard" in navigator)) {
        // eslint-disable-next-line no-console
        console.warn("Browser doesn't support navigator.clipboard");
        return;
    }

    // Firefox does not support navigator.clipboard.readText() by default.
    if (navigator.clipboard.readText === undefined) {
        window.localStorage.setItem("comet_clipboard", data);
        return;
    }

    // The "clipboard-write" permission is granted automatically to pages when they are the active tab
    // (see https://web.dev/async-clipboard/#security-and-permissions).
    return navigator.clipboard.writeText(data);
}
