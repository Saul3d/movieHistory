import firebase from 'firebase/app';
import 'firebase/auth';

import movies from '../../components/movies/movies';
import addNewMovie from '../../components/addNewMovie/addNewMovie';

const authNavbar = document.getElementById('navbar-button-auth');
const movieNavbar = document.getElementById('navbar-button-movies');
const logoutNavbar = document.getElementById('navbar-button-logout');
const authDiv = document.getElementById('auth');
const moviesDiv = document.getElementById('movies');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
      movieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      movies.moviesStringBuilder(user.uid);
      addNewMovie.showMovies();
      movies.combiningMoviesAndUserMovies(user.uid);
    } else {
      authDiv.classList.remove('hide');
      moviesDiv.classList.add('hide');
      movieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
