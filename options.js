const optionsForm = document.getElementById("options-form");

optionsForm.addEventListener("change", () => {
    let formData = new FormData(optionsForm);
    let formJSON = {};

    for (let field of formData) {
        formJSON[field[0]] = field[1];
    }

    browser.storage.local.set(formJSON);
});
