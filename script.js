let main = document.querySelector(".main");
let button = document.querySelector("button");
let timerDisplay = document.querySelector("#timer");
let scoreDisplay = document.querySelector(".scor");

let time = 60;
let timerInterval;
let totalMatches = 0;
let gameOver = false;

let colors = ["red","blue","green","yellow","orange","purple"];

let first = null;
let second = null;
let lock = false;
let score = 0;
let boxData = new Map();

button.addEventListener("click", function () {
  main.style.display = "grid";
  button.style.display = "none";
  timerDisplay.style.display = "block";
  scoreDisplay.style.display = "block";

  main.innerHTML = "";
  boxData.clear();

  score = 0;
  totalMatches = 0;
  time = 60;
  gameOver = false;

  scoreDisplay.innerText = "Score: 0";

  startTimer();
  createBoxes();
});

function createBoxes() {
  let pairs = [];

  colors.forEach(color => {
    pairs.push(color);
    pairs.push(color);
  });

  pairs.sort(() => Math.random() - 0.5);

  pairs.forEach(color => {
    let box = document.createElement("div");
    box.className = "box";

    let inner = document.createElement("div");
    inner.className = "inner";

    let front = document.createElement("div");
    front.className = "front";

    let back = document.createElement("div");
    back.className = "back";

    inner.appendChild(front);
    inner.appendChild(back);
    box.appendChild(inner);

    boxData.set(box, color);

    box.addEventListener("click", function () {
      if (lock || box.classList.contains("open") || gameOver) return;

      score++;
      scoreDisplay.innerText = "Score: " + score;

      box.classList.add("open");

      setTimeout(() => {
        back.style.background = boxData.get(box);
      }, 200);

      if (first === null) {
        first = box;
      } else {
        second = box;
        lock = true;


        if (boxData.get(first) === boxData.get(second)) {
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
  });
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