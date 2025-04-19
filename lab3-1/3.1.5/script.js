const resultField = document.getElementById('result');
const buttons = document.querySelectorAll('.button-grid button');

let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;

function resetCalculator() {
    resultField.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    shouldResetDisplay = false;
}

function appendNumber(number) {
    // если текущий результат 0 или нужно сбросить дисплей
    if (resultField.textContent === '0' || shouldResetDisplay) {
        resultField.textContent = number;
        shouldResetDisplay = false;
    } else {
        resultField.textContent += number;
    }
}

function chooseOperation(operation) {
    if (currentOperation !== null) compute();
    firstOperand = parseFloat(resultField.textContent);
    currentOperation = operation;
    shouldResetDisplay = true;
}

function compute() {
    if (currentOperation === null || shouldResetDisplay) return;
    secondOperand = parseFloat(resultField.textContent);
    let computation = 0;
    switch (currentOperation) {
        case '+':   computation = firstOperand + secondOperand;
            break;
        case '–':   computation = firstOperand - secondOperand;
            break;
        case '*':   computation = firstOperand * secondOperand;
            break;
        case '/':   computation = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    resultField.textContent = computation;
    currentOperation = null;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('num')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('res')) { 
            compute();
        } else if (button.classList.contains('opr')) {
            chooseOperation(button.textContent);
        } else if (button.classList.contains('clear')) {
            resetCalculator();
        }
    });
});