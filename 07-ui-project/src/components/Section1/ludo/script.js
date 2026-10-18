/* =====================================================
   LUDO GAME - VANILLA JAVASCRIPT
===================================================== */

const board = document.getElementById("board");
const diceElement = document.getElementById("dice");
const rollDiceButton = document.getElementById("rollDice");
const currentPlayerElement = document.getElementById("currentPlayer");
const gameMessage = document.getElementById("gameMessage");
const resetGameButton = document.getElementById("resetGame");
const winnerModal = document.getElementById("winnerModal");
const winnerTitle = document.getElementById("winnerTitle");
const playAgainButton = document.getElementById("playAgain");


/* =====================================================
   PLAYERS
===================================================== */

const players = [

    {
        name: "Red",
        color: "red",
        startIndex: 0,

        homeLane: [
            [7, 1],
            [7, 2],
            [7, 3],
            [7, 4],
            [7, 5],
            [7, 6]
        ]
    },

    {
        name: "Green",
        color: "green",
        startIndex: 13,

        homeLane: [
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [5, 7],
            [6, 7]
        ]
    },

    {
        name: "Blue",
        color: "blue",
        startIndex: 26,

        homeLane: [
            [7, 13],
            [7, 12],
            [7, 11],
            [7, 10],
            [7, 9],
            [7, 8]
        ]
    },

    {
        name: "Yellow",
        color: "yellow",
        startIndex: 39,

        homeLane: [
            [13, 7],
            [12, 7],
            [11, 7],
            [10, 7],
            [9, 7],
            [8, 7]
        ]
    }

];


/* =====================================================
   52 COMMON PATH
===================================================== */

const commonPath = [

    // RED START
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],

    // UP
    [5, 6],
    [4, 6],
    [3, 6],
    [2, 6],
    [1, 6],
    [0, 6],

    // TOP
    [0, 7],
    [0, 8],

    // DOWN
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],

    // RIGHT
    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [6, 14],

    // DOWN
    [7, 14],
    [8, 14],

    // LEFT
    [8, 13],
    [8, 12],
    [8, 11],
    [8, 10],
    [8, 9],

    // DOWN
    [9, 8],
    [10, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [14, 8],

    // BOTTOM
    [14, 7],
    [14, 6],

    // UP
    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [9, 6],

    // LEFT
    [8, 5],
    [8, 4],
    [8, 3],
    [8, 2],
    [8, 1],
    [8, 0],

    // UP
    [7, 0],
    [6, 0]
];


/* =====================================================
   SAFE CELLS
===================================================== */

const safeCells = [
    "6-1",
    "1-8",
    "8-13",
    "13-6",
    "2-6",
    "6-12",
    "12-8",
    "8-2"
];


/* =====================================================
   GAME VARIABLES
===================================================== */

let currentPlayerIndex = 0;
let diceValue = 0;
let gameFinished = false;


/* =====================================================
   TOKEN DATA
===================================================== */

const tokenData = [];


/* =====================================================
   CREATE BOARD
===================================================== */

