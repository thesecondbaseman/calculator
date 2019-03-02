function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if(operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else {
    return alert('Something went horribly, horribly wrong.');
  }
}

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#calculator-input');
buttons.forEach((button) => {
  button.addEventListener('click', displayInput)
});

let input = [];
let operands = [];
let operators = [];
let displayValues = [];

function displayInput(e) {
  const button = e.target.textContent;

  if(button === "CE") {
    clearAll();
  } else if(button === "+" || button === "-") {
      if(input.length > 0) {
        storeOperand();
        storeOperator(button);
        clearInput();
      }
  } else if(button === "/" || button === "*") {
      if(input.length > 0) {
        storeOperand();
        storeOperator(button);
        clearInput();
      }
  } else if(button === "=") {
      if(input.length > 0) {
        storeOperand();
      }
      performOperation();
  } else {
      storeInput(button);
  }
}

function clearAll() {
  input.length = 0;
  operators.length = 0;
  operands.length = 0;
  displayValues.length = 0;
  display.textContent = "";
}

function storeInput(button) {
  input.push(`${(button)}`);
  displayValues.push(`${button}`);
  display.textContent = `${(displayValues.join(""))}`;
}

function storeOperator(button) {
  operators.push(`${(button)}`);
  displayValues.push(`${button}`);
  display.textContent = `${(displayValues.join(""))}`;
}

function storeOperand() {
  operands.push(input.reduce((value, input) => value + input));
}

function clearInput() {
  input.length = 0;
}

function performOperation() {
  // iterate over all operators
  let result = 0;
  while (operators.length > 0) {
    const special = operators.findIndex(operators => operators === "*" || operators === "/");
    if (special != -1) {
      result = operate(operators[special], +operands[special], +operands[special + 1]);
      operands.splice(special, 2);
      operators.splice(special, 1);
    } else {
      result = operate(operators[0], +operands[0], +operands[1]);
      operands.splice(0, 2);
      operators.splice(0, 1);
    }
    operands.splice(special, 0, result);
  }
    clearAll();
    storeInput(result);
}

/*function checkResult(result) {
  if(Number.isInteger(result)) {
    return result;
  } else {
    let resultString = result.toString();
    let modifiedNum;
    if(resultString.length > 10) {
      modifiedNum = parseFloat(resultString.slice(0, 14));
    } else {
        modifiedNum = result;
    }
    return modifiedNum.toPrecision();
  }
}*/
