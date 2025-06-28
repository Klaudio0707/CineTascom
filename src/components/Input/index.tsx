import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { searchMovies } from "../../services/apiMovie";
import type { IMovie } from "../../@types/IMovie";
import MovieModal from "../MovieModal";

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalMovie, setModalMovie] = useState<IMovie | null>(null);

  //  Debouncing
  useEffect(() => {
    // Se a busca estiver vazia, simplesmente limpamos os resultados e paramos.
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    // Este temporizador garante que a API só seja chamada 300ms 
    const timerId = setTimeout(() => {
      searchMovies(query).then(movies => {
        setResults(movies);
        setLoading(false);
      });
    }, 300); // 300ms de espera

    //
    return () => {
      clearTimeout(timerId);
    };
  }, [query]); // é re-executado a cada mudança na digitação.

  const handleSelectMovie = (movie: IMovie) => {
    setModalMovie(movie);
    setQuery("");
    setResults([]);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filmes..."
        className={styles.searchInput}
      />


      {query.length > 0 && (
        <ul className={styles.resultsList}>
          {loading ? (
            <li className={styles.resultsItem}>Carregando...</li>
          ) : (

            results.length === 0 ? (
              <li className={styles.resultsItem}>Nenhum filme encontrado.</li>
            ) : (
              
              results.map((movie) => (
                <li
                  key={movie.id}
                  className={styles.resultsItem}
                  onMouseDown={() => handleSelectMovie(movie)}
                >
                  {movie.title}
                </li>
              ))
            )
          )}
        </ul>
      )}
      <MovieModal
        movie={modalMovie}
        isOpen={!!modalMovie}
        onClose={() => setModalMovie(null)}
      />
    </div>
  );
};

export default SearchInput;