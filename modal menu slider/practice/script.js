
/* modal & nav*/ 
const modal = document.getElementById('modal');
const toggle_btn = document.getElementById('toggle');
const signUp_btn = document.getElementById('open');
const close_btn = document.getElementById('close');

/* nav 보여주는 토글 */ 
toggle_btn.addEventListener('click',()=>{ 
    document.body.classList.toggle('show-nav');
})


/* sign up 버튼 누르면 show modal*/ 
signUp_btn.addEventListener('click',()=>{
    modal.classList.add('show-modal');
})


/* close 버튼 누르면 hide modal*/
close_btn.addEventListener('click',()=>{
    modal.classList.remove('show-modal');
})

/* modal 밖부분 누르면 modal 창 닫기*/ 
window.addEventListener('click',(e)=>{
    console.log(e.target);
    e.target == modal ? modal.classList.remove('show-modal') : false;
})



/* signUp validation */
const name = document.getElementById('name');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirmPassword');
const form = document.querySelector('.modal-form');

/* 에러 메시지 띄워주기 */
function showError(input, errorMessage){
    const formControl= input.parentElement; // 부모 form control 가져오기 
    const small= formControl.querySelector('small'); // 해당 부모의 small에 에러 메시지 입력 
    formControl.classList.add('error'); // formcontrol에 error 클래스 추가 
    small.innerText=errorMessage;
}

/* 성공 표시 해주기 */
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

/* 입력 안한 것 에러처리 */ 
function requiredCheck(inputArr){
    inputArr.forEach((input)=>{
        if(input.value.trim()===''){
            showError(input, `${input.id} is required`);
        }else{
            showSuccess(input);
        }
    })
}
/* min, max 길이 에러처리 */ 
function LengthCheck(input_obj){
    input_obj.forEach((item)=>{
        const inputLen=item.input.value.length;
        if(inputLen < item.min){
            showError(item.input, `${item.input.id} must be at least ${item.min}`);
            console.log(item.input);
        }
        else if(inputLen > item.max){
            showError(item.input, `${item.input.id} must be less than ${input.max}`)
        }
        else{
            showSuccess(item.input);
        }
    })
}

/* password와 confirm password 체크 */ 
function matchCheck(password1, password2){
    if(password1.value !== password2.value){
        showError(password2, `passwords do not match`);
    }
    else{
        showSuccess(password2);
    }
}
/* form validation */ 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    requiredCheck([name,email,password,confirmPassword]);
    LengthCheck([
        {
            input: name,
            min: 3,
            max: 10
        },
        {
            input: password,
            min: 6,
            max: 12
        }
    ]);
    matchCheck(password, confirmPassword);
})
