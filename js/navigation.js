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