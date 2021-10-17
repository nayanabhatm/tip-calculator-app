var tipPercentButtons = Object.values(
  document
    .getElementsByClassName("tips-percent")[0]
    .getElementsByTagName("input")
);
var tipPercent = 0;

document
  .getElementsByClassName("tips-percent")[0]
  .getElementsByTagName("input")
  [tipPercentButtons.length - 1].addEventListener("input", function (event) {
    tipPercent = event.target.value ?? 0;
    calculateCostPerPerson();
  });

tipPercentButtons.forEach((item) =>
  item.addEventListener("click", function () {
    deselectButtons();
    changeButtonColor(item);

    if (item.value === "Custom") {
      item.setAttribute("type", "number");
      item.setAttribute("style", "background-color:white");
    } else {
      tipPercent = parseInt(item.value.toString().replace("%", ""));
    }

    calculateCostPerPerson();
  })
);

document.getElementById("bill").addEventListener("input", function () {
  calculateCostPerPerson();
});

document.getElementById("people-count").addEventListener("input", function () {
  calculateCostPerPerson();
});

document
  .getElementsByClassName("calculated-amount")[0]
  .getElementsByTagName("button")[0]
  .addEventListener("click", function () {
    reset();
  });

function changeButtonColor(item) {
  item.classList.add("active");
}

function deselectButtons() {
  tipPercentButtons.forEach((btn) => btn.classList.remove("active"));
}

function calculateCostPerPerson() {
  let billAmount = document.getElementById("bill").value;
  let totalTip = (billAmount * tipPercent) / 100;

  let noOfPeople = document.getElementById("people-count").value;
  if (noOfPeople != 0) {
    setTipAmountPerPerson(totalTip / noOfPeople);

    let totalPerPerson =
      (parseFloat(billAmount) + parseFloat(totalTip)) / noOfPeople;
    setTotalAmountPerPerson(totalPerPerson);
  } else {
  }
}

function setTipAmountPerPerson(amount) {
  document
    .getElementsByClassName("tip-amount")[0]
    .getElementsByTagName("h2")[0].innerText = "$" + amount.toFixed(1);
}

function setTotalAmountPerPerson(amount) {
  document
    .getElementsByClassName("total-amount")[0]
    .getElementsByTagName("h2")[0].innerText = "$" + amount.toFixed(1);
}

function reset() {
  deselectButtons();
  setTipAmountPerPerson(0);
  setTotalAmountPerPerson(0);
  tipPercentButtons.map((item) =>
    item.getAttribute("name") == "custom"
      ? setAttributes(item, {
          type: "button",
          value: "Custom",
          style: "background-color:hsl(183, 100%, 15%)",
        })
      : null
  );
}

function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
