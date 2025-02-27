const buttons = document.querySelectorAll("button");
const inputElement = document.querySelector(".calculator-section");

let num1 = "", num2 = "", operator = null, result = 0;

// Tugmalarni bosish hodisasi
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent.trim();

        if (!isNaN(buttonValue) || buttonValue === ".") {
            handleNumber(buttonValue);
        } else if (["+", "-", "×", "÷", "%", "-/+", "x²"].includes(buttonValue)) {
            handleOperator(buttonValue);
        } else if (buttonValue === "=") {
            calculateResult();
        } else if (buttonValue === "C") {
            clearCalculator();
        }
    });
});

// Raqam yoki "." bosilganda
function handleNumber(value) {
    if (value === ".") {
        if ((operator && num2.includes(".")) || (!operator && num1.includes("."))) {
            return;
        }
    }

    if (!operator) {
        num1 += value;
        inputElement.value = num1;
    } else {
        num2 += value;
        inputElement.value = num2;
    }
}

// Operator bosilganda
function handleOperator(value) {
    if (num1 !== "") {
        if (value === "×") {
            operator = "*"
        } else if (value === "÷") {
            operator = "/"
        } else if (value === "-/+") {
            if (!operator) {
                num1 = -num1
                inputElement.value = num1;
            } else if (num2) {
                num2 = -num2
                inputElement.value = num2;
            }
            return;
        } else if (value === "x²") {
            if (!operator) {
                num1 = num1 ^ 2;
                inputElement.value = num1;
            } else if (num2) {
                num2 = num2 ** 2;
                inputElement.value = num2;
            }
            return;
        } else {
            operator = value
        }
        inputElement.value = operator;
    }
}

// "=" bosilganda natijani hisoblash
function calculateResult() {
    if (num1 !== "" && num2 !== "" && operator) {
        result = operate(+num1, +num2, operator);
        inputElement.value = result;
        num1 = result.toString();
        num2 = "";
        operator = null;
    }
}

// Asosiy hisoblash funksiyasi
function operate(a, b, op) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        case "%": return a + (b / 100);

    }
}
// "C" bosilganda tozalash
function clearCalculator() {
    num1 = "";
    num2 = "";
    operator = null;
    result = 0;
    inputElement.value = "";
}
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".themeToggle");
    const themeIcon = themeToggle.querySelector("img"); // Icon elementi
    const calculator = document.querySelector(".calculator");

    //bosgan rasm yani iconcani va ranglarni almashtirish

    function toggleTema() {
        calculator.classList.toggle("dark-mode");

        if (document.getElementsByClassName("dark-mode").length) {

            themeIcon.src="img/bedtime_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
        } else {
            themeIcon.src = "img/clear_day_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
        }

    }

    themeToggle.addEventListener("click", toggleTema);
});

