document.addEventListener('DOMContentLoaded', () => {
    const calculatorDisplay = document.getElementById('calculatorDisplay');
    const calculatorButtons = document.querySelector('.calculator-buttons');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetDisplay = false;

    // Function to update the display
    const updateDisplay = () => {
        calculatorDisplay.textContent = currentInput;
        console.log(`Display updated: ${currentInput}`);
    };

    // Function to clear all inputs
    const clear = () => {
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
        console.log('Calculator cleared.');
    };

    // Function to delete the last character
    const deleteLast = () => {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
        console.log('Last character deleted.');
    };

    // Function to append a number to the current input
    const appendNumber = (number) => {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (number === '.' && currentInput.includes('.')) {
            return; // Prevent multiple decimal points
        } else {
            currentInput += number;
        }
        updateDisplay();
        console.log(`Number appended: ${number}`);
    };

    // Function to choose an operator
    const chooseOperator = (nextOperator) => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operator = nextOperator;
        previousInput = currentInput;
        shouldResetDisplay = true;
        console.log(`Operator chosen: ${operator}`);
    };

    // Function to perform the calculation
    const compute = () => {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    console.error('Division by zero attempt.');
                    clear();
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        currentInput = computation.toString();
        operator = null;
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay();
        console.log(`Computation performed. Result: ${computation}`);
    };

    // Event listener for all calculator buttons
    calculatorButtons.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.matches('button')) return;

        if (target.classList.contains('number')) {
            appendNumber(target.textContent);
        } else if (target.classList.contains('operator')) {
            chooseOperator(target.textContent);
        } else if (target.classList.contains('equals')) {
            compute();
        } else if (target.classList.contains('clear')) {
            clear();
            alert('cleared');
        } else if (target.classList.contains('delete')) {
            deleteLast();
        }
    });

    // Initialize display
    updateDisplay();
    console.log('Calculator script loaded and initialized.');
});