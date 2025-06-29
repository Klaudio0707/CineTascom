import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useAuth } from "../../context/AuthContext";
const Seats = () => {
    const location = useLocation();
    useParams();
    const { user } = useAuth();
    const reservationFromState = location.state;
    const navigate = useNavigate();
    const reservation = reservationFromState || JSON.parse(localStorage.getItem("reservation") || "null");
    // Verifica se os dados necessários estão disponíveis
    const movie = reservation?.movie;
    const selectedTime = reservation?.selectedTime;
    if (!movie || !selectedTime) {
        console.error("Erro: Dados do filme ou horário ausentes.", reservation);
        return _jsx("p", { children: "Erro: Dados do filme ou hor\u00E1rio n\u00E3o encontrados. Retorne \u00E0 p\u00E1gina anterior." });
    }
    const [seats] = useState(() => Array.from({ length: 60 }, (_, i) => ({
        id: i,
        row: String.fromCharCode(65 + Math.floor(i / 12)),
        number: (i % 12) + 1,
        isAvailable: Math.random() > 0.2,
    })));
    const [selectedSeats, setSelectedSeats] = useState([]);
    const toggleSeat = (id) => {
        setSelectedSeats((prev) => prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]);
    };
    const handleConfirm = () => {
        const chosenSeats = seats
            .filter((s) => selectedSeats.includes(s.id))
            .map((s) => `${s.row}${s.number}`);
        const reservationData = {
            movie: {
                title: movie.title,
                session: `Sessão: ${selectedTime}`,
            },
            seats: {
                selected: chosenSeats,
            },
            user: {
                name: user?.name || "Usuário Exemplo",
            },
            total: chosenSeats.length * 20,
            paid: false,
        };
        // Salva no localStorage para o Payment  ler
        localStorage.setItem("paymentData", JSON.stringify(reservationData));
        navigate("/payment");
    };
    const handleClear = () => {
        setSelectedSeats([]);
    };
    const availableSeats = seats.filter((s) => s.isAvailable).length;
    const remainingSeats = availableSeats - selectedSeats.length;
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("h1", { children: "Escolha seus assentos" }), _jsx("h3", { children: movie.title }), _jsx("div", { className: styles.screen, children: "TELA" }), _jsx("div", { className: styles.seatsGrid, children: seats.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const seatClass = seat.isAvailable
                        ? isSelected
                            ? styles.seatSelected
                            : styles.seatAvailable
                        : styles.seatOccupied;
                    return (_jsxs("button", { disabled: !seat.isAvailable, className: `${styles.seat} ${seatClass}`, onClick: () => toggleSeat(seat.id), children: [seat.row, seat.number] }, seat.id));
                }) }), _jsxs("p", { children: ["Assentos dispon\u00EDveis: ", remainingSeats] }), _jsxs("button", { className: styles.confirmBtn, onClick: handleConfirm, disabled: selectedSeats.length === 0, children: ["Confirmar (", selectedSeats.length, ")"] }), _jsx("button", { className: styles.clearBtn, onClick: handleClear, disabled: selectedSeats.length === 0, children: "Limpar Sele\u00E7\u00E3o" }), _jsxs("div", { className: styles.legend, children: [_jsxs("div", { children: [_jsx("span", { className: styles.seatAvailable }), " Dispon\u00EDvel"] }), _jsxs("div", { children: [_jsx("span", { className: styles.seatSelected }), " Selecionado"] }), _jsxs("div", { children: [_jsx("span", { className: styles.seatOccupied }), " Ocupado"] })] })] }));
};
export default Seats;
