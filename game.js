const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const gameStatus = document.getElementById("game-status");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let isGameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.innerText = currentPlayer;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        gameStatus.innerText = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = "X";
    isGameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartButton.addEventListener("click", restartGame);
