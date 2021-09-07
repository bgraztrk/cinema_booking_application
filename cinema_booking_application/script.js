const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLS();
total();

container.addEventListener('click',function(e){
  
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
      
        e.target.classList.toggle('selected');
        total();
    }
});

select.addEventListener('change',function(e){

    total();
});

function total (){
    
    const selectSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });
    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });
    
    var selectSeatCount =selectSeats.length-1;
    count.innerText = selectSeatCount;
    amount.innerText = selectSeatCount * select.value;

    saveLS(selectedSeatIndexs);
}

function saveLS(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovie', select.selectedIndex);
}

function getFromLS(){
    
    const selectMovieIndex = localStorage.getItem('selectedMovie');
    
    if(selectMovieIndex != null){
        select.selectedIndex = selectMovieIndex;
    }

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
}