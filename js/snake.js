export function initSnake() {

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const canvas = document.getElementById("snake-game");
    const ctx = canvas.getContext("2d");

    const container = document.getElementById("snake-container");
    const gameOverScreen = document.getElementById("game-over");
    const restartBtn = document.getElementById("restart-snake");
    const coffeeCounter = document.getElementById("coffee-count");

    const box = 15;

    let snake = [];
    let direction = "RIGHT";
    let nextDirection = "RIGHT";
    let coffee = null;

    let coffeeCount = 0;
    let gameOver = false;

    let last = 0;
    const speed = 120;

    let animationId = null;
    let running = false;

    // ---------------------------
    // RESIZE
    // ---------------------------
    function resize() {
        canvas.width = Math.floor(canvas.clientWidth / box) * box;
        canvas.height = Math.floor(canvas.clientHeight / box) * box;
    }

    window.addEventListener("resize", resize);

    // ---------------------------
    // SPAWN COFFEE
    // ---------------------------
    function spawnCoffee() {
        return {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    }

    // ---------------------------
    // RESET GAME
    // ---------------------------
    function resetGame() {

        resize();

        snake = [{ x: 5 * box, y: 5 * box }];
        direction = "RIGHT";
        nextDirection = "RIGHT";

        coffee = spawnCoffee();

        coffeeCount = 0;
        coffeeCounter.textContent = coffeeCount;

        gameOver = false;
        gameOverScreen.style.display = "none";

        last = performance.now();

        startLoop();
    }

    // ---------------------------
    // INPUT
    // ---------------------------
    window.addEventListener("keydown", (e) => {

        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }

        if (e.key === "ArrowUp" && direction !== "DOWN") nextDirection = "UP";
        else if (e.key === "ArrowDown" && direction !== "UP") nextDirection = "DOWN";
        else if (e.key === "ArrowLeft" && direction !== "RIGHT") nextDirection = "LEFT";
        else if (e.key === "ArrowRight" && direction !== "LEFT") nextDirection = "RIGHT";
    });

    restartBtn?.addEventListener("click", resetGame);

    // ---------------------------
    // GAME LOGIC
    // ---------------------------
    function drawGame() {

        if (gameOver) return;

        direction = nextDirection;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let head = { ...snake[0] };

        if (direction === "UP") head.y -= box;
        if (direction === "DOWN") head.y += box;
        if (direction === "LEFT") head.x -= box;
        if (direction === "RIGHT") head.x += box;

        let grow = false;

        if (head.x === coffee.x && head.y === coffee.y) {
            coffee = spawnCoffee();
            grow = true;

            coffeeCount++;
            coffeeCounter.textContent = coffeeCount;
        }

        // colision with self
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver = true;
                gameOverScreen.style.display = "flex";
                stopLoop();
                return;
            }
        }

        snake.unshift(head);
        if (!grow) snake.pop();

        // border collision
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= canvas.width ||
            head.y >= canvas.height
        ) {
            gameOver = true;
            gameOverScreen.style.display = "flex";
            stopLoop();
        }

        // render snake
        ctx.fillStyle = "#20e2c8";
        snake.forEach(s => ctx.fillRect(s.x, s.y, box, box));

        // render coffee
        ctx.fillStyle = "#6f4e37";
        ctx.fillRect(coffee.x, coffee.y, box, box);
    }

    // ---------------------------
    // CONTROLED ANIMATION LOOP
    // ---------------------------
    function loop(time) {

        if (!running) return;

        if (time - last > speed) {
            drawGame();
            last = time;
        }

        animationId = requestAnimationFrame(loop);
    }

    function startLoop() {
        if (running) return;
        running = true;
        animationId = requestAnimationFrame(loop);
    }

    function stopLoop() {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);
    }

    // ---------------------------
    // VISIBILITY FIX
    // ---------------------------
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopLoop();
        else startLoop();
    });

    // ---------------------------
    // OBSERVER (SAFE)
    // ---------------------------
    const observer = new MutationObserver(() => {
        if (container.style.display === "none") stopLoop();
        else startLoop();
    });

    observer.observe(container, {
        attributes: true,
        attributeFilter: ["style"]
    });

    // ---------------------------
    // INIT
    // ---------------------------
    resize();
    resetGame();
}