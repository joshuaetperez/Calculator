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
    // If an operator button has been the most recently pressed OR the error 'Cannot divide by 0' is on the display, reset the display text
    if (resetDisplay || (firstNumberDisplayed == null && currentNumberDisplayed == null)) {
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
    // If the error 'Cannot divide by 0' is on the display, make the operator buttons do nothing
    if (firstNumberDisplayed == null && currentNumberDisplayed == null) {
        return;
    }
    if (!resetDisplay && numbersChosen != 2) {
        numbersChosen++;
    }
    hasADecimal = false;
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
    if (result == 'Cannot divide by 0') {
        firstNumberDisplayed = null;
        currentNumberDisplayed = null;
        numbersChosen = 0;
    }
    else {
        firstNumberDisplayed = result;
        currentNumberDisplayed = result;
    }
    operatorStored = null;
    lastPressedButtonWasNumber = false;
}

// Resets global variables to initial values and resets display
function clear() {
    firstNumberDisplayed = 0;
    currentNumberDisplayed = 0;
    operatorStored = null;
    resetDisplay = false;
    numbersChosen = 0;
    lastPressedButtonWasNumber = true;
    hasADecimal = false;
    calcDisplay.textContent = '0';
}

// Changes the sign of the displayed number
function changeSign() {
    // If the number 0 is on the display OR the error 'Cannot divide by 0' is on the display, exit function without doing anything
    if (currentNumberDisplayed == 0 || (firstNumberDisplayed == null && currentNumberDisplayed == null)) {
        return;
    }
    else if (currentNumberDisplayed > 0) {
        calcDisplay.textContent = '-' + calcDisplay.textContent;
    }
    else {
        calcDisplay.textContent = calcDisplay.textContent.slice(1);
    }
    if (operatorStored == null) {
        firstNumberDisplayed = -firstNumberDisplayed;
    }
    currentNumberDisplayed = -currentNumberDisplayed;
}

// Adds a decimal to the number on the display if there is not one present
function addDecimal() {
    if (!hasADecimal && !resetDisplay) {
        calcDisplay.textContent += '.';
        hasADecimal = true;
    }
}

// Helper function that determines whether a number is a decimal or not
// Note: numbers such as 5. and 5.0 are NOT considered decimals
function isADecimal(num) {
    let absNum = Math.abs(num);
    if (absNum - Math.floor(absNum) == 0) {
        return false;
    } 
    return true;
}

function debug() {
    console.log(`firstNumberDisplayed: ${firstNumberDisplayed}`);
    console.log(`currentNumberDisplayed: ${currentNumberDisplayed}`);
    console.log(`operatorStored: ${operatorStored}`);
    console.log(`resetDisplay: ${resetDisplay}`);
    console.log(`numbersChosen: ${numbersChosen}`);
    console.log(`lastPressedButtonWasNumber: ${lastPressedButtonWasNumber}`);
    console.log(`hasADecimal: ${hasADecimal}`);
}

// Global variables
let firstNumberDisplayed = 0;
let currentNumberDisplayed = 0;
let operatorStored = null;
let resetDisplay = false;
let numbersChosen = 0; // If numbersChosen == 2, that means two inputs have been put in
let lastPressedButtonWasNumber = true;
let hasADecimal = false;

// DOM variables
const calcDisplay = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number, .zero');
const operatorButtons = document.querySelectorAll('.operator');
const evaluatorButton = document.querySelector('.evaluator');
const clearButton = document.querySelector('.clear');
const unaryButton = document.querySelector('.unary');
const decimalButton = document.querySelector('.decimal');

// Event listeners
numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', addToDisplay);
});
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', storeOperator);
});
evaluatorButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
unaryButton.addEventListener('click', changeSign);
decimalButton.addEventListener('click', addDecimal);
