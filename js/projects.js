const projectsContainer = document.getElementById("projects-container");

console.log("container:", document.getElementById("projects-container"));

fetch("../assets/data/projects.json")

.then(response => response.json())
.then(projects => {

    projects.forEach(project => {

        const technologies = project.technologies
            .map(tech => `
                <img src = "${tech}" alt = "Technology Icon">
            `)
            .join("");

        const buttons = project.buttons
            .map(button => `
                <a href="${button.link}" target = "_blank">
                    ${button.text}
                </a>
            `)
            .join("");

        const projectCard = `
        
            <article class = "projects-card">

                <div class = "project-content">

                    <span class = "project-tag">
                        ${project.tag}
                    </span>

                    <h2 class = "project-title">
                        ${project.title}
                    </h2>

                    <p class = "project-description">
                        ${project.description}
                    </p>

                    <div class = "project-tech">
                        ${technologies}
                    </div>

                    <div class = "project-buttons">
                        ${buttons}
                    </div>

                </div>

                <div class = "project-image">

                    <img 
                        src="${project.image}" 
                        alt="${project.title}"
                    >

                </div>

            </article>

        `;

        projectsContainer.innerHTML += projectCard;

    });
});

/* DRAG KILLER */
const images = document.querySelectorAll("img");
images.forEach(img => {

    img.addEventListener("dragstart", e => e.preventDefault());
    img.setAttribute("draggable", "false");

});

/* MOBILE NAVBAR BUTTON */
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (!menuToggle || !navbar) return;

    menuToggle.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        console.log("toggle:", isOpen);
    });

    document.querySelectorAll("#navbar a").forEach(link => {
        link.addEventListener("click", () => {

            navbar.classList.remove("active");
            menuToggle.textContent = "☰";
        });
    });

});