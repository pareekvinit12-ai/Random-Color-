let main = document.querySelector(".main");
let button = document.querySelector("button");
let timerDisplay = document.querySelector("#timer");
let scoreDisplay = document.querySelector(".scor");

let time = 60;
let timerInterval;
let totalMatches = 0;
let gameOver = false;

let colors = [
  "red", "red",
  "blue", "blue",
  "green", "green",
  "yellow", "yellow",
  "orange", "orange",
  "purple", "purple"
];
let first = null;
let second = null;
let lock = false;
let score = 0;
scoreDisplay.innerText = "Score: 0";
timerDisplay.innerText = "Time: 60";
button.addEventListener("click", function () {
  main.style.display = "grid";
  button.style.display = "none";
  main.innerHTML = "";
  score = 0;
  totalMatches = 0;
  time = 60;
  gameOver = false;

  scoreDisplay.innerText = "Score: 0";

  startTimer();
  createBoxes();
});

function createBoxes() {
  let shuffled = [...colors].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 12; i++) {
    let box = document.createElement("div");
    box.className = "box";
    box.dataset.color = shuffled[i];

    let inner = document.createElement("div");
    inner.className = "inner";

    let front = document.createElement("div");
    front.className = "front";

    let back = document.createElement("div");
    back.className = "back";

    inner.appendChild(front);
    inner.appendChild(back);
    box.appendChild(inner);

    box.addEventListener("click", function () {
        timerDisplay.style.display = "block";
  scoreDisplay.style.display = "block";
      if (lock || box.classList.contains("open") || gameOver) return;

      score++;
      scoreDisplay.innerText = "Score: " + score;

      box.classList.add("open");

      setTimeout(() => {
        back.style.background = box.dataset.color;
      }, 200);

      if (first === null) {
        first = box;
      } else {
        second = box;
        lock = true;

        if (first.dataset.color === second.dataset.color) {
          totalMatches++;
          first = null;
          second = null;
          lock = false;

          if (totalMatches === 6) {
            clearInterval(timerInterval);
            alert("You Win!");
            gameOver = true;
          }

        } else {
          setTimeout(() => {
            first.querySelector(".back").style.background = "";
            second.querySelector(".back").style.background = "";

            first.classList.remove("open");
            second.classList.remove("open");

            first = null;
            second = null;
            lock = false;
          }, 800);
        }
      }
    });

    main.appendChild(box);
  }
}

function startTimer() {
  timerDisplay.innerText = "Time: " + time;

  timerInterval = setInterval(() => {
    time--;
    timerDisplay.innerText = "Time: " + time;

    if (time <= 0) {
      clearInterval(timerInterval);
      gameOver = true;
      alert("Game Over");
    }
  }, 1000);
}