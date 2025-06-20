import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Importa os estilos do Swiper completo
import { Navigation, Pagination} from 'swiper/modules';
import { getPopularMovies } from '../../services/apiMovie';
import MovieModal from '../../components/MovieModal';
import styles from "./styles.module.css";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  adult: boolean;
}

const MoviesCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getPopularMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }
  const validMovies = movies.filter(
    (movie) => movie.poster_path && movie.title
  );
  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.movies_carousel_container}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {validMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className={styles.swiper_slide_content}
              onClick={() => openModal(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={closeModal}
      />
    </div>
  );
};

export default MoviesCarousel;
