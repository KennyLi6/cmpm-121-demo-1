import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Rat Infestation";
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

interface Item {
  name: string,
  cost: number,
  amount: number
};

const availableItems: Item[] = [
  {
    name: "Cheese Collectors",
    amount: 0.1,
    cost: 10,
  },
  {
    name: "Lab Rats",
    amount: 2,
    cost: 100,
  },
  {
    name: "Rat King",
    amount: 50,
    cost: 1000,
  }
];

//thank you brace for helping formulate this increase_rps section of code
type Command = () => void;

function increase_rps(button_obj: { amount: number; cost: number }): Command {
  return () => {
    growth_rate += button_obj.amount;
    count -= button_obj.cost;
    button_obj.cost = button_obj.cost * 1.15;
    growth_counter.innerHTML = growth_rate.toFixed(1) + " rats per second";
    requestAnimationFrame(countIncrement);
  };
}

function text_format(button_obj: { name: string, amount: number, cost: number }) {
  return `${button_obj.name}<br>Increase rat production by ${button_obj.amount}<br>Cost: ${button_obj.cost.toFixed(2)}`;
}

const increase_A: Command = increase_rps(availableItems[0]);
const increase_B: Command = increase_rps(availableItems[1]);
const increase_C: Command = increase_rps(availableItems[2]);

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

  //update button text with cost info
  growth_button_A.innerHTML = text_format(availableItems[0]);
  growth_button_B.innerHTML = text_format(availableItems[1]);
  growth_button_C.innerHTML = text_format(availableItems[2]);

  //disable button if not enough rats
  growth_button_A.disabled = count < availableItems[0].cost;
  growth_button_B.disabled = count < availableItems[1].cost;
  growth_button_C.disabled = count < availableItems[2].cost;
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load
