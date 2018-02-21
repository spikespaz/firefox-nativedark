const optionsForm = document.getElementById("options-form");

optionsForm.addEventListener("change", () => {
    let formData = new FormData(optionsForm);
    let formJSON = {};

    for (let field of formData) {
        formJSON[field[0]] = field[1];
    }

    browser.storage.local.set(formJSON);
});

console.log("Calling from options.js, loaded!");

browser.storage.local.get().then(optionsData => {
    if (optionsData.accentColor === "-moz-win-accentcolor")
        document.getElementById("enable-adaptive").checked = true;
    else document.getElementById("accent-color").value = optionsData.accentColor;

    document.getElementById("unfocused-theme").value = optionsData.unfocusedTheme;
});
