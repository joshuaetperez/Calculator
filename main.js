// Takes in two numbers and returns the sum
function add(a, b) {
    return +a + +b;
}

// Takes in two numbers and returns the difference
function subtract(a, b) {
    return a - b;
}

// Takes in two numbers and returns the product
function multiply(a, b) {
    return a * b;
}

// Takes in two numbers and returns the quotient
// If the divisor is 0, return error message
function divide(a, b) {
    if (b == 0) {
        return 'Cannot divide by 0';
    }
    return a / b;
}

// Takes in an operator and two numbers and executes the specified operation
function operate(operator, a, b) {
    if (operator == '+') {
        return add(a, b);
    }
    else if (operator == '-') {
        return subtract(a, b);
    }
    else if (operator == '*') {
        return multiply(a, b);
    }
    else if (operator == '/') {
        return divide(a, b);
    }
}

// Takes the number the user clicked on and adds it to the display
function addToDisplay(e) {
    if (resetDisplay) {
        calcDisplay.textContent = '0';
        resetDisplay = false;
    }
    if (calcDisplay.textContent == '0') {
        calcDisplay.textContent = this.id;
    }
    else {
        calcDisplay.textContent += this.id;
    }
    currentNumberDisplayed = calcDisplay.textContent;
    if (operatorStored == null) {
        firstNumberDisplayed = currentNumberDisplayed;
    }
}

// Takes the operator the user clicked on and stores it for later use
function storeOperator(e) {
    operatorStored = this.id;
    resetDisplay = true;
}

function evaluate(e) {
    const result = operate(operatorStored, firstNumberDisplayed, currentNumberDisplayed);
    calcDisplay.textContent = result;
    firstNumberDisplayed = result;
    currentNumberDisplayed = result;
}

// Global variables
let firstNumberDisplayed = 0;
let currentNumberDisplayed = 0;
let operatorStored = null;
let resetDisplay = false;

// DOM variables
const calcDisplay = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number, .zero');
const operatorButtons = document.querySelectorAll('.operator');
const evaluatorButton = document.querySelector('.evaluator');

// Event listeners
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', addToDisplay);
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', storeOperator);
});

evaluatorButton.addEventListener('click', evaluate);