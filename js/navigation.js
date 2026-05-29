const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


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

/* MOBILE NAVBAR BUTTON */
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");

    if (!menuToggle || !menuIcon || !navbar) return;

    const EXPAND_ICON = `${BASE_PATH}assets/img/icons/layout-sidebar-left-expand.svg`;
    const COLLAPSE_ICON = `${BASE_PATH}assets/img/icons/layout-sidebar-left-collapse.svg`;

    menuToggle.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("active");

        menuIcon.src = isOpen
            ? COLLAPSE_ICON
            : EXPAND_ICON;

        console.log("toggle:", isOpen);
    });

    document.querySelectorAll("#navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuIcon.src = EXPAND_ICON;
        });
    });

});