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
        images: {
            headerURL: ""
        },
        colors: colors
    });
}

function themeWindow(window) {
    browser.storage.local.get().then(themeOptions => {
        if (!window.focused) {
            switch (themeOptions.unfocusedTheme) {
            case "tabs":
                updateWindow(window, { // Make tabs white but keep accent background
                    accentcolor: themeOptions.accentColor,
                    textcolor: "#fff",
                    toolbar: "#fff",
                    toolbar_text: "#000",
                    toolbar_field: "#F9F9FA", // Same color from the default light theme
                    toolbar_field_text: "#000"
                });
                break;
            case "title":
                updateWindow(window, {
                    accentcolor: "#fff",
                    textcolor: "#000",
                    toolbar: themeOptions.accentColor,
                    toolbar_text: "#fff",
                    toolbar_field: "#000000" + percentToHex(themeOptions.omnibarOpacity),
                    toolbar_field_text: "#fff"
                });
                break;
            case "both":
                updateWindow(window, {
                    accentcolor: "#fff",
                    textcolor: "#000",
                    toolbar: "#0000000f", // 10% darker than white
                    toolbar_text: "#000",
                    toolbar_field: "#0000000f", // 20% darker than white
                    toolbar_field_text: "#000"
                });
                break;
            case "fade":
                updateWindow(window, {
                    accentcolor: themeOptions.accentColor,
                    textcolor: "#fff",
                    toolbar: "#ffffff" + percentToHex(themeOptions.toolbarOpacity),
                    toolbar_text: "#fff",
                    toolbar_field: "#ffffff" + percentToHex(themeOptions.omnibarOpacity),
                    toolbar_field_text: "#fff"
                });
                break;
            case "reset":
                updateWindow(window, { // Completely default theme colors
                    accentcolor: "#C7C7C7",
                    textcolor: "#000",
                    toolbar: "#F9F9FA",
                    toolbar_text: "#000",
                    toolbar_field: "#fff",
                    toolbar_field_text: "#000"
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
            updateWindow(window, {
                accentcolor: themeOptions.accentColor,
                textcolor: "#fff",
                toolbar: "#000000" + percentToHex(themeOptions.toolbarOpacity),
                toolbar_text: "#fff",
                toolbar_field: "#000000" + percentToHex(themeOptions.omnibarOpacity),
                toolbar_field_text: "#fff"
            });
        }
    });
}

function applyTheme() { // Theme all currently opened windows
    browser.windows.getAll().then(windows => windows.forEach(themeWindow));
}

// Check if the platform is Windows, and if it can use the accent colors
function initTheme() {
    browser.storage.local.get([ // Get the keys that the theme uses
        "accentColor",
        "unfocusedTheme",
        "toolbarOpacity",
        "omnibarOpacity"
    ]).then(themeOptions => {
        if (Object.keys(themeOptions).length < 2) // Less values than required
            browser.runtime.getPlatformInfo().then(platformInfo => {
                browser.storage.local.set({ // Set the information to storage
                    accentColor: platformInfo.os === "win" ? "-moz-win-accentcolor" : "#505050",
                    unfocusedTheme: "fade",
                    toolbarOpacity: 25,
                    omnibarOpacity: 25
                });
            });
    });

    // Add a listener to update the theme on newly created windows
    browser.windows.onCreated.addListener(themeWindow);

    // Add a listener for when the focus changes, update all the window themes
    browser.windows.onFocusChanged.addListener(applyTheme);

    // Update all browser window themes when the storage changes
    browser.storage.onChanged.addListener(applyTheme);

    // Apply the theme to all browser windows currently opened
    applyTheme();
}

// Call init on load
initTheme();
