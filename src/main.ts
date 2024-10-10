import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Rat Infestation";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐀";
button.title = "Enlist a rat into your army.";
button.style.width = "fit-content";
button.style.height = "fit-content";
button.style.fontSize = "50px";
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
  name: string;
  cost: number;
  amount: number;
  purchased: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Cheese Collectors",
    amount: 0.1,
    cost: 10,
    purchased: 0,
    description:
      "Cheese Collectors automatically stash cheese to intice more rats to join your colony.",
  },
  {
    name: "Lab Rats",
    amount: 2,
    cost: 100,
    purchased: 0,
    description:
      "Studious rats that increase the effiency of Cheese Collectors.",
  },
  {
    name: "Rat King",
    amount: 50,
    cost: 1000,
    purchased: 0,
    description: "Rat kings that rally rats together.",
  },
  {
    name: "Whisker Warriors",
    amount: 200,
    cost: 10000,
    purchased: 0,
    description: "Rat warriors make your place more inviting to other rats.",
  },
  {
    name: "Realm Tailors",
    amount: 50000,
    cost: 100000,
    purchased: 0,
    description: "Rat wizards that modify the realm to the benefit of ratkind.",
  },
];

//thank you brace for helping formulate this increase_rps section of code
type Command = () => void;

function increase_rps(button_obj: {
  amount: number;
  cost: number;
  purchased: number;
}): Command {
  return () => {
    growth_rate += button_obj.amount;
    count -= button_obj.cost;
    button_obj.cost = button_obj.cost * 1.15;
    button_obj.purchased++;
    growth_counter.innerHTML = growth_rate.toFixed(1) + " rats per second";
    requestAnimationFrame(countIncrement);
  };
}

function text_format(button_obj: {
  name: string;
  amount: number;
  cost: number;
  purchased: number;
}) {
  return `${button_obj.name}<br>Increase rat production by ${button_obj.amount}<br>Cost: ${button_obj.cost.toFixed(2)}<br>Purchased: ${button_obj.purchased}`;
}

let growth_rate = 0;

//iterate through list to make buttons
for (let i = 0; i < availableItems.length; i++) {
  const increase: Command = increase_rps(availableItems[i]);
  const growth_button = document.createElement("button");
  growth_button.addEventListener("click", increase);
  growth_button.title = availableItems[i].description;
  app.append(growth_button);
}

const buttonsNodeList = document.querySelectorAll("button");
// Convert NodeList to an array
const buttonsArray: HTMLButtonElement[] = Array.from(buttonsNodeList);
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

  //update button text with cost info, skip index 0 because that is the rat button
  for (let i = 1; i < buttonsArray.length; i++) {
    buttonsArray[i].innerHTML = text_format(availableItems[i - 1]);
    //disable button if not enough rats
    buttonsArray[i].disabled = count < availableItems[i - 1].cost;
  }
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load
