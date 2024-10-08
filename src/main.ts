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
const counter = document.createElement("div");
counter.innerHTML = count + " rats";
button.addEventListener("click", function () {
  count++;
  counter.innerHTML = count + " rats";
});
app.append(counter);

let start_time: number | undefined;
function countIncrement(timestamp: number) {
    if (start_time === undefined) {
        start_time = timestamp;
    }
    const elapsed = timestamp - start_time;
    counter.innerHTML = (count + (elapsed/1000)).toFixed(2) + " rats";
    /*
    Once 1s has passed, increment count, update counter
    restart timer
    */
    if (elapsed >= 1000) {
        count += 1;
        counter.innerHTML = count + " rats";
        start_time = timestamp;
    }
    //function for easy reuse and setInterval
    requestAnimationFrame(countIncrement)
}

requestAnimationFrame(countIncrement);

