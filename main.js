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
    let input = this.id;
    if (e.type == 'keydown') {
        input = e.key;
    }
    // If an operator button has been the most recently pressed OR an error is on the display, reset the display text
    if (resetDisplay || firstNumberDisplayed == null) {
        calcDisplay.textContent = '0';
        resetDisplay = false;
    }
    let lengthWithoutDecimalAndSign = calcDisplay.textContent.length;
    if (isDecimal()) lengthWithoutDecimalAndSign--;
    if (currentNumberDisplayed < 0) lengthWithoutDecimalAndSign--;
    if (lengthWithoutDecimalAndSign >= displayNumberLength && !resetDisplay) {
        return;
    }
    if (calcDisplay.textContent == '0' && !isDecimal()) {
        calcDisplay.textContent = input;
    }
    else {
        calcDisplay.textContent += input;
    }
    currentNumberDisplayed = calcDisplay.textContent;
    if (operatorStored == null) {
        firstNumberDisplayed = currentNumberDisplayed;
    }
}

// Takes the operator the user clicked on and stores it for later use with the evaluation (=) button 
// If a pair of two numbers has already been decided, evaluate with the specified operator
function storeOperator(e) {
    // If an error is on the display, make the operator buttons do nothing
    if (firstNumberDisplayed == null) {
        return;
    }
    let input = this.id;
    if (e.type == 'keydown') {
        input = e.key;
    }
    if (!resetDisplay && numbersChosen != 2) {
        numbersChosen++;
    }
    if (numbersChosen == 2) {
        evaluate();
        if (firstNumberDisplayed == null) {
            return;
        }
    }
    operatorStored = input;
    resetDisplay = true;
    subDisplay.textContent = `${firstNumberDisplayed} ${operatorStored} \u00A0`;
}

// Calculates the result of the inputs given by the user
function evaluate() {
    if (operatorStored == null) {
        return;
    }
    if (this.className != 'operator') {
        numbersChosen = 0;
        subDisplay.textContent = `${firstNumberDisplayed} ${operatorStored} ${currentNumberDisplayed} = \u00A0`;
    }
    let result = operate(operatorStored, firstNumberDisplayed, currentNumberDisplayed);
    if (result == 'Cannot divide by 0') {
        calcDisplay.textContent = 'Cannot divide by 0';
        firstNumberDisplayed = null;
        currentNumberDisplayed = null;
        numbersChosen = 0;
    }
    else {
        calcDisplay.textContent = result;
        result = roundDecimal(calcDisplay.textContent);
        if (result > Number.MAX_SAFE_INTEGER) {
            calcDisplay.textContent = "Number is too big";
            firstNumberDisplayed = null;
            currentNumberDisplayed = null;
        }
        else if (result < Number.MIN_SAFE_INTEGER) {
            calcDisplay.textContent = "Number is too small";
            firstNumberDisplayed = null;
            currentNumberDisplayed = null;
        }
        else if (isNaN(result)) {
            firstNumberDisplayed = null;
            currentNumberDisplayed = null;
        }
        else {
            calcDisplay.textContent = result;
            firstNumberDisplayed = result;
            currentNumberDisplayed = result;
        }
    }
    operatorStored = null;
}

// Resets all global variables to initial values and resets both displays
function clear() {
    firstNumberDisplayed = 0;
    currentNumberDisplayed = 0;
    operatorStored = null;
    resetDisplay = false;
    numbersChosen = 0;
    calcDisplay.textContent = '0';
    subDisplay.textContent = '';
}

