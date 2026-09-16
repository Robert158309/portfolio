import "./ui.js";
import "./navigation.js";
import "./contact.js";

/* -------------------------------------------------------- */
const topContainer = document.getElementById("skills-top");
const bottomContainer = document.getElementById("skills-bottom");

fetch("assets/data/skills.json")

  .then(res => res.json())
  .then(data => {

    const top = data.filter(skill => skill.role === "top");
    const bottom = data.filter(skill => skill.role === "bottom");

    render(topContainer, top);
    render(bottomContainer, bottom);

    render(topContainer, top);
    render(bottomContainer, bottom);

  })
  .catch(err => console.error("Error loading skills:", err));

function render(container, list) {

  list.forEach(skill => {

    const img = document.createElement("img");

    img.src = skill.icon;
    img.alt = skill.alt;
    img.classList.add("skills-icon");

    container.appendChild(img);
    
  });

}