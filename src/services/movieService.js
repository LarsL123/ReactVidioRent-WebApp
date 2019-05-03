import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  return http.get(apiEndpoint);
}

export async function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  movie._id = movie._id.trim();

  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  delete movie._id;
  return http.post(apiEndpoint, movie);
}
