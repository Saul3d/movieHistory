const combineMoviesAndRatings = (movies, usermovies) => movies.map((movie) => {
  const m = movie;
  const ums = usermovies.find(um => um.movieId === m.id);
  if (ums) {
    m.rating = ums.rating;
    m.isWatched = ums.isWatched;
  }
  // console.error(m);
  return m;
});

export default { combineMoviesAndRatings };
