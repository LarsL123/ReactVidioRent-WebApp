import { apiUrl } from "../config.json";
import httpService from "./httpService.js";

let genres;

export async function getGenres() {
  if (!genres) {
    const { data } = await httpService.get(apiUrl + "/genres");
    genres = data;
  }

  return genres;
}
