const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup= document.getElementById('popup-container');
const notification=document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts= document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'inerface', 'wizard'];
let selelctedWord = words[Math.floor(Math.random()*words.length)];
const correctLetters=[];
const wrongLetters=[];

// show the hidden word
function displayWord(){
    wordEl.innerHTML=`
    ${selelctedWord
        .split('') // selectedWord의 단어 하나하나 살펴보기 위해서 
        .map(letter=>` 
           <span class="letter">
           ${correctLetters.includes(letter)? letter: ''}
            </span>
        `).join('') // map으로 반환된 결과가 array이므로 join 해주는 것
    }
    `;
    /*현재까지 맞는 word가 selecteWord와 맞는지 확인 */
    const innerWord = wordEl.innerText.replace(/\n/g,''); // innerText를 가져와서 확인해야하는데, 모든 letter가 한칸 띄어서 저장되어있으므로
    if(innerWord===selelctedWord)
    {
        winPopUp();
    }
    console.log(wordEl.innerText, innerWord);
}

// 이겼다는 알림창 
function winPopUp(){
    finalMessage.innerText='Congratulations! You Won!!';
    popup.classList.add('show-popup'); // correct하다면 popup 창 띄우기 
}

// 졌다는 알림창
function lostPopUp(){
    finalMessage.innerText='Unfortuenatley! You lost!!';
    popup.classList.add('show-popup'); // correct하다면 popup 창 띄우기 
}

// 이미 사용한 단어를 enter했다고 알려주는 알림창 
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{ // remove를 setTimeout으로 구현!
        notification.classList.remove('show');
    }, 2000)
}

// Wrong letter를 쓴경우에 화면에 wrong letter를 띄워준다.
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML=`
    ${wrongLetters.length >0 ? '<p>wrong</p>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
}


// SVG 띄우주기 
function hangman(){ // 오답 나올때마다 hang man
    const wrongNum=wrongLetters.length;
    // wrongNum이 6이면 끝
    if(wrongNum === 6){
        lostPopUp();
    }
    else{
        figureParts[wrongNum-1].classList.add('show');
    }
}

// game reset 
function init(){
    wrongLettersEl.innerHTML='';
    figureParts.forEach(part=>{
        part.classList.remove('show');
    })
    selelctedWord = words[Math.floor(Math.random()*words.length)];
    correctLetters.splice(0);
    wrongLetters.splice(0);
    displayWord(); 
}



// keydown eventListener
window.addEventListener("keydown", event=>{
    // a's keycode = 65 && Z is 90
    const keyCode =event.keyCode;
    if(keyCode >= 65 && keyCode <=90){ // only Alphabet!
        const letter=event.key;
        if(correctLetters.includes(letter) || wrongLetters.includes(letter)){
           showNotification();
            return; //이미 선택된 letter라면 notifcation 띄워주고 끝
        }
        if(selelctedWord.includes(letter))
        {
            correctLetters.push(letter);
            displayWord();
        }else{
            wrongLetters.push(letter);
            updateWrongLettersEl();
            hangman();
        }
}
})


playAgainBtn.addEventListener("click", ()=>{
    popup.classList.remove('show-popup');
    init();
    
})

displayWord();