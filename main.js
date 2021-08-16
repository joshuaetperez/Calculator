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
function addToDisplay() {
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
    lastPressedButtonWasNumber = true;
}

// Takes the operator the user clicked on and stores it for later use
function storeOperator() {
    if (!resetDisplay && numbersChosen != 2) {
        numbersChosen++;
    }
    if (numbersChosen == 2 && lastPressedButtonWasNumber) {
        evaluate();
    }
    operatorStored = this.id;
    resetDisplay = true;
}

// Calculates the result of the inputs given by the user
function evaluate() {
    if (operatorStored == null) {
        return;
    }
    if (this.className == 'evaluator') {
        numbersChosen = 0;
    }
    const result = operate(operatorStored, firstNumberDisplayed, currentNumberDisplayed);
    calcDisplay.textContent = result;
    firstNumberDisplayed = result;
    currentNumberDisplayed = result;
    operatorStored = null;
    lastPressedButtonWasNumber = false;
}

// function debug() {
//     console.log(`firstNumberDisplayed: ${firstNumberDisplayed}`);
//     console.log(`currentNumberDisplayed: ${currentNumberDisplayed}`);
//     console.log(`operatorStored: ${operatorStored}`);
//     console.log(`resetDisplay: ${resetDisplay}`);
//     console.log(`numbersChosen: ${numbersChosen}`);
//     console.log(`lastPressedButtonWasNumber: ${lastPressedButtonWasNumber}`);
// }

// Global variables
let firstNumberDisplayed = 0;
let currentNumberDisplayed = 0;
let operatorStored = null;
let resetDisplay = false;
let numbersChosen = 0; // If numbersChosen == 2, that means two inputs have been put in
let lastPressedButtonWasNumber = true;

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