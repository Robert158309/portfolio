import "./ui.js";
import "./particles.js";
import "./navigation.js";
import { initSnake } from "./snake.js";

function waitForCanvasSize(callback) {
    const canvas = document.getElementById("snake-game");
    function check() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            callback();
        } else {
            requestAnimationFrame(check);
        }
    }
    check();
}

window.addEventListener("DOMContentLoaded", () => {

    waitForCanvasSize(() => {
        initSnake();
    });
});
