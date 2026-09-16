const texts = [
  "Creando hoy, rompiendo cosas mañana",
  "Mi código tiene personalidad propia",
  "¿Por qué funciona? No lo sé, pero funciona",
  "Funcionó en mi máquina",
  "sudo apt install café",
  "¿Quien necesita dormir cuando tienes café y código?",
  "Todo bajo control (mentira)",
  "Ctrl + C, Ctrl + V y que Dios nos ayude",
  "Si funciona, no lo toques",
];
const animation = document.getElementById("description");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
/* ---------------------------------------------------------------- */
const images = document.querySelectorAll("img");
/* ---------------------------------------------------------------- */
const progressBar = document.getElementById("scroll-progress");
/* ---------------------------------------------------------------- */

/* SCROLL PROGRESS BAR */
window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";
});

/* DESCRIPTION TYPE EFFECT */
function typeEffect() {

    const currentText = texts[textIndex];

    if (!isDeleting) {
        animation.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 6000);
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

/* DRAG KILLER */
images.forEach(img => {

    img.addEventListener("dragstart", e => e.preventDefault());
    img.setAttribute("draggable", "false");

});

typeEffect();