function createBoard() {

    board.innerHTML = "";

    for (let row = 0; row < 15; row++) {

        for (let col = 0; col < 15; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;


            /* =========================================
               RED HOME
            ========================================= */

            if (row < 6 && col < 6) {

                cell.classList.add("red-home");

            }


            /* =========================================
               GREEN HOME
            ========================================= */

            else if (row < 6 && col > 8) {

                cell.classList.add("green-home");

            }


            /* =========================================
               YELLOW HOME
            ========================================= */

            else if (row > 8 && col < 6) {

                cell.classList.add("yellow-home");

            }


            /* =========================================
               BLUE HOME
            ========================================= */

            else if (row > 8 && col > 8) {

                cell.classList.add("blue-home");

            }


            /* =========================================
               CENTER 3 × 3
            ========================================= */

            else if (
                row >= 6 &&
                row <= 8 &&
                col >= 6 &&
                col <= 8
            ) {

                cell.classList.add("center-part");


                /*
                   Top-left = RED
                */

                if (row === 6 && col === 6) {

                    cell.style.background = "#e53935";

                }


                /*
                   Top-right = GREEN
                */

                else if (row === 6 && col === 8) {

                    cell.style.background = "#43a047";

                }


                /*
                   Bottom-left = YELLOW
                */

                else if (row === 8 && col === 6) {

                    cell.style.background = "#fbc02d";

                }


                /*
                   Bottom-right = BLUE
                */

                else if (row === 8 && col === 8) {

                    cell.style.background = "#1e88e5";

                }


                /*
                   Middle cells
                */

                else {

                    cell.style.background = "#ffffff";

                }


                /*
                   ONLY ONE HOME ICON
                */

                if (row === 7 && col === 7) {

                    cell.innerHTML = "🏠";

                    cell.style.fontSize = "22px";

                    cell.style.zIndex = "10";

                }

            }


            /* =========================================
               NORMAL PATH
            ========================================= */

            else {

                const pathIndex = commonPath.findIndex(
                    ([r, c]) =>
                        r === row &&
                        c === col
                );


                if (pathIndex !== -1) {

                    cell.classList.add("path");

                }


                /* =====================================
                   RED HOME LANE
                ===================================== */

                if (
                    row === 7 &&
                    col >= 1 &&
                    col <= 6
                ) {

                    cell.classList.add("red-path");

                }


                /* =====================================
                   GREEN HOME LANE
                ===================================== */

                if (
                    col === 7 &&
                    row >= 1 &&
                    row <= 6
                ) {

                    cell.classList.add("green-path");

                }


                /* =====================================
                   BLUE HOME LANE
                ===================================== */

                if (
                    row === 7 &&
                    col >= 8 &&
                    col <= 13
                ) {

                    cell.classList.add("blue-path");

                }


                /* =====================================
                   YELLOW HOME LANE
                ===================================== */

                if (
                    col === 7 &&
                    row >= 8 &&
                    row <= 13
                ) {

                    cell.classList.add("yellow-path");

                }

            }


            /* =========================================
               SAFE CELL
            ========================================= */

            const key = `${row}-${col}`;

            if (safeCells.includes(key)) {

                cell.classList.add("safe-cell");

            }


            board.appendChild(cell);

        }
    }
}


/* =====================================================
   GET CELL
===================================================== */

function getCell(row, col) {

    return board.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
    );

}


/* =====================================================
   HOME POSITIONS
===================================================== */

function getHomePositions(color) {

    if (color === "red") {

        return [
            [1, 1],
            [1, 4],
            [4, 1],
            [4, 4]
        ];

    }


    if (color === "green") {

        return [
            [1, 10],
            [1, 13],
            [4, 10],
            [4, 13]
        ];

    }


    if (color === "yellow") {

        return [
            [10, 1],
            [10, 4],
            [13, 1],
            [13, 4]
        ];

    }


    if (color === "blue") {

        return [
            [10, 10],
            [10, 13],
            [13, 10],
            [13, 13]
        ];

    }

}


/* =====================================================
   CREATE TOKENS
===================================================== */

function createTokens() {

    tokenData.length = 0;


    players.forEach(player => {

        const positions =
            getHomePositions(player.color);


        positions.forEach((position, index) => {

            const token =
                document.createElement("div");


            token.classList.add(
                "token",
                player.color
            );


            token.dataset.player =
                player.color;


            token.dataset.tokenIndex =
                index;


            token.dataset.progress =
                "-1";


            token.addEventListener(
                "click",
                () => {

                    handleTokenClick(
                        player.color,
                        index
                    );

                }
            );


            const cell =
                getCell(
                    position[0],
                    position[1]
                );


            cell.appendChild(token);


            tokenData.push({

                player: player.color,

                tokenIndex: index,

                element: token,

                progress: -1,

                homePosition: position

            });

        });

    });

}


/* =====================================================
   CAN TOKEN MOVE?
===================================================== */

function canTokenMove(token) {

    /*
       Finished token
    */

    if (token.progress === 57) {

        return false;

    }


    /*
       Token inside home
       Only 6 can bring it out
    */

    if (token.progress === -1) {

        return diceValue === 6;

    }


    /*
       Normal movement
    */

    return (
        token.progress + diceValue <= 57
    );

}


/* =====================================================
   ROLL DICE
===================================================== */

function rollDice() {

    if (gameFinished) {

        return;

    }


    /*
       Dice already rolled
    */

    if (diceValue !== 0) {

        showMessage(
            "Please select a token first."
        );

        return;

    }


    /*
       Roll
    */

    diceValue =
        Math.floor(
            Math.random() * 6
        ) + 1;


    diceElement.innerHTML =
        getDiceFace(diceValue);


    const player =
        players[currentPlayerIndex];


    /*
       Find movable tokens
    */

    const playerTokens =
        tokenData.filter(
            token =>
                token.player ===
                player.color
        );


    const movableTokens =
        playerTokens.filter(
            token =>
                canTokenMove(token)
        );


    /*
       NO TOKEN CAN MOVE
    */

    if (movableTokens.length === 0) {

        showMessage(
            `${player.name} cannot move. Turn passed.`
        );


        diceValue = 0;


        setTimeout(() => {

            nextPlayer();

        }, 800);


        return;

    }


    /*
       Token can move
    */

    showMessage(
        `${player.name} rolled ${diceValue}. Select a token.`
    );


    highlightPlayableTokens();

}


