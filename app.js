const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/usd.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateCurrRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0){
        amtVal = 1;
        amount.value= "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;  
};

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

window.addEventListener("load", (evt) => {
    updateCurrRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); 
    updateCurrRate(); 
});