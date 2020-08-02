

const aside = document.querySelector('aside');
const main = document.getElementById('main');
const add_User= document.getElementById('add-user');
const double_Moeny =document.getElementById('double');
const sort_ = document.getElementById('sort-by-rich');
const show_Milli=document.getElementById('show-millionaires');
const calc_ = document.getElementById('calculate-wealth');

let data = []; // put all of the people 
            // object - name and wealth!
getRandomUser();
getRandomUser();
getRandomUser();


// 모든 유저 돈 2배 
function doubleMoney(){
    data = data.map(item=>{
        // var obj=item;
        // obj.money=item.money*2;
        // return obj;
        return {...item, money: item.money*2}
    })
    updateDOM();
}

// 돈이 많은 순으로 정렬 
function sortByRich(){
    data.sort((a,b)=>b.money - a.money);
    updateDOM();
}

// 일정 기준 이상 person만 보여주기 
function showMilli(){
    data = data.filter(item =>{
        return item.money >= 1000000;
    })
    updateDOM();
}

// 모든 사람의 돈 sum 
function calc(){
    const reducer= (accumulator, currentValue)=>{
        console.log(accumulator);
        return accumulator+=currentValue.money;
    }
    const total = document.createElement('div');
    total.innerHTML=`<h3>Total Sealth: <strong>${formatMoney(data.reduce(reducer,0))}</strong></h3>`;
    main.appendChild(total);
}

// 랜덤 유저 받아오기 
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const result = data.results[0];
    const newUser={
        name: `${ result.name.first} ${result.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };
    addUser(newUser); // 유저 추가 메서드로 넘어감 
}

// 유저 추가하기 
function addUser(userdata){
    data.push(userdata);
    updateDOM();
}


// dom update 
// 아무것도 parameter로 pass되지 않으면 data를 받겠다.
function updateDOM(providedData = data){
    main.innerHTML=`<h2><strong>Person</strong> Wealth</h2>`;
    if(providedData.length >0 ){
        providedData.forEach(item=>{
            const newNode = document.createElement('div');
            newNode.className='person';
            newNode.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
            main.appendChild(newNode);
        })
    }
}

// random number를 money 형태로 바꾸어주기 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  // 버튼 이벤트 리스너 
  add_User.addEventListener('click', getRandomUser);
  double_Moeny.addEventListener('click', doubleMoney);
  sort_.addEventListener('click', sortByRich);
  show_Milli.addEventListener('click',showMilli);
  calc_.addEventListener('click',calc);