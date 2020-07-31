# Movie Seats Booking Application 

### HTML markup

- movie container 클래스  :  영화를 선택하는 select 태그를 감싸고 있다. 
  - id="movie" select 태그 내 option 태그들 

```javascript
<div class="movie-container">
        <label>Pick a movie: </label>
        <select id="movie">
            <option value="10">The farewell ($10)</option>
            <option value="12">Little Women ($12)</option>
            <option value="9">Carol ($9) </option>
            <option value="8">KungFu Panda ($8)</option>
        </select>
  </div>
```





- showcase 클래스 - ul 태그 :  좌석의 종류를 보여주는 세개의 li태그를 감싸고 있다. 각각 li 태그 내부에는 좌석의 모양과 설명이 포함되어 있다.  

```javascript
 <ul class="showcase">
        <li>
            <div class="seat"></div>
            <small>N/A</small>
        </li>
        <li>
            <div class="seat selected"></div>
            <small>Selected</small>
        </li>
        <li>
            <div class="seat occupied"></div>
            <small>Occupied</small>
        </li>
    </ul>
```



- Container 클래스 : 좌석 배치도를 보여준다. 
  - 내부에는 스크린화면을 보여주는 screen 클래스와 좌석을 보여주는 row 클래스가 있다.
  - 여러개의 row 클래스는 여러 seat클래스를 감싸고 있다.  

```javascript

    <div class="container"> <!--좌석배치도-->
        <div class="screen"></div> <!--스크린화면-->
        <div class="row"> <!--좌석-->
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
        </div>
        <div class="row">
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat occupied"></div>
            <div class="seat occupied"></div>
            <div class="seat"></div>
            <div class="seat"></div>
            <div class="seat"></div>
        </div>
</div>
```





### CSS markup

- 전체 box sizing을 border box로 정해줌으로써 테두리를 기준으로 크기를 정하도록 한다.  

```css
*{
    box-sizing: border-box;
}
```



- body의 display를 flex로 해주고, align-items와 justify content를 이용하여 가운데 정렬을 해준다. 

```css
body{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    height :100vh;
}
```





### JavaScript Logic

- Event Listeners
  - 좌석 선택 event 
  - 영화 선택 event

- Local Storage에 저장되는 내용 
  - 선택된 좌석들의 인덱스
  - 선택된 영화의 인덱스
  - 선택된 영화의 가격



- 공통 실행 함수
  - **populate UI 함수** : local Storage에 저장된 '선택된 좌석 인덱스'에 포함된 좌석에 selected 클래스를 추가해준다.
  - **updateSelectedCount 함수**: local Storage에 저장된 '선택된 영화의 가격'을 추출한 후, local Storage에 저장된 '선택된 좌석 인덱스'와의 연산을 이용해 count와 total을 변경해준다.

- 좌석선택 Event flow 
  - event Listener 를 좌석 전체를 감싸는 container에 부여함으로써 , click된 DOM이 seat 인지 확인한다. 또한 , occupied된 seat은 아닌지도 확인한다.
  - occupied되지 않은 seat을 선택했다면, 해당 seat 클래스에 'selected' 클래스를 toggle 해준다.
  - **updateSelectedSeats 선택된 좌석 업데이트 함수** :  전체 seat  중에서 selected 클래스가 포함된 좌석의 index를 mapping 하여 local Storage에 저장한다.
  - **updatedSelectedCount 선택된 좌석에 따른 가격 업데이트 함수**: local Storage에 저장된 배열의 길이를 이용해 total 가격을 업데이트 한다.
- 영화 선택 Event flow
  - 옵션이 'change' 된 경우에만 event Listener 가 동작하도록 한다.
  - **updatedSelectedCount  선택된 좌석에 따른 가격 업데이트 함수**: local Storage에 저장된 배열의 길이를 이용해 total 가격을 업데이트 한다.
  - **setMovieInfo**: 현재 선택된 영화의 index와 price를 추출하여 local Storage에 저장해놓는다.



```javascript
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('totals');

let movieTicketPrice= +movieSelect.value;
populateUI(); // selected Seats 정보 불러오기 
updatedSelectedCount(); // movie info updated 

// movie price와 index를 localStorage에 저장해주는 함수
function setMovieInfo(index, price){
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price);
}

// selected 된 seat의 개수로 count와 total을 Update 하는 하뭇 
function updatedSelectedCount(){ 
    movieTicketPrice = localStorage.getItem('selectedMoviePrice'); // ticket price 정하기 
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selecteSeatsCnt=selectedSeats.length;
    count.innerText=`${selecteSeatsCnt}`
    total.innerText=`${selecteSeatsCnt*movieTicketPrice}`
}

// seat선택시 event로, 선택된 seat의 index를 localStorage에 저장해준다. 
function updateSelectedSeats(){
    // 현재 selected 된 갯수와 select된 movie의 가격으로 count와 total을 update 해준다.
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // selected 된 seats을 모두 가져온다.
    // 해당 배열의 길이를 보면 현재 selected된 seats들의 갯수를 알 수 있다.

    const seatsIndex=[...selectedSeats].map(seat=>{
        return [...seats].indexOf(seat); // 전체 setas중에 현재 selected된 seat의 index만 뽑아오기.
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // localStorage에 저장 
}


// local Storage에 저장된 selected Seats의 정보를 기반으로 업데이트 해준다. 
function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    // 해당 index 가진 seat 모두 selected로 표시
    if(selectedSeats!==null && selectedSeats.length >0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>=0){ // SelectedSeats에 index가 들어있다면 
                seat.classList.add('selected');
            }
        })
    }
}

// container ==> 좌석선택 click 이벤트
container.addEventListener('click', (e)=>{
    // click 이 seat에 일어났을 때만 해야함 
    // occupied를 포함해서는 안됨.
    const classList = e.target.classList;
    if(classList.contains('seat') && !classList.contains('occupied')){
        e.target.classList.toggle('selected'); // select 로 toggle 
        updateSelectedSeats();
        updatedSelectedCount();
    }
    
})


// 무비 selection을 변경하면 반영해주는 event 
movieSelect.addEventListener('change', (e)=>{
    movieTicketPrice=e.target.value;
    updatedSelectedCount();
    setMovieInfo(e.target.selectedIndex, movieTicketPrice);
})

```

