const boxEls = document.querySelectorAll(".box");
const statusEl = document.querySelector(".status");
const restartBtnEl = document.querySelector(".restartBtn");
let x = "<img src='X-Player.png'>";
let o = "<img src='O-Player.png'>";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();

function init() {
  boxEls.forEach((box) => box.addEventListener("click", boxClick));
  restartBtnEl.addEventListener("click", restartGame);
  statusEl.textContent = `Now "${player}" Turn`;
  running = true;
}

function boxClick(e) {
  const index = e.target.dataset.index;
  if (options[index] != "" || !running) {
    return;
  }
  updateBox(e.target, index);
  checkWinner();
}

function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  statusEl.textContent = `Now "${player}" Turn`;
  statusEl.style.color = "black";
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  statusEl.textContent = `Now "${player}" Turn`;
  statusEl.style.color = "black";
  restartBtnEl.textContent = "Restart 🔁";

  boxEls.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
}

function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxEls[condition[0]].classList.add("win");
      boxEls[condition[1]].classList.add("win");
      boxEls[condition[2]].classList.add("win");
    }
  }

  if (isWon) {
    statusEl.textContent = `Hurrah...! "${player}" Won the game🕺`;
    statusEl.style.color = "green";
    restartBtnEl.textContent = "Play Again 😉";
    running = false;
  } else if (!options.includes("")) {
    statusEl.textContent = `Oops..! Game Draw..!`;
    statusEl.style.color = "red";
    restartBtnEl.textContent = "Play Again 😉";
    running = false;
  } else {
    changePlayer();
  }
}
