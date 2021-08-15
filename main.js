// Takes in two numbers and returns the sum
function add(a, b) {
    return a + b;
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
        return console.log("Cannot divide by 0");
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
    numberDisplayed = this.id;
    const calcDisplay = document.querySelector('.display');
    calcDisplay.textContent = numberDisplayed;
}

// Global variables
let numberDisplayed = 0;

// DOM variables
const numberButtons = document.querySelectorAll('button[class=number]');

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', addToDisplay);
});
