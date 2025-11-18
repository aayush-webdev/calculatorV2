  let display = document.getElementById('display');
        let currentInput = '';
        let lastInput = '';
        let operators = ['+', '-', '*', '/'];

        function appendNumber(num) {
            currentInput += num;
            display.value = currentInput;
        }

        function appendOperator(op) {
            if (currentInput === '') return;
            if (operators.includes(currentInput.slice(-1))) {
                currentInput = currentInput.slice(0, -1) + op;
            } else {
                currentInput += op;
            }
            display.value = currentInput;
        }

        function appendDot() {
            let parts = currentInput.split(/[\+\-\*\/]/);
            let lastPart = parts[parts.length - 1];
            if (!lastPart.includes('.')) {
                currentInput += '.';
                display.value = currentInput;
            }
        }

        function calculateResult() {
            try {
                let result = eval(currentInput);
                display.value = result;
                currentInput = result.toString();
            } catch {
                display.value = 'Error';
                currentInput = '';
            }
        }

        function clearDisplay() {
            currentInput = '';
            display.value = '';
        }
        function backspace() {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        document.addEventListener("keydown", function (event) {
            let key = event.key;

            if (!isNaN(key)) {
                // number (0–9)
                appendNumber(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                // operators
                appendOperator(key);
            } else if (key === '.') {
                appendDot();
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault(); // prevent page refresh
                calculateResult();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key.toLowerCase() === 'c') {
                clearDisplay();
            }
        });