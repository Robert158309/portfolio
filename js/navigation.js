const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

/* NAVBAR SCROLL ACTIVE LINK */
window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");
        const href = link.getAttribute("href");

        if (href && href.includes(`#${current}`)) {
            link.classList.add("active");
        }
    });
});

/* WINDOW REFRESH */
window.onload = () => {

    history.replaceState(
        null,
        null,
        window.location.pathname
    );
    window.scrollTo(0, 0);
};

/* SCROLL TO TOP ON LOAD */
window.addEventListener("load", () => {

    if (window.location.hash) {
        history.replaceState(
            null,
            null,
            window.location.pathname
        );
        window.scrollTo(0, 0);
    }

});