const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

function showError(input, ErrorMessage){
    const formControl = input.parentElement;
    formControl.className ='form-control error'
    const small= formControl.querySelector('small');
    small.innerText = ErrorMessage;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className ='form-control success'
}

// 받은 input id의 첫글자만 upper case로 바꾸어준다. 
function getFiledName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

// is Empty or not check 
function checkRequirement(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===''){ // if it's empty
            // show ErrorMessage
            showError(input,`${getFiledName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    })
}

// check length of name and password
function checkLength(inputArr){
    inputArr.forEach(function(item){
        const itemInput = item.input;
        const itemMin = item.min;
        const itemMax = item.max;
        if(itemInput.value.length < itemMin){
            showError(itemInput, `${getFiledName(itemInput)} must be at least ${itemMin}`);
        }
        else if(itemInput.value.length > itemMax){
            showError(itemInput, `${getFiledName(itemInput)} must be less than ${itemMax}`);
        }
        else{
            showSuccess(itemInput);
        }
    })
}

// check password match
function checkPasswordsMatch(password1,password2){
    if(password1.value !== password2.value  || (password2.value ==='')){
        showError(password2, `${getFiledName(password2)} do not Match`)
    }else{
        showSuccess(password2);
    }
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

function submitHandler(e){
    e.preventDefault();
    // 모든 element의 requirement 체크
    checkRequirement([username,email,password,password2]);
    // User name과 password의 length 체크
    const objArr=[
        {
            input:username,
            min:3,
            max:10
        },
        {
            input:password,
            min:6,
            max:15
        },
    ]
    checkLength(objArr);
    // email proper 체크 
    checkEmail(email);
    // password - password2 match 체크 
    checkPasswordsMatch(password, password2);

}
form.addEventListener('submit',submitHandler);