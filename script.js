const snake = document.getElementById("snake");
const food = document.getElementById("food");
const gameContainer = document.querySelector(".game-container");

let snakeX = 2;
let snakeY = 2;
let foodX = 10;
let foodY = 10;
let gridSize = 20;
let tileCount = 20;
let velocityX = 0;
let velocityY = 0;
let tail = 5;
let tailPositions = [];

function updateGameArea() {
    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX < 0) {
        snakeX = tileCount - 1;
    }
    if (snakeX >= tileCount) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = tileCount - 1;
    }
    if (snakeY >= tileCount) {
        snakeY = 0;
    }

    gameContainer.innerHTML = "";

    tailPositions.push({ x: snakeX, y: snakeY });
    if (tailPositions.length > tail) {
        tailPositions.shift();
    }

    for (let i = 0; i < tailPositions.length; i++) {
        let tailSegment = document.createElement("div");
        tailSegment.style.backgroundColor = "#4CAF50";
        tailSegment.style.width = tailSegment.style.height = gridSize + "px";
        tailSegment.style.position = "absolute";
        tailSegment.style.left = tailPositions[i].x * gridSize + "px";
        tailSegment.style.top = tailPositions[i].y * gridSize + "px";
        gameContainer.appendChild(tailSegment);
    }

    snake.style.left = snakeX * gridSize + "px";
    snake.style.top = snakeY * gridSize + "px";

    if (snakeX === foodX && snakeY === foodY) {
        tail++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    food.style.left = foodX * gridSize + "px";
    food.style.top = foodY * gridSize + "px";
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            velocityX = 0;
            velocityY = -1;
            break;
        case "ArrowDown":
            velocityX = 0;
            velocityY = 1;
            break;
        case "ArrowLeft":
            velocityX = -1;
            velocityY = 0;
            break;
        case "ArrowRight":
            velocityX = 1;
            velocityY = 0;
            break;
    }
});

setInterval(updateGameArea, 100);