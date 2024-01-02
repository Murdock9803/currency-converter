const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    convetedVal();
})

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

let updateTheFlag = (elem)=>{
    let currCode = elem.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/shiny/64.png`;
    let flagImg = elem.parentElement.querySelector('img');

    flagImg.setAttribute("src", newSrc);
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    convetedVal();
})

let convetedVal = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }

    const newUrl = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`
    let response = await fetch(newUrl);
    let data = await response.json();
    
    let rate = data[toCurrency.value.toLowerCase()];
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}