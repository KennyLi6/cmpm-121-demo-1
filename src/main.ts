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
    growth_button.disabled = (count < 10);
});
app.append(counter);

let growth_rate = 0;
const growth_button = document.createElement("button");
growth_button.innerHTML = "Create automatic rat"
growth_button.addEventListener("click", function () {
    growth_rate++;
    count -= 10;
    growth_counter.innerHTML = growth_rate + " rats per second"
    requestAnimationFrame(countIncrement);
});
app.append(growth_button);
growth_button.disabled = (count < 10);

const growth_counter = document.createElement("div");
growth_counter.innerHTML = growth_rate + " rats per second"
app.append(growth_counter);

let start_time: number | undefined;
function countIncrement(timestamp: number) {
    if (start_time === undefined) {
        start_time = timestamp;
    }
    const elapsed = timestamp - start_time;
    const rat_per_second = elapsed / (1000 * (1 / growth_rate));
    counter.innerHTML = (count + rat_per_second).toFixed(2) + " rats";
        
    if (rat_per_second >= 1) {
        count += 1;
        counter.innerHTML = count + " rats";
        start_time = timestamp;
    }
    growth_button.disabled = (count < 10);
    requestAnimationFrame(countIncrement);
}