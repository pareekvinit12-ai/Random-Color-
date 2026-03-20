let main = document.querySelector(".main");

let colors = [
  "red", "red",
  "blue", "blue",
  "green", "green",
  "yellow", "yellow",
  "orange", "orange",
  "purple", "purple"
];

colors.sort(() => Math.random() - 0.5);

let first = null;
let second = null;
let lock = false;

for (let i = 0; i < 12; i++) {
  let box = document.createElement("div");
  box.className = "box";
  box.dataset.color = colors[i];

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
    if (lock || box.classList.contains("open")) return;

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
        first = null;
        second = null;
        lock = false;
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