const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const particleColor = "#ffffffdb";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
let animationId;
/* ---------------------------------------------------------------- */
const isMobile = window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 20 : 45;
const speed = isMobile ? 0.2 : 0.4;
/* ---------------------------------------------------------------- */

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
        animationId = requestAnimationFrame(animateParticles);
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
        cancelAnimationFrame(animationId);
    } else {
        animateParticles();
    }

});

animateParticles();