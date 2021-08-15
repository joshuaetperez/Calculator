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

