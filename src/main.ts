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

function increase_rps(button_obj: { amount: number, cost: number }): Command {
  return () => {
    growth_rate += button_obj.amount;
    count -= button_obj.cost;
    button_obj.cost = button_obj.cost * 1.15;
    growth_counter.innerHTML = growth_rate.toFixed(1) + " rats per second";
    requestAnimationFrame(countIncrement);
  };
}

const button_A = {
  amount: 0.1,
  cost: 10,
  get text() {
    return `Increase rat production by ${this.amount}<br>Cost: ${this.cost.toFixed(2)}`;
  }
}

const button_B = {
  amount: 2,
  cost: 100,
  get text() {
    return `Increase rat production by ${this.amount}<br>Cost: ${this.cost.toFixed(2)}`;
  }
}

const button_C = {
  amount: 50,
  cost: 1000,
  get text() {
    return `Increase rat production by ${this.amount}<br>Cost: ${this.cost.toFixed(2)}`;
  }
}

const increase_A: Command = increase_rps(button_A);
const increase_B: Command = increase_rps(button_B);
const increase_C: Command = increase_rps(button_C);

let growth_rate = 0;

const growth_button_A = document.createElement("button");
growth_button_A.addEventListener("click", increase_A);
app.append(growth_button_A);

const growth_button_B = document.createElement("button");
growth_button_B.addEventListener("click", increase_B);
app.append(growth_button_B);

const growth_button_C = document.createElement("button");
growth_button_C.addEventListener("click", increase_C);
app.append(growth_button_C);

const growth_counter = document.createElement("div");
growth_counter.innerHTML = growth_rate + " rats per second";
app.append(growth_counter);

let start_time: number | undefined;
function countIncrement(timestamp: number) {
  if (growth_rate > 0) {
    if (start_time === undefined) {
      start_time = timestamp;
    }
    if (timestamp - start_time >= 1000) {
      count += growth_rate;
      start_time = timestamp;
    }
    
    counter.innerHTML = count.toFixed(2) + " rats";
  }
  //TODO: fix buttons not dispaly proper text
  //costs correct amount but enabled at incorrect amount
  growth_button_A.innerHTML = button_A.text;
  growth_button_B.innerHTML = button_B.text;
  growth_button_C.innerHTML = button_C.text;

  growth_button_A.disabled = count < button_A.cost;
  growth_button_B.disabled = count < button_B.cost;
  growth_button_C.disabled = count < button_C.cost;
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load
