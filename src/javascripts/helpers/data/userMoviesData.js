import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserMoviesInfo = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json`)
    .then((results) => {
      const userMovieInfoResults = results.data;
      const userMovieInfoArray = [];
      Object.keys(userMovieInfoResults).forEach((userMovie) => {
        userMovieInfoResults[userMovie].id = userMovie;
        userMovieInfoArray.push(userMovieInfoResults[userMovie]);
      });
      resolve(userMovieInfoArray);
    })
    .catch(err => reject(err));
});

export default { getUserMoviesInfo };
