// DECLARING VARIABLES
const buttons = document.querySelectorAll(".btn");
const history = document.querySelector("#history");
let currentExpression = document.querySelector("#number");
let limit = 110;
//SCREEN WIDTH
limit = screen.width > 450 && screen.width <= 480 ? 14 : 11;
limit = screen.width > 500 && screen.width <= 600 ? 17 : 11;
limit = screen.width > 600 && screen.width <= 720 ? 13 : 11;
// DECLARING FUNCTIONS
const modifyingExpression = (char) => {
  history.innerText === "0"
    ? (history.innerText = currentExpression.innerText)
    : (history.innerText += currentExpression.innerText);
  history.innerText[history.innerText.length - 1] != char
    ? (history.innerText += char)
    : null;
  currentExpression.innerHTML = "";
};
const changeSign = () => {
  currentExpression.innerText[0] != "-"
    ? (currentExpression.innerText = "-" + currentExpression.innerText)
    : (currentExpression.innerText = currentExpression.innerText.slice(
        1,
        currentExpression.innerText.length
      ));
};
const expressionToBeEvaluated = (number) =>
  currentExpression.innerText.length == limit
    ? alert("Reached Maximum Length")
    : (currentExpression.innerText += number);
const clearClac = () => {
  currentExpression.innerText = " ";
  history.innerText = "0";
};
const removeLastChar = () =>
  (currentExpression.innerText = currentExpression.innerText.slice(
    0,
    currentExpression.innerText.length - 1
  ));
const addDecimal = (decimal) =>
  currentExpression.innerText.indexOf(".") == -1
    ? (currentExpression.innerText += decimal)
    : null;
const trimExpression = () => {
  while (
    history.innerText[history.innerText.length - 1] === "-" ||
    history.innerText[history.innerText.length - 1] === "+" ||
    history.innerText[history.innerText.length - 1] === "." ||
    history.innerText[history.innerText.length - 1] === "/" ||
    history.innerText[history.innerText.length - 1] === "*"
  )
    history.innerText = history.innerText.slice(
      0,
      history.innerText.length - 1
    );
  return history.innerText;
};
const evaluateExpression = () => {
  history.innerText !== "0"
    ? (history.innerText += currentExpression.innerText)
    : (history.innerText = currentExpression.innerText || "0");
  history.innerText = trimExpression();
  history.innerText !== "0"
    ? (currentExpression.innerText = eval(history.innerText) || 0)
    : (currentExpression.innerText = "");
  history.innerText = "0";
};
const calculatePercentage = (val1, val2, opr) => {
  console.log(`Value1: ${val1}, Value2: ${val2}, Operation: ${opr}`);
  switch (opr) {
    case "+":
      return val1 + (val1 * val2) / 100;
    case "-":
      return val1 - (val1 * val2) / 100;
    case "*":
      return (val1 * (val2 * val1)) / 100;
    case "/":
      return val1 / (val1 * val2) / 100;
  }
};
const getPercent = () => {
  if (currentExpression.innerText !== "" && history.innerText !== "0") {
    let value = eval(history.innerText.slice(0, history.innerText.length - 1));
    let value2 = parseFloat(currentExpression.innerText);
    let oper = history.innerText[history.innerText.length - 1];
    currentExpression.innerText = calculatePercentage(value, value2, oper);
    history.innerText = "0";
  } else if (currentExpression.innerText !== "") {
    history.innerText[0] === "0"
      ? (history.innerText = currentExpression.innerText)
      : null;
    history.innerText = trimExpression();
    let newA = eval(history.innerText);
    history.innerText = "(" + newA + ")/100";
    currentExpression.innerText = eval(history.innerText);
    history.innerText = "0";
  }
};
const expression = (e) => {
  switch (e.target.innerText) {
    case "-":
      modifyingExpression("-");
      break;
    case "+":
      modifyingExpression("+");
      break;
    case "x":
      modifyingExpression("*");
      break;
    case "÷":
      modifyingExpression("/");
      break;
    case "+/-":
      changeSign();
      break;
    case "AC":
      clearClac();
      break;
    case "C":
      removeLastChar();
      break;
    case ".":
      addDecimal(".");
      break;
    case "%":
      getPercent();
      break;
    case "=":
      evaluateExpression();
      break;
    default:
      expressionToBeEvaluated(e.target.innerText);
      break;
  }
};
for (i of buttons) i.addEventListener("click", expression);
