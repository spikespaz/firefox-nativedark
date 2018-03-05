// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/theme
function percentToBand(number) {
    return number / 100 * 255;
}

function numberToHex(number) {
    let hex = Math.trunc(number).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function percentToHex(number) {
    return numberToHex(percentToBand(number));
}

function updateWindow(window, colors) {
    browser.theme.update(window.id, {
        images: { headerURL: "" },
        colors: colors
    });
}

function themeWindow(window) {
    browser.storage.local.get().then(themeOptions => {
        if (!window.focused) {
            let highlightFaded = themeOptions.highlightColor + percentToHex(100 - themeOptions.toolbarOpacity);

            switch (themeOptions.unfocusedTheme) {
            case "tabs":
                updateWindow(window, { // Make tabs white but keep accent background
                    accentcolor: themeOptions.accentColor,
                    textcolor: "#fff",
                    toolbar: "#fff",
                    toolbar_text: "#000",
                    toolbar_field: "#F9F9FA", // Same color from the default light theme
                    toolbar_field_text: "#000",
                    tab_line: highlightFaded,
                    icons_attention: highlightFaded,
                });
                break;
            case "title":
                updateWindow(window, {
                    accentcolor: "#fff",
                    textcolor: "#000",
                    toolbar: themeOptions.accentColor,
                    toolbar_text: "#fff",
                    toolbar_field: "#000000" + percentToHex(themeOptions.omnibarOpacity - themeOptions.toolbarOpacity),
                    toolbar_field_text: "#fff",
                    tab_line: highlightFaded,
                    icons_attention: highlightFaded,
                });
                break;
            case "both":
                updateWindow(window, {
                    accentcolor: "#fff",
                    textcolor: "#000",
                    toolbar: "#0000000f", // 10% darker than white
                    toolbar_text: "#000",
                    toolbar_field: "#0000000f", // 20% darker than white
                    toolbar_field_text: "#000",
                    tab_line: highlightFaded,
                    icons_attention: highlightFaded,
                });
                break;
            case "fade":
                updateWindow(window, {
                    accentcolor: themeOptions.accentColor,
                    textcolor: "#fff",
                    toolbar: "#ffffff" + percentToHex(themeOptions.toolbarOpacity),
                    toolbar_text: "#fff",
                    toolbar_field: "#ffffff" + percentToHex(themeOptions.omnibarOpacity - themeOptions.toolbarOpacity),
                    toolbar_field_text: "#fff",
                    tab_line: highlightFaded,
                    icons_attention: highlightFaded,
                });
                break;
            case "reset":
                updateWindow(window, { // Completely default theme colors
                    accentcolor: "#C7C7C7",
                    textcolor: "#000",
                    toolbar: "#F9F9FA",
                    toolbar_text: "#000",
                    toolbar_field: "#fff",
                    toolbar_field_text: "#000",
                    tab_line: highlightFaded,
                    icons_attention: highlightFaded,
                });
                break; // Swallows "none"
            }
        } else if (window.incognito) {
            // Check if the window is in private browsing and use the full dark theme
            updateWindow(window, {
                accentcolor: "#222", // A little lighter than the default black
                textcolor: "#fff",
                toolbar: "#333",
                toolbar_text: "#fff"
            });
        } else { // Not incognito, use adaptive theme
            let toolbarMask = "#000000" + percentToHex(themeOptions.toolbarOpacity);
            let omnibarMask = "#000000" + percentToHex(themeOptions.omnibarOpacity - themeOptions.toolbarOpacity);
            let borderColor = themeOptions.highlightBorders ? themeOptions.highlightColor : undefined;

            updateWindow(window, {
                accentcolor: themeOptions.accentColor,
                // icons: "#fff", // Disabled, not needed
                icons_attention: themeOptions.highlightColor,
                popup: themeOptions.accentColor,
                popup_border: borderColor,
                popup_text: "#fff",
                tab_line: themeOptions.highlightColor,
                tab_loading: themeOptions.highlightColor,
                // tab_selected, // Difference with tab_line?
                // tab_text: "#000",
                textcolor: "#fff",
                toolbar: toolbarMask,
                toolbar_bottom_separator: themeOptions.bottomSeparator ? themeOptions.highlightColor : undefined,
                toolbar_field: omnibarMask,
                toolbar_field_border: borderColor,
                toolbar_field_text: "#fff",
                toolbar_field_separator: borderColor,
                toolbar_text: "#fff",
                // toolbar_top_separator: highlightColor, // Ugly
                // toolbar_vertical_separator: highlightColor // Also ugly
            });
        }
    });
}

function applyTheme() { // Theme all currently opened windows
    browser.windows.getAll().then(windows => windows.forEach(themeWindow));
}

// Check if the platform is Windows, and if it can use the accent colors
function initTheme() {
    // browser.storage.local.clear(); // DEBUG
    let pendingPromise = { then: callback => { callback(); } }; // Create a fake Promise that allows .then()

    browser.storage.local.get().then(themeOptions => {
        if (typeof themeOptions.accentColor === "undefined") {
            if (typeof pendingPromise === "object") pendingPromise = browser.runtime.getPlatformInfo();

            pendingPromise.then(platformInfo => {
                themeOptions.accentColor = platformInfo.os === "win" ? "-moz-win-accentcolor" : "#505050";
            });
        }
        // Default highlight color
        if (typeof themeOptions.highlightColor === "undefined") themeOptions.highlightColor = "#0078D7";

        if (typeof themeOptions.highlightBorders === "undefined") themeOptions.highlightBorders = false;

        if (typeof themeOptions.bottomSeparator === "undefined") themeOptions.bottomSeparator = false;

        if (typeof themeOptions.unfocusedTheme === "undefined") themeOptions.unfocusedTheme = "fade";

        if (typeof themeOptions.toolbarOpacity === "undefined") themeOptions.toolbarOpacity = 25;

        if (typeof themeOptions.omnibarOpacity === "undefined") themeOptions.omnibarOpacity = 50;

        if (pendingPromise) pendingPromise.then(() => browser.storage.local.set(themeOptions));
        else browser.storage.local.set(themeOptions);
    });

    pendingPromise.then(() => {
        // Add a listener to update the theme on newly created windows
        browser.windows.onCreated.addListener(themeWindow);

        // Add a listener for when the focus changes, update all the window themes
        browser.windows.onFocusChanged.addListener(applyTheme);

        // Update all browser window themes when the storage changes
        browser.storage.onChanged.addListener(applyTheme);

        // Apply the theme to all browser windows currently opened
        applyTheme();
    });
}

// Call init on load
initTheme();
