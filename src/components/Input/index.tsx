import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import MovieModal from "../MovieModal";
import { searchMovies } from "../../services/apiMovie";
import type { IMovie } from "../../@types/IMovie";
import { useNavigate } from "react-router";

const SearchIcon = () => (
  <svg aria-hidden="true" className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalMovie, setModalMovie] = useState<IMovie | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
  //  Debouncing
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    const timerId = setTimeout(() => {
      searchMovies(query).then(movies => {
        setResults(movies);
        setLoading(false);
      });
    }, 300);
    return () => clearTimeout(timerId);
  }, [query]);

  // Lógica para fechar a lista de resultados ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMovie = (movie: IMovie) => {
    navigate('/');
    setModalMovie(movie);
    setQuery("");
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Buscar filmes..."
          className={styles.searchInput}
        />
      </div>

      {isFocused && query.length > 0 && (
        <ul className={styles.resultsList}>
          {loading ? (
            <li className={styles.resultsItemMessage}>Carregando...</li>
          ) : results.length === 0 ? (
            <li className={styles.resultsItemMessage}>Nenhum filme encontrado.</li>
          ) : (
            results.map((movie) => (
              <li
                key={movie.id}
                className={styles.resultsItem}
                onMouseDown={() => handleSelectMovie(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.resultImage}
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/45x68/2E2E2E/9C9C9C?text=?')}
                />
                <span>{movie.title}</span>
              </li>
            ))
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