/* =====================================================
   DICE FACE
===================================================== */

function getDiceFace(number) {

    const faces = {

        1: "⚀",
        2: "⚁",
        3: "⚂",
        4: "⚃",
        5: "⚄",
        6: "⚅"

    };

    return faces[number];

}


/* =====================================================
   HIGHLIGHT TOKENS
===================================================== */

function highlightPlayableTokens() {

    removeHighlights();


    const player =
        players[currentPlayerIndex];


    tokenData
        .filter(
            token =>
                token.player ===
                player.color
        )
        .forEach(token => {

            if (
                canTokenMove(token)
            ) {

                token.element.style.transform =
                    "scale(1.2)";


                token.element.style.boxShadow =
                    "0 0 0 4px white, 0 0 15px white";

            }

        });

}


/* =====================================================
   TOKEN CLICK
===================================================== */

function handleTokenClick(
    color,
    tokenIndex
) {

    if (gameFinished) {

        return;

    }


    const player =
        players[currentPlayerIndex];


    /*
       Wrong player
    */

    if (color !== player.color) {

        showMessage(
            `It's ${player.name}'s turn.`
        );

        return;

    }


    /*
       Dice not rolled
    */

    if (diceValue === 0) {

        showMessage(
            "Roll the dice first."
        );

        return;

    }


    const token =
        tokenData.find(
            item =>
                item.player === color &&
                item.tokenIndex === tokenIndex
        );


    if (!token) {

        return;

    }


    /*
       Cannot move
    */

    if (!canTokenMove(token)) {

        showMessage(
            "This token cannot move."
        );

        return;

    }


    moveToken(token);

}


/* =====================================================
   MOVE TOKEN
===================================================== */

function moveToken(token) {

    const rolledValue =
        diceValue;


    /*
       Bring token out
    */

    if (token.progress === -1) {

        token.progress = 0;

    }

    else {

        token.progress += rolledValue;

    }


    /*
       Render
    */

    renderToken(token);


    removeHighlights();


    /*
       Cut opponent
    */

    checkCapture(token);


    /*
       Winner
    */

    if (
        hasPlayerWon(token.player)
    ) {

        diceValue = 0;

        endGame(token.player);

        return;

    }


    const wasSix =
        rolledValue === 6;


    diceValue = 0;


    /*
       6 = extra chance
    */

    if (wasSix) {

        showMessage(
            `${capitalize(token.player)} gets another chance! 🎲`
        );

        return;

    }


    /*
       Normal next turn
    */

    nextPlayer();

}


/* =====================================================
   RENDER TOKEN
===================================================== */

function renderToken(token) {

    /*
       Remove from current position
    */

    token.element.remove();


    let targetCell;


    /*
       HOME
    */

    if (token.progress === -1) {

        targetCell =
            getCell(
                token.homePosition[0],
                token.homePosition[1]
            );

    }


    /*
       COMMON PATH
    */

    else if (
        token.progress >= 0 &&
        token.progress <= 51
    ) {

        const player =
            players.find(
                item =>
                    item.color ===
                    token.player
            );


        const globalIndex =
            (
                player.startIndex +
                token.progress
            ) % 52;


        const coordinates =
            commonPath[globalIndex];


        targetCell =
            getCell(
                coordinates[0],
                coordinates[1]
            );

    }


    /*
       HOME LANE
    */

    else if (
        token.progress >= 52 &&
        token.progress <= 57
    ) {

        const player =
            players.find(
                item =>
                    item.color ===
                    token.player
            );


        const laneIndex =
            token.progress - 52;


        /*
           Final position
        */

        if (laneIndex >= 6) {

            targetCell =
                getCell(7, 7);

        }

        else {

            const coordinates =
                player.homeLane[laneIndex];


            targetCell =
                getCell(
                    coordinates[0],
                    coordinates[1]
                );

        }

    }


    if (targetCell) {

        targetCell.appendChild(
            token.element
        );


        token.element.classList
            .add("token-moving");


        setTimeout(() => {

            token.element.classList
                .remove("token-moving");

        }, 250);

    }


    token.element.dataset.progress =
        token.progress;

}


