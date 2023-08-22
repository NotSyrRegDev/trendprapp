
export const allEvents: string = `https://trend-pr.net/wp-json/trendpr/v1/events`;

export const newEvents: string = `https://trend-pr.net/wp-json/trendpr/v1/new-events`;



export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}`;
};
export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits`;
};
