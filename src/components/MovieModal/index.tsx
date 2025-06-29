import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router";
import type { IMovieModalProps } from "../../@types/IMovie";
import styles from "./styles.module.css";
import { useReservation } from '../../context/ReservationContext';
import { TbRating18Plus } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
Modal.setAppElement('#root');

const MovieModal: React.FC<IMovieModalProps> = ({ movie, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { setSelectedMovie, setSelectedShowtime } = useReservation();

  useEffect(() => {
    if (!isOpen) {
      setSelectedMovie(null); // Limpa o filme selecionado quando o modal é fechado.
    }
  }, [isOpen, setSelectedMovie]);

  if (!movie) return null;

  const showtimes = movie.showtimes ?? ["14:00", "16:30", "19:00", "21:30"];

  const handleBuyTicket = (time: string) => {

    if (movie) {
      //armazenando dados com otime e movie
      setSelectedMovie(movie);
      setSelectedShowtime(time);

      const reservationData = {
        movie,
        selectedTime: time,
      };


      localStorage.setItem('reservation', JSON.stringify(reservationData));
      navigate('/seats', { state: reservationData });
    }
  };
  const handleWatchTrailer = () => {
    const trailerUrl = `https://youtube.com/results?search_query=${encodeURIComponent(
      movie.title + ' trailer'
    )}`;
    window.open(trailerUrl, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className={styles.modal_content}
      contentLabel="Detalhes do Filme"
      ariaHideApp={false}
    >
      <button className={styles.modal_close_button} onClick={onClose}>
        Fechar
      </button>
      <h2>{movie.title}</h2>
      <p>
        <strong>Data de lançamento:</strong> {movie.release_date || "Data não disponível"}
      </p>
      <p>
        <strong>Descrição:</strong> {movie.overview || "Descrição não disponível"}
      </p>
      <p className={styles.detailsMovie}>
        <span>
          <strong>Classificação indicativa:</strong> {movie.adult ? <TbRating18Plus size={25} title='+18' /> : <FcOk size={25} title='Livre' />}
        </span>
        <span>
          <strong>Popularidade: </strong>{movie.popularity}
        </span>
      </p>
      <h3>Horários Disponíveis:</h3>
      <div className={styles.container_description}>
        {showtimes.map((time) => (
          <button
            key={time}
            onClick={() => handleBuyTicket(time)}
            className={styles.movie_horsBtn}
          >
            {time}
          </button>
        ))}
        <button onClick={handleWatchTrailer} className={styles.trailer_button}>
          Assistir Trailer
        </button>
      </div>
    </Modal>
  );
};

export default MovieModal;
