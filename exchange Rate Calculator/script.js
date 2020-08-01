const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap'); 

// Fetch Exchange Rates and update DOM 
function calculate() {
    const currency_one= currencyEl_one.value;
    const currency_two= currencyEl_two.value;
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res=> {return res.json()})
    .then(data =>{
        const rate = data.rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value= (+amountEl_one.value*rate).toFixed(2);
    })
}

// swap currency one and two
function swapping(){
    let temp = currencyEl_one.value;
    currencyEl_one.value=currencyEl_two.value;
    currencyEl_two.value=temp;
    calculate();
}

//Event Listeners
currencyEl_one.addEventListener('change', calculate); // 기준 currency가 바뀌면 
amountEl_one.addEventListener('input', calculate); // 기준 값이 바뀌면 
currencyEl_two.addEventListener('change', calculate); // 두번째 currency가 바뀌면 
amountEl_two.addEventListener('input', calculate); // 두번째 기준 값이 바뀌면 
swap.addEventListener('click',swapping); // swap을 누르면 두 currency를 교환 


