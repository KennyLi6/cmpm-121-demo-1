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

//thank you brace for helping formulate this increase_rps section of code
type Command = () => void;

function increase_rps(amount: number, cost: number): Command {
  return () => {
    growth_rate+=amount;
    count -= cost;
    growth_counter.innerHTML = growth_rate.toFixed(1) + " rats per second"
    requestAnimationFrame(countIncrement);
  }
}

const amount_A = 0.1;
const amount_B = 2;
const amount_C = 50;

const cost_A = 10;
const cost_B = 100;
const cost_C = 1000;

const increase_A: Command = increase_rps(amount_A, cost_A);
const increase_B: Command = increase_rps(amount_B, cost_B);
const increase_C: Command = increase_rps(amount_C, cost_C);

// <br> is the \n of html, USE HTML SYNTAX WHEN TRYING TO DISPLAY TEXT
const increase_A_text = "Increase rat production by " + amount_A + "<br> Cost: "+ cost_A;
const increase_B_text = "Increase rat production by " + amount_B + "<br> Cost: "+ cost_B;
const increase_C_text = "Increase rat production by " + amount_C + "<br> Cost: "+ cost_C;

let growth_rate = 0;

const growth_button_A = document.createElement("button");
growth_button_A.innerHTML = increase_A_text;
growth_button_A.addEventListener("click", increase_A);
app.append(growth_button_A);

const growth_button_B = document.createElement("button");
growth_button_B.innerHTML = increase_B_text;
growth_button_B.addEventListener("click", increase_B);
app.append(growth_button_B);

const growth_button_C = document.createElement("button");
growth_button_C.innerHTML = increase_C_text;
growth_button_C.addEventListener("click", increase_C);
app.append(growth_button_C);

const growth_counter = document.createElement("div");
growth_counter.innerHTML = growth_rate + " rats per second"
app.append(growth_counter);

let start_time: number | undefined;
function countIncrement(timestamp: number) {
  if (growth_rate > 0) {
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
  }
  growth_button_A.disabled = (count < 10);
  growth_button_B.disabled = (count < 100);
  growth_button_C.disabled = (count < 1000);
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load