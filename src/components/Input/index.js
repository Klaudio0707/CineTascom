import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import MovieModal from "../MovieModal";
import { searchMovies } from "../../services/apiMovie";
const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalMovie, setModalMovie] = useState(null);
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
    const handleSelectMovie = (movie) => {
        setModalMovie(movie);
        setQuery("");
        setResults([]);
    };
    return (_jsxs("div", { className: styles.searchContainer, children: [_jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar filmes...", className: styles.searchInput }), query.length > 0 && (_jsx("ul", { className: styles.resultsList, children: loading ? (_jsx("li", { className: styles.resultsItem, children: "Carregando..." })) : (results.length === 0 ? (_jsx("li", { className: styles.resultsItem, children: "Nenhum filme encontrado." })) : (results.map((movie) => (_jsx("li", { className: styles.resultsItem, onMouseDown: () => handleSelectMovie(movie), children: movie.title }, movie.id))))) })), _jsx(MovieModal, { movie: modalMovie, isOpen: !!modalMovie, onClose: () => setModalMovie(null) })] }));
};
export default SearchInput;