/* =====================================================
   CAPTURE
===================================================== */

function checkCapture(movingToken) {

    /*
       Only common path
    */

    if (
        movingToken.progress < 0 ||
        movingToken.progress > 51
    ) {

        return;

    }


    const player =
        players.find(
            item =>
                item.color ===
                movingToken.player
        );


    const globalIndex =
        (
            player.startIndex +
            movingToken.progress
        ) % 52;


    const coordinates =
        commonPath[globalIndex];


    const key =
        `${coordinates[0]}-${coordinates[1]}`;


    /*
       Safe
    */

    if (
        safeCells.includes(key)
    ) {

        return;

    }


    tokenData.forEach(otherToken => {

        if (
            otherToken === movingToken
        ) {

            return;

        }


        if (
            otherToken.player ===
            movingToken.player
        ) {

            return;

        }


        if (
            otherToken.progress < 0 ||
            otherToken.progress > 51
        ) {

            return;

        }


        const otherPlayer =
            players.find(
                item =>
                    item.color ===
                    otherToken.player
            );


        const otherGlobalIndex =
            (
                otherPlayer.startIndex +
                otherToken.progress
            ) % 52;


        if (
            otherGlobalIndex ===
            globalIndex
        ) {

            otherToken.progress = -1;


            renderToken(otherToken);


            showMessage(
                `${capitalize(movingToken.player)} cut ${capitalize(otherToken.player)}! ✂️`
            );

        }

    });

}


/* =====================================================
   WINNER
===================================================== */

function hasPlayerWon(color) {

    const tokens =
        tokenData.filter(
            token =>
                token.player === color
        );


    return tokens.every(
        token =>
            token.progress === 57
    );

}


/* =====================================================
   END GAME
===================================================== */

function endGame(color) {

    gameFinished = true;


    const player =
        players.find(
            item =>
                item.color === color
        );


    winnerTitle.innerText =
        `🏆 ${player.name} Wins!`;


    winnerModal.classList
        .remove("hidden");


    showMessage(
        `${player.name} has won the game!`
    );

}


/* =====================================================
   NEXT PLAYER
===================================================== */

function nextPlayer() {

    currentPlayerIndex++;


    if (
        currentPlayerIndex >=
        players.length
    ) {

        currentPlayerIndex = 0;

    }


    updateCurrentPlayer();

}


/* =====================================================
   UPDATE PLAYER
===================================================== */

function updateCurrentPlayer() {

    const player =
        players[currentPlayerIndex];


    currentPlayerElement.classList.remove(
        "red",
        "green",
        "yellow",
        "blue"
    );


    currentPlayerElement.classList.add(
        player.color
    );


    currentPlayerElement.innerHTML =
        `${getPlayerEmoji(player.color)} ${player.name} Player`;


    document
        .querySelectorAll(".player-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    const activePlayer =
        document.getElementById(
            `player-${player.color}`
        );


    if (activePlayer) {

        activePlayer.classList.add("active");

    }


    showMessage(
        `${player.name} Player's turn`
    );

}


/* =====================================================
   REMOVE HIGHLIGHTS
===================================================== */

function removeHighlights() {

    tokenData.forEach(token => {

        token.element.style.transform = "";

        token.element.style.boxShadow = "";

    });

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(message) {

    gameMessage.innerText =
        message;

}


/* =====================================================
   EMOJI
===================================================== */

function getPlayerEmoji(color) {

    const emojis = {

        red: "🔴",
        green: "🟢",
        yellow: "🟡",
        blue: "🔵"

    };

    return emojis[color];

}


/* =====================================================
   CAPITALIZE
===================================================== */

function capitalize(text) {

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}


/* =====================================================
   RESET GAME
===================================================== */

function resetGame() {

    currentPlayerIndex = 0;

    diceValue = 0;

    gameFinished = false;


    diceElement.innerHTML =
        "🎲";


    winnerModal.classList
        .add("hidden");


    createBoard();

    createTokens();

    updateCurrentPlayer();

}


/* =====================================================
   BUTTONS
===================================================== */

rollDiceButton.addEventListener(
    "click",
    rollDice
);


resetGameButton.addEventListener(
    "click",
    resetGame
);


playAgainButton.addEventListener(
    "click",
    resetGame
);


/* =====================================================
   START
===================================================== */

createBoard();

createTokens();

updateCurrentPlayer();