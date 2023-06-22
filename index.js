let moviesList = [];

const MAX_LENGTH_INPUT = 45;

const inputFromUserNode = document.querySelector('.js-input');
const btnAddMovieNode = document.querySelector('.js-button');
const listMoviesNode = document.querySelector('.js-movies-list');
const buttonsCloseNode = document.querySelector('.js-movies-list');
const counterInputLengthNode = document.querySelector('.js-counter-input');
const counterInputNode = document.querySelector('.js-input-length');

btnAddMovieNode.addEventListener('click', function(){
    const movieFromUser = getMovieFromUser();

    if (!movieFromUser.title) {
        return;
    }

    if ((movieFromUser.title.length > MAX_LENGTH_INPUT)) {
        return;
    }

    addMovie(movieFromUser)
    renderMovies();
    clearInput();
    clearCounter();
    localStorage.setItem('movieList', JSON.stringify(moviesList));
})

listMoviesNode.addEventListener('click', deleteMovie);
listMoviesNode.addEventListener('click', watchedMovie);
inputFromUserNode.addEventListener("keyup", addKeyEnter);
listMoviesNode.addEventListener('change', changingСheckbox)
inputFromUserNode.addEventListener('input', onInput);


function getMovieFromUser(){
    const movie = inputFromUserNode.value.trim();
    
    return {
        title: movie,
        checked: false,
        id: Date.now()
    };
}

function addMovie(movie){
    moviesList.push(movie)
}

function getMoviesList(){
    return moviesList
}

function renderMovies(){
    const moviesList = getMoviesList();

    let moviesListHTML = '';

    moviesList.forEach(function(movie, i) {
        moviesListHTML += `
        <li id="${movie.id}"
        class="${movie.checked ? 'movie input-checkbox_done' : 'movie'}" >
        <label >
        <input class="input-checkbox" 
        type="checkbox" 
        id='item_${i}'
        ${movie.checked ? 'checked' : ''} />
        <p class="title-movie" for='item_${i}'>${movie.title}</p>
        </label>
        <button class="close-btn" data-action="delete">
        <img
           class="close-btn-img"
           src="btn-close.png"
           alt="изобращение крестика"/>
        </button>
        </li>
        `
        listMoviesNode.innerHTML = moviesListHTML
    });
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

function watchedMovie(event){
    if (event.target.closest('.input-checkbox')){
        event.target.closest('.movie').classList.toggle('input-checkbox_done');
      }
}

function changingСheckbox(event) {
    let valueLabel = listMoviesNode.querySelector('[for='+ event.target.getAttribute('id') + ']').innerHTML;
    let moviesList = getMoviesList();

    moviesList.forEach(function(movie){
        if (movie.title === valueLabel)
        movie.checked = !movie.checked;
    })
}

function deleteMovie(event) {

if(event.target.dataset.action !== 'delete') return;

const parentNode = event.target.closest('.movie');
const id = Number(parentNode.id);

const index = moviesList.findIndex(function(movie){
    if(movie.id === id){
        return
    }
})
moviesList.splice(index, 1)
console.log(moviesList)
parentNode.remove()

}

function addKeyEnter(e) {
    if (e.code === 'Enter') {
        btnAddMovieNode.click();
    }
}
