import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router";
import styles from "./styles.module.css";
import { useReservation } from '../../context/ReservationContext';
Modal.setAppElement('#root');
const MovieModal = ({ movie, isOpen, onClose }) => {
    const navigate = useNavigate();
    const { setSelectedMovie, setSelectedShowtime } = useReservation();
    useEffect(() => {
        if (!isOpen) {
            setSelectedMovie(null); // Limpa o filme selecionado quando o modal é fechado.
        }
    }, [isOpen, setSelectedMovie]);
    if (!movie)
        return null;
    const showtimes = movie.showtimes ?? ["14:00", "16:30", "19:00", "21:30"];
    const handleBuyTicket = (time) => {
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
        const trailerUrl = `https://youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;
        window.open(trailerUrl, '_blank');
    };
    return (_jsxs(Modal, { isOpen: isOpen, onRequestClose: onClose, overlayClassName: "modal-overlay", className: styles.modal_content, contentLabel: "Detalhes do Filme", ariaHideApp: false, children: [_jsx("button", { className: styles.modal_close_button, onClick: onClose, children: "Fechar" }), _jsx("h2", { children: movie.title }), _jsxs("p", { children: [_jsx("strong", { children: "Data de lan\u00E7amento:" }), " ", movie.release_date || "Data não disponível"] }), _jsxs("p", { children: [_jsx("strong", { children: "Descri\u00E7\u00E3o:" }), " ", movie.overview || "Descrição não disponível"] }), _jsxs("p", { children: [_jsx("strong", { children: "Classifica\u00E7\u00E3o indicativa:" }), " ", movie.adult ? '18+' : 'Livre'] }), _jsx("h3", { children: "Hor\u00E1rios Dispon\u00EDveis:" }), _jsxs("div", { className: styles.container_description, children: [showtimes.map((time) => (_jsx("button", { onClick: () => handleBuyTicket(time), className: styles.movie_horsBtn, children: time }, time))), _jsx("button", { onClick: handleWatchTrailer, className: styles.trailer_button, children: "Assistir Trailer" })] })] }));
};
export default MovieModal;
