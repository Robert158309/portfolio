const form = document.querySelector("form");
const toast = document.getElementById("form-toast");
/* ---------------------------------------------------------------- */
const name = form.nombre.value.trim();
const email = form.correo.value.trim();
const message = form.mensaje.value.trim();

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timeout);

    toast.timeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

form.addEventListener("submit", (event) => {

    if (!name || !email || !message) {

        event.preventDefault();
        showToast("Completa todos los campos");
        return;

    }

    if (!form.correo.checkValidity()) {

        event.preventDefault();
        showToast("Ingresa un correo válido");

    }

});
