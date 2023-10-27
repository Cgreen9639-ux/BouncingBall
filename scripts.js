const basket = document.getElementById("basket");
const fruitsContainer = document.getElementById("fruits-container");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again");

let score = 0;
let timeLeft = 30;
let gameInterval;
let gameIsOver = false;

function createFruit() {
    const fruit = document.createElement("div");
    fruit.className = "fruit";
    const randomX = Math.random() * 750;
    fruit.style.left = randomX + "px";
    fruit.style.top = "0";
    fruitsContainer.appendChild(fruit);

    fruit.addEventListener("click", () => {
        if (!gameIsOver) {
            score += parseInt(fruit.style.backgroundImage.split("/")[1].charAt(5));
            scoreElement.textContent = `Score: ${score}`;
            fruitsContainer.removeChild(fruit);
        }
    });
}

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    gameIsOver = true;
    gameOverScreen.classList.remove("hidden");
    finalScoreElement.textContent = `Final Score: ${score}`;
}

function startGame() {
    timeLeft = 30;
    score = 0;
    scoreElement.textContent = "Score: 0";
    fruitsContainer.innerHTML = "";
    gameOverScreen.classList.add("hidden");
    gameIsOver = false;
    gameInterval = setInterval(createFruit, 1500);
    setInterval(updateTimer, 1000);
}

playAgainButton.addEventListener("click", startGame);
startGame();
