let gameBox = document.querySelector(".game-box");
const cols = ['red', 'green', 'yellow', 'pink', 'deeppink', 'aqua', 'blue', 'blueviolet', 'chartreuse', 'chocolate'];
let arr = [0, 1, 2, 3, 4, 5];
let NumBots = 6;

function start() {
    let f = 0;
    generateNums();
    for (i = 0; i < NumBots; i++) {
        let bottle = document.createElement("div");
        bottle.className = 'bottle';
        for (j = 0; j < 4; j++) {
            bottle.appendChild(createBall(f++));
            if (f == NumBots) {
                f = 0;
                generateNums();
            }
        }
        gameBox.appendChild(bottle);
    }
}
start();

function generateNums() {
    let f = 0;
    for (let i = 0; i < NumBots;) {
        f = 0;
        let num = (Math.floor(Math.random() * 100) % NumBots);
        for (let j = 0; j < i; j++) {
            if (arr[j] == num) {
                f = 1;
                break;
            }
        }
        if (f != 1) {
            arr[i] = num;
            i++;
        }
    }
}

function createBall(i) {
    let ball = document.createElement("div");
    ball.className = 'ball';
    let n = arr[i];
    ball.id = n;
    ball.style.background = `radial-gradient(circle at 30% 30%, #ffffff 10%, ${cols[n]} 60%)`;
    // console.log(ball);
    return ball;
}

let prevStack = Array();
let nextStack = Array();
let isReady = false;
let prevTop;
let nextTop;
let move = 0;


function oneMoreBott() {
    let bottle = document.createElement("div");
    bottle.className = 'bottle';
    gameBox.appendChild(bottle);
    bottles = document.querySelectorAll(".bottle");
}

var bottles  = document.querySelectorAll(".bottle");;
bottles.forEach((bott) => {
    bott.addEventListener("click", () => {
        // console.log(bott.children);
        if (isReady) {
            if (bott.children.length < 4) {
                isReady = false;
                for (i = 0; i < bott.children.length; i++) {
                    nextStack.push(bott.children[i]);
                    nextTop = bott.children[i];
                }
                if (!bott.children.length) {
                    nextTop = prevTop;
                }
                sortBall(bott);
            }
        }
        else {
            isReady = true;
            for (i = 0; i < bott.children.length; i++) {
                prevStack.push(bott.children[i]);
                prevTop = bott.children[i];
            }
        }
    });
});

function sortBall(bott) {
    if (prevTop.id == nextTop.id) {
        let moves = document.querySelector(".move");
        moves.innerText = ++move;
        bott.appendChild(prevTop);
        winCondition();
        // for()
    }
}

function winCondition() {
    let isFull = false;
    for (i = 0; i < NumBots + 2; i++) {
        if (bottles[i].children.length == 4 || !bottles[i].children.length) {
            isFull = true;
            // console.log("yes");
        }
        else {
            isFull = false;
            // console.log("no");
            break;
        }
    }
    if (isFull) {
        win();
    }
}

let isWin = false;
function win() {
    for (j = 0; j < NumBots + 2; j++) {
        if (bottles[j].children.length)
            currId = bottles[j].children[0].id;
        else
            continue;
        for (i = 0; i < 4; i++) {
            if (bottles[j].children[i].id == currId) {
                isWin = true;
            }
            else {
                isWin = false;
                break;
            }
        }
    }
    if (isWin) {
        console.log("Won");
        let h1=document.createElement("h1");
        h1.innerText="YOU WON";
        gameBox.append(h1);
    }
}
