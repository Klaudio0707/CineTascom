import axios from 'axios';
import type { IMovie } from '../@types/IMovie';

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
export const searchMovies = async (query: string): Promise<IMovie[]> => {
  // Se a busca estiver vazia.
  if (!query) {
    return [];
  }
  
  try {
   
    const response = await api.get('/movie/popular?language=pt-BR&page=1', {
      params: {
        language: 'pt-BR',
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    // Retornamos um array vazio em caso de erro para não quebrar a aplicação.
    return [];
  }
};