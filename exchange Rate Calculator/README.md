# Exchange Rate Calculator

### Requirement
- third party API에 get 요청 (using fetch API) 을 통해 환율을 받아온다.
- 받아온 환율을 이용해 첫번째 기준 값에 따른 두번째 통화의 값을 보여준다.
- swap 버튼을 누르면 두 통화 (기준 통화와 두번째 통화)를 바꿀 수 있게 해준다.


fetch API를 통해 환율을 받아오는 함수 
```javascript
// Fetch Exchange Rates and update DOM 
function calculate() {
    const currency_one= currencyEl_one.value;
    const currency_two= currencyEl_two.value;
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res=> {return res.json()})
    .then(data =>{
        const rate = data.rates[currency_two]; // 두번째 통화의 환율 받아오기 
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value= (+amountEl_one.value*rate).toFixed(2); 
    })
}

```