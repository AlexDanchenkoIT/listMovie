const MAX_LENGTH_INPUT = 45;

const inputFromUserNode = document.querySelector('.js-input');
const btnAddMovieNode = document.querySelector('.js-button');
const listMoviesNode = document.querySelector('.js-movies-list');
const buttonsCloseNode = document.querySelector('.js-movies-list');
const counterInputLengthNode = document.querySelector('.js-counter-input');
const counterInputNode = document.querySelector('.js-input-length');

btnAddMovieNode.addEventListener('click', function(){

    const movieFromUser = getMovieFromUser();

    if (!movieFromUser) {
        return;
    }

    if ((movieFromUser.length > MAX_LENGTH_INPUT)) {
        return;
    }

    renderMovies();
    clearInput();
    clearCounter();
})

listMoviesNode.addEventListener('click', function(e) {
  if (e.target.closest('.close-btn')){
      e.target.closest('.movie').remove();
    }
});

listMoviesNode.addEventListener('click', function(event){
    if (event.target.closest('.input-checkbox')){
        event.target.closest('.movie').classList.toggle('input-checkbox_done');
      }
});

inputFromUserNode.addEventListener("keyup", function(e) {
    if (e.code === 'Enter') {
        btnAddMovieNode.click();
    }
});

inputFromUserNode.addEventListener('input', onInput);


function getMovieFromUser(){
    const getMovie = inputFromUserNode.value;
    const newMovie = getMovie.trim();
    return newMovie;
}

function createMovieCard(movie) {
    const movieCard = document.createElement('li');
    movieCard.classList.add('movie');

    movieCard.innerHTML = `
        <label>
        <input class="input-checkbox" type="checkbox" data-action="done" />
        <p class="title-movie">${movie}</p>
        </label>
        <button class="close-btn" data-action="delete">
        <img
           class="close-btn-img"
           src="btn-close.png"
           alt="изобращение крестика"/>
       </button>
       `
    return movieCard;
}

function renderMovies(){
    const movie = getMovieFromUser();
    const movieCard = createMovieCard(movie);
    listMoviesNode.prepend(movieCard);
}

function clearInput(){
    inputFromUserNode.value = '';
}

function clearCounter (){
    counterInputLengthNode.innerText = 0; 
}

function onInput(evt){
    let length = evt.target.value.length;
    counterInputLengthNode.innerText = length;
    
    if (length > MAX_LENGTH_INPUT) {
        counterInputNode.classList.add('limit-exhausted');
    }   else {
        counterInputNode.classList.remove('limit-exhausted');
    }
}
