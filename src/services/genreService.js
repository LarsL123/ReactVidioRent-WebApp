import config from "./config.json";
import httpService from "./httpService.js";

export async function getGenres() {
  const { data: genres } = await httpService.get(config.apiGenresEndpoint);

  return genres;
}
