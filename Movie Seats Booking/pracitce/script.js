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
    movieTicketPrice = localStorage.getItem('selectedMoviePrice'); // ticket price 정하기 
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
