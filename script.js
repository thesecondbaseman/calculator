let input = [];
let operands = [];
let operators = [];

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

function displayInput(dataInput) {
  const button = dataInput;
  const validInputCheck = /^\d+|\./;
  const invalidDecimalNumberCheck = /\.{2,}|\.\d+\./g;
  const key = document.querySelector(`button[data-button="${dataInput}"]`);
  if(key) {
    key.classList.add('button-active');
  }

  if(button === "CE" || button === "c") {
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
  } else if(button === "=" || button === "Enter") {
      if(operands.length === 0) return
      if(input.length > 0) {
        storeOperand();
      }
      if(operators.length > 0) {
        performOperation();
      }
  } else if (validInputCheck.test(button)) {
      if(invalidDecimalNumberCheck.test(input.join('') + button)) return
      storeInput(button);
  }
}

function clearAll() {
  input.length = 0;
  operators.length = 0;
  operands.length = 0;
  display.textContent = "";
}

function storeInput(button) {
  input.push(`${(button)}`);
  display.textContent += `${button}`;
}

function storeOperator(button) {
  operators.push(`${(button)}`);
  display.textContent += `${button}`;
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
    if (special !== -1) {
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

function removeTransition(e) {
  this.classList.remove('button-active');
}

// TODO: fix number being added to display when focus
window.addEventListener('keydown', e => displayInput(e.key));
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#calculator-input');
buttons.forEach(button => {
  button.addEventListener('click', e => displayInput(e.target.textContent));
  button.addEventListener('transitionend', removeTransition);
});
