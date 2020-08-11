const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addBtn= document.querySelector('.btn');
const historyUl = document.getElementById('list');
const incomeEl =document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');
const balanceEl = document.getElementById('balance');
let store =[];

/** Problem of this code!
 * 달러 사인 문제 
 * 중복된 text와 amount의 요소가 있으면..둘이 같이 삭제됨 !!! 
 */


initalUl(); // localStorage에서 값 가져와서 화면에 뿌려주기

function save(amountEl, textEl){ // locaStroage에 새로운 요소 저장하기 
    store = JSON.parse(localStorage.getItem('expenseinfo'));
    if(store===null || store.length === 0){
        store = [{text:textEl, amount: amountEl}];
    }
    else{
        store.push({text:textEl, amount: amountEl});
    }
    localStorage.setItem('expenseinfo',JSON.stringify(store));
}

// balance 설정 
function setBalance(income, expense){
    const sum = income+expense;
    balanceEl.innerText=`$${sum}`;
}

// income and expense 설정 
function setIncomeAndExpense(){
    let incomeSum = 0;
    let expenseSum =0;
    if(store!==null && store.length > 0){
        store.forEach(item=>{
            const amount = +item.amount;
            if(amount < 0){
                expenseSum+=amount;
            } else{
                incomeSum+=amount;
            }
        })
    }
    incomeEl.innerText=`$${incomeSum}`;
    expenseEl.innerText=`$${expenseSum}`
    setBalance(incomeSum,expenseSum); // 구해진 incomeSum과 expenseSum으로 balance설정하기 
}

// History 창 설정 , localStorage에 있는 요소들을 history ul에 뿌려주기 
function setHistory(){
    if(store!==null && store.length >0){
        store.forEach(item=>addHistory(item.amount, item.text)); 
    }
}

function initalUl(){ // localStorage에서 불러오기
    store = JSON.parse(localStorage.getItem('expenseinfo'));
    setIncomeAndExpense(); // 내부에서 balance도 구해줌
    setHistory();
}

// history에 넣어주기 
function addHistory(amountEl, textEl){
    const li= document.createElement('li');
    if(amountEl.includes('-')) // minus 항목이라면 
    {
        li.className="minus";
    }else{ // plus 항목이라면 
        li.className="plus";
    }
    li.innerHTML=`${textEl}<span>$ ${amountEl}</span><button class="delete-btn" onclick="deleteItem(this)">x</button>
     `;
    historyUl.appendChild(li);
    setIncomeAndExpense();
}

function deleteItem(btn){ // 항목 삭제 
    const li = btn.parentNode;
    let amount = li.querySelector('span').innerText;
    const text = li.childNodes[0].data;
    historyUl.removeChild(li); // li아예 없애기 
    amount=amount.replace('$ ',''); // 달러사인 지워주기
    store=store.filter(item=>{ // 필터 
        return item.text!==text && item.amount!==amount;
    })
    localStorage.setItem('expenseinfo',JSON.stringify(store)); // localStroage에 다시 넣어주기 
    setIncomeAndExpense(); // income and expense , balance 재조정해주기 
}

addBtn.addEventListener('click', ()=>{
    const amountEl = amount.value;
    const textEl = text.value;
    if(amountEl.length === 0 && textEl.length===0){
        alert('Please Enter text and amount');
    }
    else if(amountEl.length ===0){
        alert('Please Enter amount');
    }
    else if(textEl.length===0){
        alert('Please Enter text');
    }
    else{
        save(amountEl, textEl);
        addHistory(amountEl,textEl);
    }
    amount.value='';
    text.value='';
})
