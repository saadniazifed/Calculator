const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const backSpaceButton = document.querySelector(".backSpaceButton");
const dotBtn = document.querySelector("#dotBtn");
// functions for all of the basic math operators
function add(firstNum, secondNum) {
  return +firstNum + +secondNum;
}

function subtract(firstNum, secondNum) {
  return +firstNum - +secondNum;
}

function multiply(firstNum, secondNum) {
  return +firstNum * +secondNum;
}

function divide(firstNum, secondNum) {
  return +firstNum / +secondNum;
}

// Operate function which performs calculation given the operator input and the number input.
function operate(firstNum, secondNum, operator) {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "*":
      return multiply(firstNum, secondNum);
    case "/":
      return divide(firstNum, secondNum);
  }
}

// Putting the default styling inside the calculator.
display.style.color = "white";
display.style.fontSize = "20px";
display.style.fontFamily = "Poppins";

let firstNum = "";
let secondNum = "";
let operatorChoice = "";
let flag = false;

// Operator is selected using this method.
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operatorChoice = operator.value;
    display.textContent = operatorChoice;
    flag = true;
    dotBtn.disabled = false;
  });
});

// Disabling the decimal button once its clicked.
dotBtn.addEventListener("click", () => {
  dotBtn.disabled = true;
});

// Numbers are selected based on the given condition of the boolean Flag.
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (flag == true) {
      secondNum += number.value;
      display.textContent += number.value;
    } else {
      firstNum += number.value;
      display.textContent = firstNum;
    }
  });
});

// BackSpace Button.
backSpaceButton.addEventListener("click", () => {
  if (flag == true) {
    secondNum = display.textContent.slice(0, -1);
    display.textContent = secondNum;
  } else {
    firstNum = display.textContent.slice(0, -1);
    display.textContent = firstNum;
  }
});

let result = 0;
let rounded = 0;

// When the user presses the equal sign.
equals.addEventListener("click", () => {
  if (equals.value == "=") {
    result = operate(firstNum, secondNum, operatorChoice);
    // Rounding off to the nearest 3 digits after the decimal.
    rounded = parseFloat(result.toFixed(3));
    display.textContent = rounded;

    // Disable all the buttons except for the Clear button.
    clearBtn.disabled = false;

    // If user tries to divide by Zero.
    if (firstNum > 0 && secondNum == 0 && operatorChoice == "/") {
      display.textContent = "TO INFINITY AND BEYOND! You can't divide by zero!";
    }

    // To make the Calculator have more operations and numbers.
    firstNum = result;
    secondNum = 0;
  }
});

// Clear button clears off everything.
clearBtn.addEventListener("click", () => {
  location.reload();
});
