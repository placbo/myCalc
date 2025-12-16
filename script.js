function safeCalculate(expression) {
  // Remove any characters that aren't numbers, operators, parentheses, or decimal points
  let sanitized = expression.replace(/[^0-9+\-*x/.() ]/g, '');
  console.log(sanitized);

  //replace all "x" with "*"
  sanitized = sanitized.replace(/x/g, '*');

  // Check if the expression is empty or invalid
  if (!sanitized || sanitized.trim() === '') {
    return 'Error';
  }
  console.log(sanitized);
  try {
    // Use Function constructor with strict validation as a safer alternative
    // This limits the scope and prevents access to global variables
    const result = Function(`"use strict"; return (${sanitized})`)();

    // Check if result is a valid number
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      return 'Error';
    }

    // Round to avoid floating point precision issues
    return Math.round(result * 100000000) / 100000000;
  } catch {
    return 'Error';
  }
}

const ArrayOfOperators = ['+', '-', 'x', '/'];

function appendToDisplay(inputChar) {
  const display = document.getElementById('display');
  if (display) {
    if (display.value === '0' && ArrayOfOperators.includes(inputChar)) {
      return;
    }

    if (inputChar === '=') {
      display.value = safeCalculate(display.value);
      return;
    }

    if (inputChar === 'C') {
      display.value = '0';
      return;
    }

    if (inputChar === '=') {
      display.value = safeCalculate(display.value);
      return;
    }

    if (
      display.value === '0' ||
      display.value === 'Error' ||
      display.value === 'Infinity' ||
      display.value === 'Infinity'
    ) {
      display.value = inputChar;
      return;
    }

    display.value += inputChar;
  }
}
