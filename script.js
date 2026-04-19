const text = "Desarrollador Web Junior";
const animation = document.getElementById("profession");
const toast = document.getElementById("toast");
let i = 0;

function typeEffect() {

    if (i < text.length) {
        animation.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
    }

}

document.querySelectorAll(".copy").forEach(el => {

    el.addEventListener("click", () => {

        navigator.clipboard.writeText(el.dataset.copy);

        el.style.color = "rgb(0, 255, 150)";

        showToast("Copiado al Portapapeles ✔️");

        setTimeout(() => {

            el.style.color = "";

        }, 500);

    });

});

function showToast(message) {

    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 1200);

}

typeEffect();
