const form = document.querySelector("form");
const toast = document.getElementById("form-toast");

/* SHOW TOAST MESSAGE */
function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timeout);

    toast.timeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

/* VALIDATE FORM */
form.addEventListener("submit", (event) => {

    const { nombre, correo, mensaje } = form;

    const name = nombre.value.trim();
    const email = correo.value.trim();
    const message = mensaje.value.trim();

    if (!name || !email || !message) {
        event.preventDefault();
        return showToast("Completa todos los campos");
    }

    if (!correo.checkValidity()) {
        event.preventDefault();
        return showToast("Ingresa un correo válido");
    }

});