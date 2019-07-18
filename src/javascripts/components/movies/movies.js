/* eslint-disable no-use-before-define */
import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import movieData from '../../helpers/data/moviesData';
import smash from '../../helpers/smash';
import './movies.scss';

const deleteMovieEvent = (e) => {
  console.error(e.target);
  const movieId = e.target.id;
  movieData.deleteMovie(movieId)
    // eslint-disable-next-line max-len
    .then(() => moviesStringBuilder(firebase.auth().currentUser.uid))
    .catch(err => console.error('Could not delete', err));
};

const addEvents = () => {
  const deleteButtons = document.getElementsByClassName('delete-movie-btn');
  Array.from(deleteButtons).forEach((btn) => {
    btn.addEventListener('click', deleteMovieEvent);
  });
};

const combiningMoviesAndUserMovies = uid => movieData.getMovies()
  .then(movies => movieData.getUserMovies(uid)
    .then(movieStarsArray => smash.combineMoviesAndRatings(movies, movieStarsArray))
    .catch(err => console.error('no movies found', err)));

const moviesStringBuilder = (uid) => {
  combiningMoviesAndUserMovies(uid)
    .then((movies) => {
      console.error('movies: ', movies);
      let domString = '';
      movies.forEach((movie) => {
        domString += '<div class="col-lg-4 col-md-3 col-sm-6">';
        domString += '<div class="card text-center">';
        domString += `<div class="deleteBtn delete-movie-btn"><i id="${movie.id}" class="far fa-times-circle"></i></div>`;
        domString += `<img class="movie-image" src=${movie.imageUrl} />`;
        domString += `<div class="card-title">${movie.title}</div>`;
        domString += '<div class="card-body">';
        domString += `<h2>${movie.genre}</h2>`;
        domString += `<h2>${movie.movieRatingId}</h2>`;
        domString += `<a href="#" id="${movie.id}" class ="btn btn-info watchList">Add To Watchlist</a>`;
        domString += '<br />';
        for (let i = 1; i <= 5; i += 1) {
          let starSelected = '';
          if (i <= Number(movie.rating)) {
            // console.error(movie.rating);
            starSelected = 'add';
          } else {
            starSelected = 'dontAdd';
          }
          domString += `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21.78 20.79" class="star ${starSelected}">
<g> <path class="st0" d="M11.63,0.54l2.04,6.27c0.1,0.32,0.4,0.54,0.74,0.54H21c0.75,0,1.07,0.96,0.46,1.4l-5.34,3.88c-0.27,0.2-0.39,0.55-0.28,0.87l2.04,6.27c0.23,0.72-0.59,1.31-1.19,0.87l-5.34-3.88c-0.27-0.2-0.64-0.2-0.91,0L5.1,20.64c-0.61,0.44-1.43-0.15-1.19-0.87l2.04-6.27c0.1-0.32-0.01-0.67-0.28-0.87L0.32,8.75c-0.61-0.44-0.3-1.4,0.46-1.4h6.59c0.34,0,0.63-0.22,0.74-0.54l2.04-6.27C10.38-0.18,11.39-0.18,11.63,0.54z"/>
</g>
</svg>
`;
        // check if counter is <= to star rating in database, if true, add class;
        }
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('movies', domString);
      addEvents();
    }).catch(err => console.error('could not get movie', err));
};

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    image: document.getElementById('image').value,
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    rating: document.getElementById('rating').value,
    uid: firebase.auth().currentUser.uid,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('image').value = '';
      document.getElementById('title').value = '';
      document.getElementById('genre').value = '';
      document.getElementById('rating').value = '';
      movieData.getMovies(firebase.auth().currentUser.uid);
    })
    .catch(err => console.error('no new friend for you', err));
};

// eslint-disable-next-line max-len
export default {
  moviesStringBuilder, combiningMoviesAndUserMovies, createNewMovie, deleteMovieEvent,
};
