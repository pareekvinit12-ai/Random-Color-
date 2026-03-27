let main = document.querySelector(".main");
let button = document.querySelector("button");
let timerDisplay = document.querySelector("#timer");
let scoreDisplay = document.querySelector(".scor");
let playerNameInput = document.querySelector("#playerName");
let resultDisplay = document.querySelector("#result");

let time = 60;
let timerInterval;
let totalMatches = 0;
let gameOver = false;

let colors = ["red","blue","green","yellow","orange","purple"];

let first = null;
let second = null;
let lock = false;
let Click = 0;
let boxData = new Map();

let playerName = "";
button.addEventListener("click", function () {

  playerName = playerNameInput.value.trim();

  if (playerName === "") {
    alert("Enter your name first");
    return;
  }

  main.style.display = "grid";
  button.style.display = "none";
  playerNameInput.style.display = "none";

  timerDisplay.style.display = "block";
  scoreDisplay.style.display = "block";
  resultDisplay.style.display = "none";

  main.innerHTML = "";
  boxData.clear();

  Click = 0;
  totalMatches = 0;
  time = 60;
  gameOver = false;
  first = null;
  second = null;
  lock = false;

  scoreDisplay.innerText = "Click: 0";

  startTimer();
  createBoxes();
});
function endGameUI(message) {
  main.style.display = "none";
  timerDisplay.style.display = "none";
  scoreDisplay.style.display = "none";

  resultDisplay.style.display = "block";
  resultDisplay.innerText = message;
}


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

      Click++;
      scoreDisplay.innerText = "Click: " + Click;

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
            gameOver = true;

            let timeTaken = 60 - time;

            let result = `${playerName} ne ${timeTaken} sec me ${Click} clicks me game complete kiya`;

            saveResult(playerName, Click, "Win", timeTaken);

            endGameUI(result);

            alert("You Win!");
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

      let result = `${playerName} game complete nahi kar paya. Clicks: ${Click}`;

      saveResult(playerName, Click, "Lose", 60);

      endGameUI(result);

      alert("Game Over");
    }
  }, 100);
}
function saveResult(name, clicks, status, timeTaken) {
  let history = JSON.parse(localStorage.getItem("gameResults")) || [];

  history.push({
    name: name,
    clicks: clicks,
    status: status,
    time: timeTaken,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("gameResults", JSON.stringify(history));
}