const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
}

export const BASE_URL = 'https://api.themoviedb.org/3'
export const POSTER_URL = "https://image.tmdb.org/t/p/w500/"