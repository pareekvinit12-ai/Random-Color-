let button = document.querySelector("button");
let boxes = document.querySelectorAll(".img-box");

let letters = "ABCD";

button.addEventListener("click", function () {
    boxes.forEach(function (box, index) {

        box.style.position = "relative";

        if (box.querySelector("span")) return;

        let text = document.createElement("span");
        text.innerText = letters[index];

        text.style.position = "absolute";
        text.style.top = "50%";
        text.style.left = "50%";
        text.style.transform = "translate(-50%, -50%)";
        text.style.color = "white";
        text.style.fontSize = "20px";
        text.style.fontWeight = "bold";
        text.style.background = "rgba(0,0,0,0.5)";
        text.style.padding = "5px 10px";
        text.style.borderRadius = "5px";

        box.appendChild(text);
    });
});

document.addEventListener("keydown", function (e) {
    let key = e.key.toUpperCase();

    if (key === "A") {
        document.getElementById("soundA").play();
    }
    if (key === "B") {
        document.getElementById("soundB").play();
    }
    if (key === "C") {
        document.getElementById("soundC").play();
    }
    if (key === "D") {
        document.getElementById("soundD").play();
    }
});