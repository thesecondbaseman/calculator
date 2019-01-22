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
window.addEventListener('keydown', displayInput);


let input = [];
let values = [];
let operators = [];
let special = [];

function displayInput(e) {
  const button = e.target.textContent;

  if(button === "CE") {
    clearAll();
  } else if(button === "+" || button === "-") {
      if(input.length > 0) {
        storeValue();
        clearInput();
      }
      if(values.length > 1) {
        performOperation();
      }
      storeOperator(button);
  } else if(button === "/" || button === "*") {
      storeOperator(button);
      if(operators.length > 1) {
        special.push(Number(input.join("")));
      }
      if(input.length > 0 && (operators.length < 2)) {
        storeValue();
      }
      clearInput();
  } else if(button === "=") {
      storeValue();
      if(operators.length > 1) {
        performSpecialOperation();
      } else {
        performOperation();
      }
  } else {
      input.push(`${(button)}`);
      display.textContent = `${(input.join(""))}`;
    }
}

function clearAll() {
  input.splice(0, input.length);
  values.splice(0, values.length);
  operators.splice(0, operators.length);
  special.splice(0, special.length);
  display.textContent = "";
}

function storeValue() {
  if(operators.length < 2){
    values.push(Number(input.join("")));
  }
}

function clearInput() {
  input.splice(0, input.length);
}

function performSpecialOperation() {
    special.push(Number(input.join("")));
    clearInput();
    let operator = operators[1];
    let num1 = special[0];
    let num2 = special[1];
    let specialNum = operate(operator, num1, num2);
    values.push(specialNum);
    operators.splice(1, 2);
    special.splice(0, special.length);
    performOperation();
}

function performOperation() {
  const operator = operators[0];
  const num1 = values[0];
  const num2 = values[1];
  const result = operate(operator, num1, num2)
  clearAll();
  display.textContent = `${result}`;
  values.push(result);
}

function storeOperator(button) {
  operators.push(button);
}
