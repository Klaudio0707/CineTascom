import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Importa os estilos do Swiper completo
import { Navigation, Pagination } from 'swiper/modules';
import { getPopularMovies } from '../../services/apiMovie';
import MovieModal from '../../components/MovieModal';
import styles from "./styles.module.css";
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getPopularMovies();
                setMovies(moviesData);
            }
            catch (error) {
                console.error('Erro ao carregar filmes:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);
    if (loading) {
        return _jsx("p", { children: "Carregando..." });
    }
    const validMovies = movies.filter((movie) => movie.poster_path && movie.title);
    const closeModal = () => setSelectedMovie(null);
    const openModal = (movie) => {
        if (movie)
            setSelectedMovie(movie); //  dados do filme são passados.
        console.log(movie);
    };
    return (_jsxs("div", { className: styles.movies_carousel_container, children: [_jsx(Swiper, { modules: [Navigation, Pagination], navigation: true, pagination: { clickable: true }, spaceBetween: 5, slidesPerView: 3, breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }, children: validMovies.map((movie) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: styles.swiper_slide_content, onClick: () => openModal(movie), children: [_jsx("img", { src: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`, alt: movie.title }), _jsx("h3", { children: movie.title })] }) }, movie.id))) }), _jsx(MovieModal, { movie: selectedMovie, isOpen: !!selectedMovie, onClose: closeModal })] }));
};
export default Home;
