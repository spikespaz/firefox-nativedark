// const unfocused_mode = "tabs"; // Make tabs white
const unfocused_mode = "title"; // Make background white and tabs accent color
// const unfocused_mode = "both"; // Set accent color to white
// const unfocused_mode = "fade"; // Fade the tabs and URL bar
// const unfocused_mode = "reset"; // Reset to default theme
// const unfocused_mode = "none"; // Anything else: only fade text

function setTheme(window, colors) {
    browser.theme.update(window.id, {
        images: { headerURL: "" },
        colors: colors
    });
}

// Check if the platform is Windows, and if it can use the accent colors
browser.runtime.getPlatformInfo().then(info => {
    let accentcolor;

    if (info.os === "win") {
        accentcolor = "-moz-win-accentcolor";
    } else {
        accentcolor = "#394145";
    }

    // Add a listener to update the theme on newly created windows
    browser.windows.onCreated.addListener(themeWindow);

    // Add a listener for when the focus changes, update all the window themes
    browser.windows.onFocusChanged.addListener(() => {
        browser.windows.getAll().then(windows => windows.forEach(themeWindow));
    });

    // Theme all currently open windows
    browser.windows.getAll().then(windows => windows.forEach(themeWindow));

    function themeWindow(window) {
        if (!window.focused) {
            // Check if the window isn't in focus, reset it
            switch (unfocused_mode) {
            case "tabs": setTheme(window, { // Make tabs white but keep accent background
                accentcolor: accentcolor,
                textcolor: "#fff",
                toolbar: "#fff",
                toolbar_text: "#000",
                toolbar_field: "#F9F9FA", // Same color from the default light theme
                toolbar_field_text: "#000"
            });
                break;
            case "title": setTheme(window, {
                accentcolor: "#fff",
                textcolor: "#000",
                toolbar: accentcolor,
                toolbar_text: "#fff",
                toolbar_field: "#00000040", // 25% darker than accent
                toolbar_field_text: "#fff"
            });
                break;
            case "both": setTheme(window, {
                accentcolor: "#fff",
                textcolor: "#000",
                toolbar: "#0000000f", // 10% darker than white
                toolbar_text: "#000",
                toolbar_field: "#0000000f", // 20% darker than white
                toolbar_field_text: "#000"
            });
                break;
            case "fade": setTheme(window, {
                accentcolor: accentcolor,
                textcolor: "#fff",
                toolbar: "#ffffff40", // 25% lighter than accent
                toolbar_text: "#fff",
                toolbar_field: "#ffffff40", // 50% lighter than accent
                toolbar_field_text: "#fff"
            });
                break;
            case "reset": setTheme(window, { // Completely default theme colors
                accentcolor: "#C7C7C7",
                textcolor: "#000",
                toolbar: "#F9F9FA",
                toolbar_text: "#000",
                toolbar_field: "#fff",
                toolbar_field_text: "#000"
            });
                break;
            }
        } else if (window.incognito) {
            // Check if the window is in private browsing and use the full dark theme
            setTheme(window, {
                accentcolor: "#222", // A little lighter than the default black
                textcolor: "#fff",
                toolbar: "#333",
                toolbar_text: "#fff"
            });
        } else { // Not incognito, use adaptive theme
            setTheme(window, {
                accentcolor: accentcolor,
                textcolor: "#fff",
                toolbar: "#00000040", // 25% darker than accent
                toolbar_text: "#fff",
                toolbar_field: "#00000040", // 50% darker than accent
                toolbar_field_text: "#fff"
            });
        }
    }
});
