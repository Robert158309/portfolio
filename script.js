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
const images = document.querySelectorAll("img");
const copyEls = document.querySelectorAll(".copy");
/* ---------------------------------------------------------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const particleColor = "#ffffffdb";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
/* ---------------------------------------------------------------- */
const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 20 : 45;
const speed = isMobile ? 0.2 : 0.4;
/* ---------------------------------------------------------------- */
let animationRunning = true;

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
        size: Math.random() * 4 + 1.2
    });
}

/* ANIMATION PARTICLES FUNCTION */
function animateParticles() {

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

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.strokeStyle = `rgba(255,255,255,${0.08 - distance / 1500})`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.lineCap = "round";

                ctx.stroke();
            }
        }
    }

    if (animationRunning) {
        requestAnimationFrame(animateParticles);
    }
}

/* CANVAS SIZE */
window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.forEach(p => {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
    });

});

/* VISIBILITY CHANGE */
document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
        animationRunning = false;
    } else {
        animationRunning = true;
        animateParticles();
    }

});

animateParticles();
typeEffect();
