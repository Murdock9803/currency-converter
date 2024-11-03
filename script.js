const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";


// Some variables for elements
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let rotatebtn = document.querySelector(".exchange");

// Call function convetedVal on screen loading
window.addEventListener("load", ()=>{
    convetedVal();
})


// For rotating the exchange button, and exchanging the selected coutnries and their flags respectively
let angle = 0;
rotatebtn.addEventListener("click", ()=>{
    angle += 360;
    rotatebtn.style.transform = `rotate(${angle}deg)`;

    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    updateTheFlag(fromCurrency);
    updateTheFlag(toCurrency);
    convetedVal();
})


// selecting the country code from a list of countries
for (let select of dropdowns){
    for (currencyCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currencyCode;
        newOpt.value = currencyCode;

        if (select.name === "from" && currencyCode === "USD"){
            newOpt.selected = "selected";
        }

        if (select.name === "to" && currencyCode === "INR"){
            newOpt.selected = "selected";
        }

        select.append(newOpt);
    }

    select.addEventListener("change", (eventt) => {
        updateTheFlag(eventt.target);
    })
}


// Updating the flags based on the selected country
let updateTheFlag = (elem)=>{
    let currCode = elem.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/shiny/64.png`;
    let flagImg = elem.parentElement.querySelector('img');

    flagImg.setAttribute("src", newSrc);
}

// for calling function convetedVal on clicking button "Get Exchange Rates"
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    convetedVal();
})


// function ConvetedVal, to convert the values based on the API response
let convetedVal = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }

    const newUrl = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`
    let response = await fetch(newUrl);
    let data = await response.json();
    
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}