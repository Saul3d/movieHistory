import firebase from 'firebase/app';
import 'firebase/auth';

import moviesData from '../../helpers/data/moviesData';

import movies from '../movies/movies';

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    imageUrl: document.getElementById('imageUrl').value,
    movieRatingId: document.getElementById('movieRatingId').value,
    uid: firebase.auth().currentUser.uid,
  };
  moviesData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('genre').value = '';
      document.getElementById('imageUrl').value = '';
      document.getElementById('title').value = '';
      document.getElementById('movieRatingId').value = '';
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('new-movie').classList.add('hide');
      movies.moviesStringBuilder(newMovie);
    })
    .catch(err => console.error('no new movie for you', err));
};

const newMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const showMovies = () => {
  document.getElementById('add-movies-button').addEventListener('click', newMovieButton);
};

export default { showMovies };
