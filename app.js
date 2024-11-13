// Fungsi display di HTML
function display() {
  const body = document.body;
  body.className = "font-bold bg-black text-white w-full p-0 m-0";
  const display = document.createElement("div");
  body.appendChild(display);
  display.className = "w-full";
  display.innerHTML = `
  <div class="p-5 max-w-lg mx-auto">
    <input id="displayResults" 
          class="text-white bg-transparent w-full text-right outline-none font-bold text-4xl p-6 border-b border-gray-500 mb-4" 
          type="text" 
          readonly />
    <div class="grid grid-cols-4 gap-4">
      <button onclick="clearDisplay()" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">C</button>
      <button onclick="appendValue('/')" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">÷</button>
      <button onclick="appendValue('-')" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">-</button>
      <button onclick="backspace()" 
              class="w-full h-20 hover:bg-neutral-900 flex items-center justify-center bg-[#3C3D37] rounded-md text-white text-2xl">⌫</button>

      <button onclick="appendValue(7)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">7</button>
      <button onclick="appendValue(8)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">8</button>
      <button onclick="appendValue(9)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">9</button>
      <button onclick="appendValue('*')" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">×</button>

      <button onclick="appendValue(4)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">4</button>
      <button onclick="appendValue(5)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">5</button>
      <button onclick="appendValue(6)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">6</button>
      <button onclick="appendValue('+')" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">+</button>

      <button onclick="appendValue(1)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">1</button>
      <button onclick="appendValue(2)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">2</button>
      <button onclick="appendValue(3)" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">3</button>
      <button onclick="appendValue('.')" 
              class="w-full h-20 hover:bg-neutral-900 bg-[#3C3D37] rounded-md text-white text-2xl">.</button>

      <button onclick="appendValue(0)" 
              class="w-full h-20 hover:bg-neutral-900 col-span-3 rounded-md bg-[#3C3D37] text-white text-2xl">0</button>
      <button onclick="calculate()" 
              class="w-full h-20 bg-cyan-500 hover:bg-cyan-900 rounded-md text-white text-2xl">=</button>
    </div>
  </div>

  `;
}
display();

let displayResults = document.getElementById("displayResults");

function appendValue(value) {
  displayResults.value += value;
}

function clearDisplay() {
  displayResults.value = "";
}

function calculate() {
  if (displayResults.value !== "") {
    displayResults.value = eval(displayResults.value);
  } else {
    displayResults.value = "Please Input number";
  }
}

function backspace() {
  displayResults.value = displayResults.value.slice(0, -1);
}
