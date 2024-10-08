import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My new remade game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐀";
app.append(button);

let count = 0;
function countIncrement() { //function for easy reuse and setInterval
    count+=1;
    counter.innerHTML = count + " rats";
} 
const counter = document.createElement("div");
counter.innerHTML = count + " rats";
button.addEventListener("click", function () {
  countIncrement();
});
app.append(counter);

setInterval(countIncrement, 1000); //delay is in milliseconds
