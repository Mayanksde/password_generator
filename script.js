const inputSlider = document.querySelector(".slider");
const lengthDisplay = document.querySelector(".lengthInput");
const passwordDisplay = document.querySelector(".displayInput");
const copyMsg = document.querySelector(".copyBtn");
const upperCase = document.querySelector("#forUppercase");
const lowerCase = document.querySelector("#forLowercase");
const numbers = document.querySelector("#forNumbers");
const symbols = document.querySelector("#forSymbols");
const strengthIndicators = document.querySelector(".strengthIndicator");
const generatePassword = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input [type= checkbox]");

let passwordLength = 10;
const symbolString = [
  "@",
  "$",
  "%",
  "&",
  "=",
  "*",
  "[",
  "]",
  "{",
  "#",
  "}",
  "<",
  ">",
  "?",
];
let checkCount = 0;
let password = "";

handleSlider();

// function for handle the slider
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerHTML = passwordLength;
}
// setting color in indicator to see the strength
function setIndicator(color) {
  strengthIndicators.style.backgroundcolor = color;
}
function getRandonInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
  return getRandonInteger(0, 9);
}
function generateRandomUpperCase() {
  return String.fromCharCode(getRandonInteger(65, 91));
}
function generateRandomLowerCase() {
  return String.fromCharCode(getRandonInteger(97, 123));
}
function generateRandomSymbol() {
  const a = getRandonInteger(0, symbolString.length);
  return symbolString[a];
}
function calcStrength() {
  if (password.length < 8) {
    strengthIndicators.setAttribute("style", "background-color: red");
  }
  if (password.length >= 8 && password.length < 12) {
    strengthIndicators.setAttribute("style", "background-color: yellow");
  }
  if (password.length >= 12) {
    strengthIndicators.setAttribute("style", "background-color: #03C04A");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerHTML = "copied";
  } catch (e) {
    copyMsg.innerHTML = "failed";
  }
  // making copy div visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

// creating function for shuffling password elements

function shufflePassword(array) {
  // Fisher yates method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

// apply the event listeners when slider moves the number will change
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

// apply the event listeners when copy button clicked then content will copied
copyMsg.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});

// function for handle checkbox changes
function handleCheckBoxChange() {
  let checkCount = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
    // some special condition
    if (passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
    }
  });
}

function resetCopied() {
  copyMsg.innerHTML = "copy";
}

// apply the eventlistener to check how much checkboxes are checked
allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange());
});

generatePassword.addEventListener("click", () => {
  if ((checkCount = 0)) {
    return;
  }
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  password = "";
  let funcArr = [];
  if (upperCase.checked) {
    funcArr.push(generateRandomUpperCase);
  }
  if (lowerCase.checked) {
    funcArr.push(generateRandomLowerCase);
  }
  if (numbers.checked) {
    funcArr.push(generateRandomNumber);
  }
  if (symbols.checked) {
    funcArr.push(generateRandomSymbol);
  }

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randomIndex = getRandonInteger(0, funcArr.length);
    password += funcArr[randomIndex]();
  }
  password = shufflePassword(Array.from(password));

  // showing in UI
  passwordDisplay.value = password;

  //calculating strength
  calcStrength();
  resetCopied();
});

function scaleButton() {
  var button = document.querySelector('.generateButton');
  button.style.width = "21rem";
  button.style.fontSize = "1.2rem";
  button.style.transition = "0.4s";

  setTimeout(function() {
    button.style.width = "";
    button.style.fontSize = "";
   
  }, 200); 
}
function scaleCopyButton() {
  var button = document.querySelector('.copyBtn');
  button.style.width = "6.3rem";
  button.style.transition = "0.5s";

  setTimeout(function() {
    button.style.width = "";
  }, 250); 
}
