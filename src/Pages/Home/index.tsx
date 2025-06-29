import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import { Navigation, Pagination } from 'swiper/modules';
import { getPopularMovies } from '../../services/apiMovie';
import MovieModal from '../../components/MovieModal';
import styles from "./styles.module.css";
import type { IMovie } from '../../@types/IMovie';


const Home: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

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

  const closeModal = () => setSelectedMovie(null);
  const openModal = (movie: IMovie) => {
    if (movie) setSelectedMovie(movie); //  dados do filme são passados.
    console.log(movie)
  };
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
           <SwiperSlide key={movie.id} className={styles.swiperSlide}>
            <div
              className={styles.swiper_slideContent}
              onClick={() => openModal(movie)}
            >
              <img
              className={styles.posterImage}
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
              />
              <h3 className={styles.titleOverlay}>{movie.title}</h3>
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

export default Home;
