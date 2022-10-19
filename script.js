"use strict";
//Elements on the card
const cardnum = document.querySelector("#one");
const name0 = document.querySelector("#firstName");
const name1 = document.querySelector("#lastName");
const name2 = document.querySelector("#middleName");
const cvv = document.querySelector("#cvv");
const mm = document.querySelector("#mm");
const yy = document.querySelector("#yy");
//Inputs
const inputName = document.querySelector("#inputName");
const inputCardNum = document.querySelector("#inputCardNum");
const inputMm = document.querySelector("#inputMm");
const inputYy = document.querySelector("#inputYy");
const inputCvv = document.querySelector("#inputCvv");
//Alerts
const nameError = document.querySelector("#nameAlert");
const numsError = document.querySelector("#numAlert");
const dateError = document.querySelector("#dateAlert");
const dateBlank = document.querySelector("#dateAlertBlank");
const cvvBlank = document.querySelector("#cvvAlertBlank");
const cvvError = document.querySelector("#cvvAlert");
//Buttons
const confirmButton = document.querySelector("#confirm");
const continueButton = document.querySelector("#continue");
//Display sections
const inputSection = document.querySelector(".input-section");
const thankYouSection = document.querySelector(".thankyou-section");

confirmButton.addEventListener("click", confirmButtonAction);

continueButton.addEventListener("click", continueButtonAction);

function nameCheck() {
  const fullName = inputName.value;
  const splitName = fullName.split(" ");
  if (splitName.length < 2 || fullName.match(/\d/g)) {
    nameError.style.display = "block";
    inputName.style.border = "1px solid red";
  } else {
    nameError.style.display = "none";
    inputName.style.border = "1px solid hsl(270, 3%, 87%)";
    if (splitName[0]) {
      name0.textContent = splitName[0].toUpperCase();
    }
    if (splitName[1]) {
      name1.textContent = splitName[1].toUpperCase();
    }
    if (splitName[2]) {
      name2.textContent = splitName[2].toUpperCase();
    }
    return true;
  }
}

function cardNumberCheck() {
  const cardNum = inputCardNum.value;
  if (cardNum.match(/^ *[0-9][0-9 ]*$/g) && cardNum.length === 19) {
    numsError.style.display = "none";
    inputCardNum.style.border = "1px solid hsl(270, 3%, 87%)";
    cardnum.textContent = cardNum;
    return true;
  } else {
    numsError.style.display = "block";
    inputCardNum.style.border = "1px solid red";
  }
}

function expDateCheck() {
  const month = inputMm.value;
  const year = inputYy.value;
  if (month <= 12 && year.length === 2 && month.length === 2) {
    dateBlank.style.display = "none";
    dateError.style.display = "none";
    inputMm.style.border = "1px solid hsl(270, 3%, 87%)";
    inputYy.style.border = "1px solid hsl(270, 3%, 87%)";
    mm.textContent = month;
    yy.textContent = year;
    return true;
  }
  if (month === "") {
    dateError.style.display = "none";
    dateBlank.style.display = "block";
    inputMm.style.border = "1px solid red";
  }
  if (month !== "") {
    dateBlank.style.display = "none";
    inputMm.style.border = "1px solid hsl(270, 3%, 87%)";
  }
  if (year === "") {
    dateError.style.display = "none";
    dateBlank.style.display = "block";
    inputYy.style.border = "1px solid red";
  }
  if (year !== "") {
    dateBlank.style.display = "none";
    inputYy.style.border = "1px solid hsl(270, 3%, 87%)";
  }
  if (year !== "" && month === "") {
    dateBlank.style.display = "block";
  }

  if (month > 12) {
    inputMm.style.border = "1px solid red";
    dateBlank.style.display = "none";
    dateError.style.display = "block";
  }
  if (month.length > 2) {
    dateBlank.style.display = "none";
    dateError.style.display = "block";
    inputMm.style.border = "1px solid red";
  }
  if (year.length > 2) {
    dateBlank.style.display = "none";
    dateError.style.display = "block";
    inputYy.style.border = "1px solid red";
  }
}

function cvvCheck() {
  const cvvNum = inputCvv.value;
  if (cvvNum.length === 3) {
    cvvBlank.style.display = "none";
    cvvError.style.display = "none";
    inputCvv.style.border = "1px solid hsl(270, 3%, 87%)";
    cvv.textContent = cvvNum;
    return true;
  } else if (cvvNum === "") {
    cvvBlank.style.display = "block";
    cvvError.style.display = "none";
    inputCvv.style.border = "1px solid red";
  } else if (cvvNum.length < 3 || cvvNum.length > 3) {
    cvvBlank.style.display = "none";
    cvvError.style.display = "block";
    inputCvv.style.border = "1px solid red";
  } else {
    cvvBlank.style.display = "none";
    cvvError.style.display = "block";
  }
}

inputCardNum.addEventListener(
  "input",
  () =>
    (inputCardNum.value = formatNumber(inputCardNum.value.replaceAll(" ", "")))
);

const formatNumber = (number) =>
  number.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");

function confirmButtonAction() {
  nameCheck();
  cardNumberCheck();
  expDateCheck();
  cvvCheck();
  if (cardNumberCheck() && nameCheck() && expDateCheck() && cvvCheck()) {
    inputSection.style.display = "none";
    thankYouSection.style.display = "flex";
  }
}

function continueButtonAction() {
  resetDetails();
  inputSection.style.display = "flex";
  thankYouSection.style.display = "none";
}

function resetDetails() {
  inputName.value = "";
  inputCardNum.value = "";
  inputMm.value = "";
  inputYy.value = "";
  inputCvv.value = "";
  cardnum.textContent = "0000 0000 0000 0000";
  name0.textContent = "JANE";
  name1.textContent = "APPLESEED";
  name2.textContent = "";
  cvv.textContent = "000";
  mm.textContent = "00";
  yy.textContent = "00";
}
