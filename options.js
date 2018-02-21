const optionsForm = document.getElementById("options-form");

optionsForm.addListener("onchange", event => {
    let formData = new FormData(optionsForm);

    console.log(formData);
});