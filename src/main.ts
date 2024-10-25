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
    buttonObj.cost = buttonObj.cost * 1.15;
    buttonObj.purchased++;
    growthCounter.innerHTML = growthRate.toFixed(1) + " rats per second";
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
  app.append(growthButton);
}

const buttonsNodeList = document.querySelectorAll("button");
// Convert NodeList to an array
const buttonsArray: HTMLButtonElement[] = Array.from(buttonsNodeList);
const growthCounter = document.createElement("div");
growthCounter.innerHTML = growthRate + " rats per second";
app.append(growthCounter);

let startTime: number | undefined;
function countIncrement(timestamp: number) {
  if (growthRate > 0) {
    if (startTime === undefined) {
      startTime = timestamp;
    }
    if (timestamp - startTime >= 1000) {
      count += growthRate;
      startTime = timestamp;
    }

    counter.innerHTML = count.toFixed(2) + " rats";
  }

  //update button text with cost info, skip index 0 because that is the rat button
  for (let i = 1; i < buttonsArray.length; i++) {
    buttonsArray[i].innerHTML = textFormat(availableItems[i - 1]);
    //disable button if not enough rats
    buttonsArray[i].disabled = count < availableItems[i - 1].cost;
  }
  requestAnimationFrame(countIncrement);
}

requestAnimationFrame(countIncrement); //start clock when load
