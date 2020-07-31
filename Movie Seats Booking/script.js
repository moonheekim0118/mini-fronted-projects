const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // node list에 넣는다
const count = document.getElementById('count');
const total = document.getElementById('totals');
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value;

populateUI();

//Save Selected Movie's index and price
function setMovieData(index, price){
    localStorage.setItem('selectedMovieIndex',index);
    localStorage.setItem('selectedMoviePrice',price);
}

// Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex =[...selectedSeats].map(seat=>
        [...seats].indexOf(seat) // 선택된 seat들을 localStorage에 넣어준다.
    ) //returns array
    
    localStorage.setItem('selectedSeats', JSON.stringify( seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    const selectedSeatsTotal = selectedSeatsCount * ticketPrice
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsTotal;
}

//get data from localStorage & populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length >0){
        seats.forEach((seat,index)=>{
            // index는 seats의 모든 index를 반환한다. 
            if(selectedSeats.indexOf(index)>=0){ // 해당 index가 저장되어 있다면 
                seat.classList.add('selected'); // 해당 index에 class를 selected로 
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex=selectedMovieIndex; // movieselect dom의 selectedIndex를 변경해준다.
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
}

// seat click event
container.addEventListener('click', (e)=>{
    const targetClassList =e.target.classList;
    if(targetClassList.contains('seat') && !targetClassList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// movie select event 
movieSelect.addEventListener('change', (e)=>{
    ticketPrice=e.target.value;
    setMovieData(e.target.selectedIndex, ticketPrice);
    updateSelectedCount();
})

// Inital Count and total set
updateSelectedCount();