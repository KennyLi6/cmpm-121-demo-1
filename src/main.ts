import "./style.css";

const APP: HTMLDivElement = document.querySelector("#app")!;

const GAME_NAME = "Rat Infestation";
document.title = GAME_NAME;

const HEADER = document.createElement("h1");
HEADER.innerHTML = GAME_NAME;
APP.append(HEADER);

const FONT_SIZE = "50px";
const RAT_BUTTON = document.createElement("button");
RAT_BUTTON.innerHTML = "🐀";
RAT_BUTTON.title = "Enlist a rat into your army.";
RAT_BUTTON.style.width = "fit-content";
RAT_BUTTON.style.height = "fit-content";
RAT_BUTTON.style.fontSize = FONT_SIZE;
APP.append(RAT_BUTTON);

let count = 0;
const RAT_COUNTER = document.createElement("div");
RAT_COUNTER.innerHTML = count + " rats";
RAT_BUTTON.addEventListener("click", function () {
  count++;
  RAT_COUNTER.innerHTML = count + " rats";
});
APP.append(RAT_COUNTER);

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

const COST_MULTIPLIER = 1.15;
//thank you brace for helping formulate this increaseRPS section of code
type Command = () => void;

function increaseRPS(buttonObj: {
  amount: number;
  cost: number;
  purchased: number;
}): Command {
  return () => {
    growthRate += buttonObj.amount;
    count -= buttonObj.cost;
    buttonObj.cost = buttonObj.cost * COST_MULTIPLIER;
    buttonObj.purchased++;
    GROWTH_COUNTER.innerHTML = growthRate.toFixed(1) + " rats per second";
    requestAnimationFrame(countIncrement);
  };
}

function textFormat(buttonObj: {
  name: string;
  amount: number;
  cost: number;
  purchased: number;
}) {
  return `${buttonObj.name}<br>Increase rat production by ${buttonObj.amount}<br>Cost: ${buttonObj.cost.toFixed(2)}<br>Purchased: ${buttonObj.purchased}`;
}

let growthRate = 0;

//iterate through list to make buttons
for (let i = 0; i < availableItems.length; i++) {
  const increase: Command = increaseRPS(availableItems[i]);
  const growthButton = document.createElement("button");
  growthButton.addEventListener("click", increase);
  growthButton.title = availableItems[i].description;
  APP.append(growthButton);
}

const BUTTONS_NODE_LIST = document.querySelectorAll("button");
// Convert NodeList to an array
const BUTTONS_ARRAY: HTMLButtonElement[] = Array.from(BUTTONS_NODE_LIST);
const GROWTH_COUNTER = document.createElement("div");
GROWTH_COUNTER.innerHTML = growthRate + " rats per second";
APP.append(GROWTH_COUNTER);

const TIME_INTERVAL = 1000;
let startTime: number | undefined;
function countIncrement(timestamp: number) {
  if (growthRate > 0) {
    if (startTime === undefined) {
      startTime = timestamp;
    }
    if (timestamp - startTime >= TIME_INTERVAL) {
      count += growthRate;
      startTime = timestamp;
    }

    RAT_COUNTER.innerHTML = count.toFixed(2) + " rats";
  }

  //update button text with cost info, skip index 0 because that is the rat button
  for (let i = 1; i < BUTTONS_ARRAY.length; i++) {
    BUTTONS_ARRAY[i].innerHTML = textFormat(availableItems[i - 1]);
    //disable button if not enough rats
    BUTTONS_ARRAY[i].disabled = count < availableItems[i - 1].cost;
  }
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load
