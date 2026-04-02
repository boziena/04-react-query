import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export interface MoviesData {
  movies: Movie[];
  totalPages: number;
}

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesData> {
  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    },
  );
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
}
