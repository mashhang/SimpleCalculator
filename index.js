document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const result = document.getElementById("result");
  const clearButton = document.getElementById("clear");

  let currentInput = "";
  let currentOperator = null;
  let previousInput = null;

  function updateInput() {
    input.textContent = currentInput || "0";
  }

  function clear() {
    currentInput = "";
    currentOperator = null;
    previousInput = null;
    updateInput();
  }

  function handleNumberClick(number) {
    currentInput += number;
    updateInput();
  }

  function handleOperatorClick(operator) {
    if (currentOperator !== null) {
      calculate();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = "";
  }

  function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) {
      clear();
      return;
    }

    switch (currentOperator) {
      case "+":
        currentInput = (num1 + num2).toString();
        break;
      case "-":
        currentInput = (num1 - num2).toString();
        break;
      case "×":
        currentInput = (num1 * num2).toString();
        break;
      case "÷":
        if (num2 !== 0) {
          currentInput = (num1 / num2).toString();
        } else {
          clear();
          alert("Cannot divide by zero!");
        }
        break;
      default:
        clear();
        return;
    }

    currentOperator = null;
    previousInput = null;
    updateInput();
  }

  // Event listeners for number buttons
  document.querySelectorAll(".numbers div").forEach(function (button) {
    button.addEventListener("click", function () {
      handleNumberClick(button.textContent);
    });
  });

  // Event listeners for operator buttons
  document.querySelectorAll(".operators div").forEach(function (button) {
    button.addEventListener("click", function () {
      handleOperatorClick(button.textContent);
    });
  });

  // Event listener for equal button
  result.addEventListener("click", function () {
    calculate();
  });

  // Event listener for clear button
  clearButton.addEventListener("click", function () {
    clear();
  });
});
