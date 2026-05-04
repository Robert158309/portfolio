const text = "Desarrollador Web Junior";
const animation = document.getElementById("profession");
let i = 0;

const toast = document.getElementById("toast");
const images = document.querySelectorAll("img");
const copyEls = document.querySelectorAll(".copy");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const particleColor = "#ffffffdb";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 35 : 80;
const speed = isMobile ? 0.5 : 1.2;

/* PROFESSION TYPE EFFECT */
function typeEffect() {

    if (i < text.length) {
        animation.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
    }

}

/* DRAG KILLER */
images.forEach(img => {

    img.addEventListener("dragstart", e => e.preventDefault());
    img.setAttribute("draggable", "false");

});

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

/* RANDOM SPAWN */
for (let c = 0; c < PARTICLE_COUNT; c++) {

    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 3 + 0.5
    });
}

/* ANIMATION FUNCTION */
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = particleColor;

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

/* CANVAS SIZE */
window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

typeEffect();
