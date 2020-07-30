// 필요한 돔
// form 자체
// form 내부의 input들

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show Error
function showError(input, ErrorMessage){
    // outline the input with red
    // 현재 에러난 input의 부모인 form control에 가서 error class 추가해야함
    const formControl= input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className='form-control error';
    small.innerText=ErrorMessage;
}

//show success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className='form-control success'
}

//check email is valid
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid');
    }
}

//check requried fields
function checkRequired (inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

// check length of input values
function checkLength(inputArr){
    inputArr.forEach(function(item){
        const inputLen = item.input.value.length;
       if(inputLen < item.min){
           showError(item.input, `${getFieldName(item.input)} must be at least ${item.min}characters`);
       }
       else if(inputLen > item.max){
        showError(item.input, `${getFieldName(item.input)} must be less than ${item.max} characters`);
       }
    })
}

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,'Passwords do not match');
    }
    else{
        showSuccess(input2);
    }
}

// get field name
function getFieldName(input){ // id의 첫글자를 대문자로 바꾼다.
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function submitHandler(e){
    e.preventDefault();
    checkRequired([username, email, password, password2])
    const InputObj =[
        {
            input:username,
            max:10,
            min:3
        },
        {
            input:password,
            max:15,
            min:6
        }
    ];
    checkLength(InputObj);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
}
// event listener
form.addEventListener('submit',submitHandler);