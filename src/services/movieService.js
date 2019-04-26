import * as genresAPI from "./genreService";
import httpService from "./httpService";
import config from "./config.json";

export async function getMovies() {
  const { data: movies } = await httpService.get(config.apiMoviesEndpoint);

  return movies;
}

export function deleteMovie(id) {
  /*console.log(id);
    let movieInDb = movies.find(m => m._id === id);
    console.log(movies.indexOf(movieInDb), movieInDb);
    movies.splice(movies.indexOf(movieInDb), 1);
    return movieInDb;*/
}
