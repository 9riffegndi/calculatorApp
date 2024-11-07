// Inisialisasi variabel global
let currentInput = "0";
let previousInput = "";
let currentOperator = null;
let shouldResetScreen = false;

// Fungsi display di HTML
function display() {
  const body = document.body;
  body.className =
    "font-bold bg-black text-white w-full h-full p-0 m-0 flex justify-center items-center";
  const display = document.createElement("div");
  body.appendChild(display);
  display.className = "w-full";
  display.innerHTML = `
    <div class="inputNum w-full outline-none flex flex-col h-max justify-beetween gap-1 p-2">
      <input value="0" id="displayResults" class="text-white bg-transparent w-full text-end outline-none font-bold text-[50px] p-10" type="text" readonly />
      <div class="grid grid-cols-4 gap-1">
        <button onclick="clearAll()" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">C</button>
        <button onclick="handleOperator('÷')" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">÷</button>
        <button onclick="handleOperator('-')" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl" >-</button>
        <button onclick="handleBackspace()"class="hover:bg-neutral-900 flex items-center justify-center w-full h-20 bg-[#3C3D37] rounded-md text-white ">⌫</button>
        <button onclick="appendNumber(7)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">7</button>
        <button onclick="appendNumber(8)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">8</button>
        <button onclick="appendNumber(9)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">9</button>
        <button onclick="handleOperator('×')" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">×</button>
        <button onclick="appendNumber(4)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">4</button>
        <button onclick="appendNumber(5)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">5</button>
        <button onclick="appendNumber(6)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">6</button>
        <button onclick="handleOperator('+')" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">+</button>
        <button onclick="appendNumber(1)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">1</button>
        <button onclick="appendNumber(2)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">2</button>
        <button onclick="appendNumber(3)" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">3</button>
        <button onclick="appendDecimal()" class="hover:bg-neutral-900 w-full h-20 bg-[#3C3D37] rounded-md text-white text-2xl">.</button>
        <button onclick="appendNumber(0)" class="hover:bg-neutral-900 col-span-3 rounded-md w-full h-20 bg-[#3C3D37] text-white text-2xl">0</button>
        <button onclick="calculate()" class="w-full h-20 bg-cyan-500 hover:bg-cyan-900 rounded-md text-white text-2xl">=</button>
      </div>
    </div>
  `;

  // Add event listeners for keyboard input
  document.addEventListener("keydown", handleKeyboardInput);
}

// Tambahkan fungsi-fungsi ke window object
window.appendNumber = function (number) {
  if (shouldResetScreen) {
    currentInput = "";
    shouldResetScreen = false;
  }

  if (currentInput === "0" && number !== 0) {
    currentInput = number.toString();
  } else {
    // Batasi panjang input
    if (currentInput.length < 12) {
      currentInput += number.toString();
    }
  }
  updateDisplay();
};

window.appendDecimal = function () {
  if (shouldResetScreen) {
    currentInput = "0";
    shouldResetScreen = false;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
};

window.handleOperator = function (operator) {
  const current = parseFloat(currentInput);

  if (isNaN(current)) return;

  if (currentOperator !== null && !shouldResetScreen) {
    calculate();
  }

  previousInput = currentInput;
  currentOperator = operator;
  shouldResetScreen = true;
};

window.calculate = function () {
  if (currentOperator === null || shouldResetScreen) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Tidak bisa membagi dengan nol!");
        clearAll();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Batasi angka desimal dan panjang hasil
  result = parseFloat(result.toFixed(8));
  if (result.toString().length > 12) {
    result = result.toExponential(7);
  }

  currentInput = result.toString();
  currentOperator = null;
  shouldResetScreen = true;
  updateDisplay();
};

window.clearAll = function () {
  currentInput = "0";
  previousInput = "";
  currentOperator = null;
  shouldResetScreen = false;
  updateDisplay();
};

window.handleBackspace = function () {
  if (currentInput.length === 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
};

function updateDisplay() {
  const display = document.getElementById("displayResults");
  if (display) {
    // Format angka untuk tampilan
    let displayValue = currentInput;
    if (displayValue.length > 12) {
      displayValue = parseFloat(displayValue).toExponential(7);
    }
    display.value = displayValue;
  }
}

function handleKeyboardInput(e) {
  if (e.key >= "0" && e.key <= "9") {
    window.appendNumber(parseInt(e.key));
  } else if (e.key === ".") {
    window.appendDecimal();
  } else if (e.key === "+" || e.key === "-") {
    window.handleOperator(e.key);
  } else if (e.key === "*") {
    window.handleOperator("×");
  } else if (e.key === "/") {
    window.handleOperator("÷");
  } else if (e.key === "Enter" || e.key === "=") {
    window.calculate();
  } else if (e.key === "Backspace") {
    window.handleBackspace();
  } else if (e.key === "Escape") {
    window.clearAll();
  }
}

// Initialize display
display();
