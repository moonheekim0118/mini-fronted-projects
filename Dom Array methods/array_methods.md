# Array Methods

## forEach

```javascript
arr.forEach(callback(currentValue,[, index [, array]])[, thisArg])
```

- Array의 모든 요소를 돌면서 특정 연산을 할 수 있다.
- map 과 다르게 반환하지 않는다.



##### Parameters Requirement

1. currentValue  (required) : 주어진 array의 index번째 value
2. index (optional) : 현재 index 
3. array (optional): 전체 array 
4. thisArg (optional) : forEach 문 내에서 this가 가리키는 대상을 변경하고 싶을 때 사용 가능

##### example of usage

```javascript
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
```





## Map

```javascript
let new_array = arr.map(function callback( currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
```

- Array의 모든 요소를 돌면서 특정 연산을 할 수 있다.
- forEach와 다르게 연산을 적용한 element를 새로운 반환하여 새로운 값에 할당해준다.



##### Parameters Requirement

1. currentValue  (required) : 주어진 array의 index번째 value
2. index (optional) : 현재 index 
3. array (optional): 전체 array 
4. thisArg (optional) : forEach 문 내에서 this가 가리키는 대상을 변경하고 싶을 때 사용 가능



##### example of usage

- 주어진 object 배열에서, 모든 object의 프로퍼티 'money'를 두배로 변경하는 예시
- currentValue인 item이 object이기 때문에 전체를 복사한 후, money를 변경해준다. 

```javascript
function doubleMoney(){
    data = data.map(item=>{
        return {...item, money: item.money*2}
    })
    updateDOM();
}
```





## Filter

```javascript
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
```

- Array에서 callback 함수 조건에 맞는 element들만 filtering하여 반환해서 새로운 array에 저장해준다.



##### Parameters Requirement

1. currentValue  (required) : 주어진 array의 index번째 value
2. index (optional) : 현재 index 
3. array (optional): 전체 array 
4. thisArg (optional) : forEach 문 내에서 this가 가리키는 대상을 변경하고 싶을 때 사용 가능



##### example of usage

- item.money의 값이 1000000 이상인 사람들만 data array에 넣는 예시 

```javascript
function showMilli(){
    data = data.filter(item =>{
        return item.money >= 1000000;
    })
    updateDOM();
}
```





## Sort

```javascript
// String의 경우 
// 오름차순 
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

// 내림차순
months.sort().reverse();
```

- 자바스크립트의 sort는 제자리 정렬이다.
- String의 경우 sort와 reverse를 사용하여 오름차순, 내림차순을 구현 할 수 있다.
- 숫자를 sorting하려는 경우 콜백 함수를 이용해야 한다.



##### Number Sorting 

- number가 string으로 인식되므로 콜백함수를 이용해주어야 한다. 
- 인자로 넣은 a가 b보다 작다면 -1이 반환된다. 
- 인자로 넣은 a가 b보다 크다면 1이 반환된다.
- 인자로 넣은 a와 b가 같다면 0이 반환된다. 

```javascript
arr.sort((a,b)=>{return a-b}); // 오름차순
arr.sort((a,b)=>{return b-a}); // 내림차순 
```





## Reduce 

```javascript
arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
```

- 배열의 요소들에 대해 콜백 함수를 실행하며 최종적으로 단 1개의 결과값을 가진다.



##### Parameters Requirement

1. accumulator (required) : 직역하면 '누산기', 즉 이전 요소까지의 콜백함수 결과값을 가지고 있다. 

2. currentValue  (required) : 주어진 array의 index번째 value

3. index (optional) : 현재 index 

4. array (optional): 전체 array 

5. initialValue (optional) : accumulator의 최초 값 지정 - 지정하지않으면 자동으로 0 



##### example of usage

- 배열 요소의 전체 합 구하기

```javascript
const arr = [1,2,3,4];
const reducer = (accumulator, currentValue)=>accumulator+currentValue;

console.log(array1.reduce(reducer)); // 10
console.log(array1.reduce(reducer, 5)) // 15
```



- 배열에서 최댓값 구하기

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => {
  return accumulator > currentValue ? accumulator : currentValue;
}
```



- 배열 펼치기 (flatten array)

```javascript
const array1 = [1,[ 2,4], 3, 4];
const reducer = (accumulator, currentValue) => {
  return accumulator.concat(currentValue);
}

console.log(array1.reduce(reducer, [])); // 초기값을 [] 로 준다. 
```



- 배열을 object로 만들기 

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) =>{
  accumulator[currentValue]=currentValue;
  return accumulator;
}

console.log(array1.reduce(reducer,{})); // 초기값을 {}로 준다. 
// Object { 1: 1, 2: 2, 3: 3, 4: 4 }
```

