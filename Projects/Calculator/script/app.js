const displayElement = document.querySelector(".display");
const numberButtons = document.querySelector(".numbers").children;
const operatorButtons = document.querySelector(".operators").children;

const [
  clearButton,
  clearOneButton,
  btnZero,
  btnNine,
  btnEight,
  btnSeven,
  btnSix,
  btnFive,
  btnFour,
  btnThree,
  btnTwo,
  btnOne,
  equalsButton,
] = numberButtons;
const [addButton, subtractButton, multiplyButton, divideButton, modButton] = operatorButtons;

let displayContent = displayElement.value.trim();
let splitContent;
let total = 0;
let currentOperator = null;

const appendToDisplay = (value) => {
  if (isOperator(value) && isLastCharacterOperator()) {
    return; // Prevent adding multiple operators in a row
  }
  displayElement.value += value;
  displayContent = displayElement.value.trim();
};

const isOperator = (value) => ["+", "-", "*", "/", "%"].includes(value);

const isLastCharacterOperator = () => {
  const lastChar = displayElement.value.slice(-1);
  return isOperator(lastChar);
};

const convertToNumbers = () => {
  splitContent = splitContent.map((num) => Number(num));
};

const separateContent = () => {
  splitContent = displayContent.split(currentOperator);
  convertToNumbers();
};

const calculate = (currentValue, nextValue) => {
  switch (currentOperator) {
    case "+":
      return currentValue + nextValue;
    case "-":
      return currentValue - nextValue;
    case "*":
      return currentValue * nextValue;
    case "/":
      return currentValue / nextValue;
    case "%":
      return currentValue % nextValue;
    default:
      return nextValue;
  }
};

const computeTotal = () => {
  total = splitContent.reduce(calculate, splitContent.shift());
};

const onNumberButtonClick = (number) => appendToDisplay(number);

const onEqualsButtonClick = () => {
  if (isLastCharacterOperator()) {
    return; // Prevent calculation if the last character is an operator
  }
  separateContent();
  computeTotal();
  displayElement.value = total; // Display the result
  displayContent = displayElement.value;
};

const onClearButtonClick = () => {
  displayElement.value = ""; // Clear the display
  displayContent = "";
  total = 0;
  splitContent = [];
};

const onClearOneButtonClick = () => {
  displayElement.value = displayElement.value.slice(0, -1); // Remove the last character
  displayContent = displayElement.value;
};

btnOne.addEventListener("click", () => onNumberButtonClick(1));
btnTwo.addEventListener("click", () => onNumberButtonClick(2));
btnThree.addEventListener("click", () => onNumberButtonClick(3));
btnFour.addEventListener("click", () => onNumberButtonClick(4));
btnFive.addEventListener("click", () => onNumberButtonClick(5));
btnSix.addEventListener("click", () => onNumberButtonClick(6));
btnSeven.addEventListener("click", () => onNumberButtonClick(7));
btnEight.addEventListener("click", () => onNumberButtonClick(8));
btnNine.addEventListener("click", () => onNumberButtonClick(9));
btnZero.addEventListener("click", () => onNumberButtonClick(0));
equalsButton.addEventListener("click", onEqualsButtonClick);
clearButton.addEventListener("click", onClearButtonClick);
clearOneButton.addEventListener("click", onClearOneButtonClick);

const onOperatorButtonClick = (operator) => {
  if (isLastCharacterOperator()) {
    return; // Prevent adding multiple operators in a row
  }
  currentOperator = operator;
  appendToDisplay(operator);
};

addButton.addEventListener("click", () => onOperatorButtonClick("+"));
subtractButton.addEventListener("click", () => onOperatorButtonClick("-"));
multiplyButton.addEventListener("click", () => onOperatorButtonClick("*"));
divideButton.addEventListener("click", () => onOperatorButtonClick("/"));
modButton.addEventListener("click", () => onOperatorButtonClick("%"));
