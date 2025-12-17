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
    // Use Function constructor with strict validation as a safer alternative to eval
    // This limits the scope and prevents access to global variables
    const result = new Function(`"use strict"; return (${sanitized})`)();

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

// Add retro screen flash effect
function flashDisplay() {
  const display = document.getElementById('display');
  display.style.textShadow = '0 0 20px #ff3a3a, 0 0 40px #ff3a3a, 0 0 60px #ff3a3a';
  setTimeout(() => {
    display.style.textShadow = '0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #ff3a3a';
  }, 100);
}

// Add vintage screen wipe effect
function screenWipe() {
  const display = document.getElementById('display');
  display.style.animation = 'none';
  setTimeout(() => {
    display.style.animation = 'ledFlicker 3s infinite alternate';
  }, 10);
}

function appendToDisplay(inputChar) {
  const display = document.getElementById('display');
  if (display) {
    // Flash effect on button press
    flashDisplay();

    if (display.value === '0' && ArrayOfOperators.includes(inputChar)) {
      return;
    }

    if (ArrayOfOperators.includes(display.value.slice(-1)) && ArrayOfOperators.includes(inputChar)) {
      return;
    }

    if (inputChar === '=') {
      display.value = safeCalculate(display.value);
      screenWipe();
      return;
    }

    if (inputChar === 'C') {
      display.value = '0';
      screenWipe();
      return;
    }

    if (inputChar === '=') {
      display.value = safeCalculate(display.value);
      screenWipe();
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

// Add keyboard support for retro feel
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Number keys
    if (key >= '0' && key <= '9') {
      appendToDisplay(key);
      e.preventDefault();
    }

    // Operators
    if (key === '+' || key === '-' || key === '/' || key === '*') {
      appendToDisplay(key === '*' ? 'x' : key);
      e.preventDefault();
    }

    // Decimal point
    if (key === '.') {
      appendToDisplay(key);
      e.preventDefault();
    }

    // Enter or equals
    if (key === 'Enter' || key === '=') {
      appendToDisplay('=');
      e.preventDefault();
    }

    // Clear
    if (key === 'Escape' || key.toLowerCase() === 'c') {
      appendToDisplay('C');
      e.preventDefault();
    }

    // Backspace (delete last character)
    if (key === 'Backspace') {
      const display = document.getElementById('display');
      if (display && display.value.length > 1) {
        display.value = display.value.slice(0, -1);
      } else {
        display.value = '0';
      }
      flashDisplay();
      e.preventDefault();
    }
  });
});
