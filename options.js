const optionsForm = document.getElementById("options-form");
const optionsSubmit = document.getElementById("options-sumbit");

const accentColor = document.getElementById("accent-color");
const accentColorText = document.getElementById("accent-color-text");

const toolbarOpacity = document.getElementById("toolbar-opacity");
const toolbarOpacityNumber = document.getElementById("toolbar-opacity-number");

const omnibarOpacity = document.getElementById("omnibar-opacity");
const omnibarOpacityNumber = document.getElementById("omnibar-opacity-number");

const highlightColor = document.getElementById("highlight-color");
const highlightColorText = document.getElementById("highlight-color-text");

const highlightBorders = document.getElementById("highlight-borders");

const enableAdaptive = document.getElementById("enable-adaptive");

// Update the values in the local storage when the form is submitted (rebound to change event)
optionsForm.addEventListener("submit", event => {
    let formData = new FormData(optionsForm);
    let formJSON = {};

    for (let field of formData) {
        formJSON[field[0]] = field[1];
    }

    browser.storage.local.set(formJSON);
    event.preventDefault();

    console.log(formJSON);
});

// Bind all changes made to the form to automatically submit, uses fake button
optionsForm.addEventListener("input", () => optionsSubmit.click());

// Bind values with multiple inputs to update each other
accentColor.addEventListener("input", () => accentColorText.value = accentColor.value.toUpperCase());
accentColorText.addEventListener("input", () => accentColor.value = accentColorText.value);

toolbarOpacity.addEventListener("input", () => toolbarOpacityNumber.value = toolbarOpacity.value);
toolbarOpacityNumber.addEventListener("input", () => toolbarOpacity.value = toolbarOpacityNumber.value);

omnibarOpacity.addEventListener("input", () => omnibarOpacityNumber.value = omnibarOpacity.value);
omnibarOpacityNumber.addEventListener("input", () => omnibarOpacity.value = omnibarOpacityNumber.value);

highlightColor.addEventListener("input", () => highlightColorText.value = highlightColor.value.toUpperCase());
highlightColorText.addEventListener("input", () => highlightColor.value = highlightColorText.value);

// Toggle disabled for color poicker when enable adaptive is changed
enableAdaptive.addEventListener("change", () => {
    accentColor.disabled = enableAdaptive.checked;
    accentColorText.disabled = enableAdaptive.checked;
});

// Set the field values from local storage when the page is loaded
browser.storage.local.get().then(themeOptions => {
    if (themeOptions.accentColor === "-moz-win-accentcolor") {
        document.getElementById("enable-adaptive").checked = true;

        accentColor.disabled = true;
        accentColorText.disabled = true;
    } else {
        accentColor.value = themeOptions.accentColor;
        accentColorText.value = themeOptions.accentColor.toUpperCase();
    }

    toolbarOpacity.value = themeOptions.toolbarOpacity;
    toolbarOpacityNumber.value = themeOptions.toolbarOpacity;

    omnibarOpacity.value = themeOptions.omnibarOpacity;
    omnibarOpacityNumber.value = themeOptions.omnibarOpacity;

    highlightColor.value = themeOptions.highlightColor;
    highlightColorText.value = themeOptions.highlightColor;

    highlightBorders.value = themeOptions.highlightBorders;

    document.getElementById("unfocused-theme").value = themeOptions.unfocusedTheme;
});
