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
    browser.theme.reset(window.id);
  } else if (window.incognito) {
    // Check if the window is in private browsing and use the full dark theme
    browser.theme.update(window.id, {
      images: {
        headerURL: "",
      },
      colors: {
        accentcolor: "#222",
        textcolor: "#fff",
        toolbar: "#333",
        toolbar_text: "#fff"
      }
    });
  } else { // Not incognito, use adaptive theme
    browser.theme.update(window.id, {
      images: {
        headerURL: "",
      },
      colors: {
        accentcolor: "-moz-win-accentcolor",
        textcolor: "-moz-win-accentcolortext",
        toolbar: "#00000040", // 25% darker than accent
        toolbar_text: "-moz-win-accentcolortext",
        toolbar_field: "#00000040", // 50% darker than accent
        toolbar_field_text: "-moz-win-accentcolortext"
      }
    });
  }
}
