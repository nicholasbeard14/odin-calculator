const add = (num1, num2) => {
    return num1 + num2
}

const subtract = (num1, num2) => {
    return num1 - num2
}

const multiply = (num1, num2) => {
    return num1 * num2
}

const divide = (num1, num2) => {
    if (num2 == 0) {
        return "Illegal Division by 0"
    } else {
        return num1 / num2
    }
        
}

const operate = (operator, num1, num2) => {
    if (operator == '+') {
        return Math.round(add(num1, num2)*10000)/10000
    } else if (operator == '-') {
        return Math.round(subtract(num1, num2)*10000)/10000
    } else if (operator == '*') {
        return Math.round(multiply(num1, num2)*10000)/10000
    } else if (operator == '/') {
        return Math.round(divide(num1, num2)*10000)/10000
    }
}

const updateDisplay = (event) => {
    const display = document.querySelector('#display');
    currentNum = display.textContent;

    if (event.target.innerText == '.') {
        decimal.removeEventListener('click', updateDisplay);
    }

    if (currentNum == '0' || operandSelected) {
        display.textContent = event.target.innerText;
        operandSelected = false;
    } else {
        display.textContent = currentNum + event.target.innerText;
    }
}

const clearDisplay = (event) => {
    const display = document.querySelector('#display');
    display.textContent = '0';

    data['operator'] = '';
    data['operand1'] = 0;
    data['operand2'] = 0;

    operators.forEach(operator => operator.removeEventListener('click', completeOperation));
    operators.forEach(operator => operator.addEventListener('click', beginOperation));
    equals.removeEventListener('click', completeOperation);
}

const beginOperation = (event) => {
    const operator = event.target.innerText;
    const operand = parseFloat(document.querySelector('#display').innerText)

    data['operator'] = operator;
    data['operand1'] = operand;

    operandSelected = true;

    // Add Functionality to Equals Sign
    let equals = document.querySelector('#equals');
    equals.addEventListener('click', completeOperation);

    operators.forEach(operator => operator.removeEventListener('click', beginOperation));
    operators.forEach(operator => operator.addEventListener('click', completeOperation));

    decimal.addEventListener('click', updateDisplay);
}

const completeOperation = (event) => {
    const operand2 = parseFloat(document.querySelector('#display').innerText);
    data['operand2'] = operand2;

    const solution =  operate(data.operator, data.operand1, data.operand2);
    const display = document.querySelector('#display');

    display.textContent = solution;
    data['operand1'] = solution;
    data['operand2'] = 0;

    if (event.target.innerText != '=') {
        data['operator'] = event.target.innerText
    } else {
        equals.removeEventListener('click', completeOperation);
        operators.forEach(operator => operator.addEventListener('click', beginOperation));
        operators.forEach(operator => operator.removeEventListener('click', completeOperation));
    }

    operandSelected = true;

    decimal.addEventListener('click', updateDisplay);
}



// Add Functionality to Update Display
const digits = document.querySelectorAll('#digits div button');
digits.forEach(digit => digit.addEventListener('click', updateDisplay));

const decimal = document.querySelector('#decimal');

// Add Functionality to Clear Button
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay);

// Add Functionality to Operands
let data = {};
let operandSelected = false;
const operators = document.querySelectorAll('#operators button');
operators.forEach(operator => operator.addEventListener('click', beginOperation));