const search = document.getElementById('search'),
    submit  = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

async function searchMeal(e){
    e.preventDefault();
// fetch meals 
// loop through and output that into the dom 

// Clear Single meal
single_mealEl.innerHTML='';

const term = search.value;
console.log(term);
// validation for term
if(term.trim()){
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const data = await result.json();
    console.log(data);
    resultHeading.innerHTML=`<h2>Search result for '${term}' </h2>`;
    if(data.meals === null){
        resultHeading.innerHTML=`<p>There are no search result for '${term}' try again!</p>`
    }else{
        mealsEl.innerHTML= data.meals.map(meal => ` 
        <div class="meal"> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
        `).join('');
    }

} else{
    alert('Please enter a search term');
}
search.value='';
}

// random meal 
async function singleMeal(){
    mealsEl.innerHTML='';
    resultHeading.innerHTML='';
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await result.json();
    const meal = data.meals[0];
    addMealToDOM(meal);
}

// Fetch meal by Id
async function getMealById(mealId){
    console.log(mealId);
    const result =await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+mealId);
    const data = await result.json();
    const meal = data.meals[0];
    console.log(mealId);
    addMealToDOM(meal);
}

// ingredient 파싱하여 배열에 넣어주는 함수 
function getIngredient(meal){
    const ingreidents = [];
    for(let i = 1 ; i <= 20 ; i++){
        if(meal[`strIngredient${i}`]){
            ingreidents.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }
    return ingreidents;
}

// single meal 정보 dom에 넣어주는 함수 
function addMealToDOM(meal){
    const ingreidents = getIngredient(meal);
    single_mealEl.innerHTML=`
    <div class="random-meal">
    <h1> ${meal.strMeal} <h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="category">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
        ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}
        </div>
        <div class="instruction">
            <p>${meal.strInstructions}</p>
        </div>
        <h1>Ingredients</h1>
        <div class="ingredients"> 
           <ul>
                ${ingreidents.map(ing =>
                    `<li>${ing}</li>`
                ).join('')}
           <ul>
        </div>
    </div>
    `;
}


// Envet Listenrs 
submit.addEventListener('submit',searchMeal)

random.addEventListener('click',singleMeal);

mealsEl.addEventListener('click', e=>{
    const mealClass =e.composedPath();
    const mealInfo=mealClass[0];
    let mealId;
    if(mealInfo){
       mealId= mealInfo.getAttribute('data-mealid');
       getMealById(mealId);
    
    }else{
        console.log('..');
    }
})