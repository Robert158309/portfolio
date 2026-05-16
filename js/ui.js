const texts = [
    "Desarrollador Web Junior",
    "Técnico en Informática"
];
const animation = document.getElementById("profession");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
/* ---------------------------------------------------------------- */
const toast = document.getElementById("toast");
const copyEls = document.querySelectorAll(".copy");
/* ---------------------------------------------------------------- */
const images = document.querySelectorAll("img");
/* ---------------------------------------------------------------- */
const snakeToggle = document.getElementById("snake-toggle");
let snakeOpen = false;
/* ---------------------------------------------------------------- */
const progressBar = document.getElementById("scroll-progress");

/* SCROLL PROGRESS BAR */
window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";
});

/* PROFESSION TYPE EFFECT */
function typeEffect() {

    const currentText = texts[textIndex];

    if (!isDeleting) {
        animation.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 5000);
            return;
        }
    } else {
        animation.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 30 : 60);
}

/* COPY FUNCTION */
copyEls.forEach(el => {

    el.addEventListener("click", () => {

        navigator.clipboard.writeText(el.dataset.copy);

        el.style.color = "#00e1ff";

        showToast("Copiado al Portapapeles ✔️");

        setTimeout(() => {

            el.style.color = "";

        }, 500);

    });

});

/* COPY TOAST */
function showToast(message) {

    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 1200);

}

/* DRAG KILLER */
images.forEach(img => {

    img.addEventListener("dragstart", e => e.preventDefault());
    img.setAttribute("draggable", "false");

});

/* SNAKE GAME TOGGLE */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("snake-toggle");
    const container = document.getElementById("snake-container");
    toggle?.addEventListener("click", () => {
        container.classList.toggle("active");
    });
});

/* SNAKE GAME CARD */
snakeToggle?.addEventListener("click", () => {

    const isMobile = window.innerWidth < 768;

    snakeOpen = !snakeOpen;

    if (snakeOpen && isMobile) {
        showToast("Opps... necesitas PC para jugar esto 💻☕");
        snakeOpen = false;
        return;
    }

    showToast(
        snakeOpen
            ? "Mini juego activado"
            : "Mini juego cerrado"
    );

});

typeEffect();