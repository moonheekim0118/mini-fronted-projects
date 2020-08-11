const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addBtn= document.querySelector('.btn');
const list = document.getElementById('list');
const incomeEl =document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');
const balanceEl = document.getElementById('balance');
let transactions = [];

// Add transactions to DOM list

function save(){ // localstorage에 저장 해주는 함수 
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

function pull(){ // localstorage로부터 가져오는 함수 
    transactions = JSON.parse(localStorage.getItem('transactions')) || []; 
}


function addTransactionDOM(transaction){
    // get sign 
    const amount = transaction.amount;
    const text= transaction.text;
    const sign = amount < 0 ? '-' : '+'; 
    const item= document.createElement('li');
    // add Class based on value
    item.classList.add(sign === '-' ? 'minus':'plus');
    // Math.abs를 이용해서 마이너스 사인 없애줌 ! 
    // 아이디를 onclick 함수 파라미터로 넘겨주어서 해당 요소 삭제할 수 있게 해줌!!
    item.innerHTML=`${text}<span>${sign}${Math.abs(amount)}</span><button class="delete-btn" onclick="deleteItem(${transaction.id})">x</button>`;
    list.appendChild(item);
};

// Update the balance, income and expense
function updateValues(){
    const amounts = transactions.map(transaction=>+transaction.amount); // amount만 뽑아온다. 
    // 아래와 같이 해줘도 되고 각각 minus, plus요소들filter해서 reduce해줘도되고..
    const income= 
    amounts.filter(item=>item>0)
    .reduce((accumulator,value)=>accumulator+=value,0);

    const expense = 
    amounts.filter(item=>item<0)
    .reduce((accumulator,value)=>accumulator+=value,0);

    console.log(expense);
    incomeEl.innerText=`$${income.toFixed(2)}`;
    expenseEl.innerText=`$${Math.abs(expense).toFixed(2)}`;
    
    // balance
    const sum = income+expense;
    balanceEl.innerText=`$${sum.toFixed(2)}`;
}

// Add transaction
function addTransaction(e){
    e.preventDefault();
    const textValue = text.value;
    const amountValue = amount.value;
    if(textValue.trim() === '' || amountValue.trim() === ''){
        alert("Please Type text and amount!");
    }else{
        const transaction ={
            id:GenerateID(), // random id 생성 
            text:textValue,
            amount:amountValue
        };
        console.log(transaction.id);
        transactions.push(transaction); // array에 넣기 
        addTransactionDOM(transaction); // dom에 뿌리기 (history )
        updateValues(); // balance와 income, expense 업데이트하기
        save(); 
        text.value='';
        amount.value='';
    }
}

function deleteItem(id){
    console.log(id);
    transactions=transactions.filter(item=>item.id!==id)
    save(); // 변경된 transactions 로컬 스토리지에 반영 
    init(); // 변경된 transactions으로 dom 다시 구성 
}


//Generate Random ID
function GenerateID(){
    return Math.floor(Math.random() * 10000);
}

// Initapp

function init(){
    pull();
    list.innerHTML= '';  // list를 모두 비운다음에, transactions에 있는 item들을 다시 넣어주는 형식..
    transactions.forEach(item=>addTransactionDOM(item));
    updateValues();
}

init();

addBtn.addEventListener('click', addTransaction)