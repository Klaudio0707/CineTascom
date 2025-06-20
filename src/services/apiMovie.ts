import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await api.get('/movie/popular?language=pt-BR&page=1');
    return response.data.results; // Array de filmes
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};
