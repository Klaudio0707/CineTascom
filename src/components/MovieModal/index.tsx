import React from 'react';
import Modal from 'react-modal';
import styles from "./styles.module.css";
import { useNavigate } from "react-router";

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  adult: boolean;
}

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!movie) return null;
  const handleBuyTicket = () => {
    navigate('/seats', { state: { movie } });
  };
  const handleWatchTrailer = () => {
    const trailerUrl = `https://youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;
    window.open(trailerUrl, '_blank');
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Detalhes do Filme"
    >
      <button className={styles.modal_close_button} onClick={onClose}>
        Fechar
      </button>
      <h2>{movie.title}</h2>
      <p>
        <strong>Data de lançamento:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Descrição:</strong> {movie.overview}
      </p>
      <p>
        <strong>Classificação indicativa:</strong> {movie.adult ? '18+' : 'Livre'}
      </p>
      <div className={styles.modal_actions}>
        <button className={styles.buy_button} onClick={handleBuyTicket}>Comprar Ingresso</button>
        <button className={styles.trailer_button} onClick={handleWatchTrailer}>Assistir Trailer</button>
      </div>
    </Modal>
  );
};

export default MovieModal;
