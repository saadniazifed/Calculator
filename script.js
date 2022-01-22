const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector(".clear");
const backSpaceBtn = document.querySelector(".backSpaceButton");

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
    operatorChoice = display.textContent = operator.value;
    flag = true;
  });
});

// Numbers are selected based on the given condition of the boolean Flag.
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (flag == true) {
      // After the operator is clicked, store the value in secondNum
      secondNum += parseFloat(number.value);
      display.textContent += parseInt(number.value);
    } else {
      // Otherwise keep on storing it in firstNum.
      firstNum += parseFloat(number.value);
      display.textContent = firstNum;
    }
  });
});

let result = 0;
let rounded = 0;

// When the user presses the equal sign.
equals.addEventListener("click", () => {
  if (equals.value == "=") {
    result = operate(firstNum, secondNum, operatorChoice);
    rounded = Number(result.toFixed(3));
    display.textContent = rounded;
    // Rounding off to the nearest 3 digits after the decimal.

    // Once the calculation is done ONCE, disable all the buttons.
    buttons.forEach((button) => {
      button.disabled = true;
    });
    // Disable all the buttons except for the Clear button.
    clearBtn.disabled = false;

    // If user tries to divide by Zero.
    if (firstNum > 0 && secondNum == 0 && operatorChoice == "/") {
      display.textContent = "TO INFINITY AND BEYOND! You can't divide by zero!";
    }
  }
});

// Clear button clears off everything.
clearBtn.addEventListener("click", () => {
  location.reload();
});
