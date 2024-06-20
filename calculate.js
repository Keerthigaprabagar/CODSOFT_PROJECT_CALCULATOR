document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let currentInput = "";
    let operator = null;
    let firstOperand = null;

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const clearCalculator = () => {
        currentInput = "";
        operator = null;
        firstOperand = null;
        updateDisplay("0");
    };

    const appendNumber = (number) => {
        if (currentInput === "0") {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    };

    const chooseOperator = (op) => {
        if (currentInput === "") return;
        if (firstOperand !== null) {
            calculate();
        } else {
            firstOperand = parseFloat(currentInput);
        }
        operator = op;
        currentInput = "";
    };

    const calculate = () => {
        let result;
        const secondOperand = parseFloat(currentInput);
        if (operator === null || isNaN(firstOperand) || isNaN(secondOperand)) return;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        firstOperand = null;
        updateDisplay(currentInput);
    };

    document.querySelectorAll(".btn.number").forEach(button => {
        button.addEventListener("click", (e) => {
            appendNumber(e.target.textContent);
        });
    });

    document.getElementById("clear").addEventListener("click", clearCalculator);

    document.getElementById("add").addEventListener("click", () => chooseOperator('+'));
    document.getElementById("subtract").addEventListener("click", () => chooseOperator('-'));
    document.getElementById("multiply").addEventListener("click", () => chooseOperator('*'));
    document.getElementById("divide").addEventListener("click", () => chooseOperator('/'));

    document.getElementById("equals").addEventListener("click", calculate);
});
