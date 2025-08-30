const API_KEY = "82a978b03399a32ddb11dfddacfa028c";
const BASE_URL = "https://api.themoviedb.org/3";

export const imageBaseUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const searchMulti = async (query, page = 1) => {
  if (!query) return [];
  
  try {
    const res = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchTrendingTV = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchTvDetails = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching TV details:', error);
    return null;
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const fetchTopRatedMovies = async (page = 1) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};


