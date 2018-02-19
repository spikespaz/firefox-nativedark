browser.windows.onCreated.addListener(themeWindow);

// Theme all currently open windows
browser.windows.getAll().then(wins => wins.forEach(themeWindow));

function themeWindow(window) {
  // Check if the window is in private browsing and use the full dark theme
  if (window.incognito) {
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
        toolbar_field: "#0000007f", // 50% darker than accent
        toolbar_field_text: "-moz-win-accentcolortext"
      }
    });
  }
}