// Changes the sign of the displayed number
function changeSign() {
    // If the number 0 is on the display OR if an error is on the display, exit function without doing anything
    if (currentNumberDisplayed == 0 || firstNumberDisplayed == null) {
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
    // If an error is on the display, exit function without doing anything
    if (firstNumberDisplayed == null) {
        return;
    }
    // If the previous button pressed was a number
    if (!isDecimal() && !resetDisplay) {
        calcDisplay.textContent += '.';
    }
    // If the previous button pressed was an operator
    else if (resetDisplay) {
        calcDisplay.textContent = '0.'
        currentNumberDisplayed = 0;
        resetDisplay = false;
    }
}

// Helper function that determines whether the number on the calculator display is a decimal or not
// Does NOT work with numbers, only with strings
function isDecimal() {
    if (calcDisplay.textContent.includes('.')) {
        return true
    }
    return false;
}

// Removes the last character from the display
function backspace() {
    let displayText = calcDisplay.textContent;
    // If the number 0 is on the display OR an error is on the display, exit function without doing anything
    if (displayText == '0' || firstNumberDisplayed == null) {
        return;
    }
    // If the number in the display is a single digit integer, replace it with a 0
    else if ((displayText.length == 2 && displayText.slice(0, 1) == '-') || displayText.length == 1) {
        calcDisplay.textContent = '0';
        currentNumberDisplayed = 0;
    }
    else if (displayText.slice(-1) == '.' || displayText.slice(-2, -1) == '.') {
        calcDisplay.textContent = displayText.slice(0, -1);
        currentNumberDisplayed = calcDisplay.textContent;
    }
    else {
        calcDisplay.textContent = displayText.slice(0, -1);
        currentNumberDisplayed = calcDisplay.textContent;
    }
    if (operatorStored == null) {
        firstNumberDisplayed = currentNumberDisplayed;   
    }
}

// Allows user to use the keyboard for input
function keyboard(e) {
    let code = e.keyCode;
    let key = e.key;
    // For numbers 0-9 (and *)
    if ((48 <= code && code <= 57) || (96 <= code && code <= 105)) {
        if (key == '*') {
            storeOperator(e);
            return;
        }
        else if (isNaN(key)) {
            return;
        }
        addToDisplay(e);
    }
    // For operators +, -, *, /
    else if (key == '+' || key == '-' || key == '*' || key == '/') {
        storeOperator(e);
    }
    // For Enter (ENTER or =)
    else if (code == 13 || code == 187) {
        evaluate();
    }
    // For clear (Esc)
    else if (code == 27) {
        clear();
    }
    // For decimal (.)
    else if (key == '.') {
        addDecimal();
    }
    // For backspace
    else if (code == 8) {
        backspace();
    }
}

// Stops calculator buttons from getting focused
// From solution by ShortFuse in https://stackoverflow.com/questions/9152096/make-an-html-element-non-focusable
function preventFocus(event) {
    event.preventDefault();
    if (event.relatedTarget) {
      // Revert focus back to previous blurring element
      event.relatedTarget.focus();
    } else {
      // No previous focus target, blur instead
      event.currentTarget.blur();
    }
}

// Helper function which rounds a number to a specified decimal place
// From blog by Jack Moore in https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// Rounds the number on display to the 8th decimal place
function roundDecimal(num) {
    if (!isDecimal(num)) {
        return num;
    }
    let roundedDecimal = round(num, 5);
    return roundedDecimal;
}

// function debug() {
//     console.log(`firstNumberDisplayed: ${firstNumberDisplayed}`);
//     console.log(`currentNumberDisplayed: ${currentNumberDisplayed}`);
//     console.log(`operatorStored: ${operatorStored}`);
//     console.log(`resetDisplay: ${resetDisplay}`);
//     console.log(`numbersChosen: ${numbersChosen}`);
//     console.log(`isDecimal: ${isDecimal()}`);
// }

// Maximum number of numbers that can be on the display
const displayNumberLength = 15;

// Global variables
let firstNumberDisplayed = 0;
let currentNumberDisplayed = 0;
let operatorStored = null;
let resetDisplay = false;
let numbersChosen = 0; // If numbersChosen == 2, that means two inputs have been put in

// DOM variables
const calcDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const numberButtons = document.querySelectorAll('.number, .zero');
const operatorButtons = document.querySelectorAll('.operator');
const evaluatorButton = document.querySelector('.evaluator');
const clearButton = document.querySelector('.clear');
const unaryButton = document.querySelector('.unary');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');
const allButtons = document.querySelectorAll('button');

// Event listeners
allButtons.forEach(button => {
    button.addEventListener('focus', preventFocus);
});
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
backspaceButton.addEventListener('click', backspace);

window.addEventListener('keydown', keyboard);
