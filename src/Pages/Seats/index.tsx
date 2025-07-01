import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useAuth } from "../../context/AuthContext";

import type { ISeat } from "../../@types/ISeats";
import type { IMovie } from "../../@types/IMovie";

const Seats: React.FC = () => {
  const location = useLocation();
  useParams<{ sessaoId: string }>();
  const { user } = useAuth();
  const reservationFromState = location.state as { movie: IMovie; selectedTime: string } | undefined;
  const navigate = useNavigate();
  const reservation = reservationFromState || JSON.parse(localStorage.getItem("reservation") || "null");

  // Verifica se os dados necessários estão disponíveis
  const movie = reservation?.movie;
  const selectedTime = reservation?.selectedTime;

  if (!movie || !selectedTime) {
    console.error("Erro: Dados do filme ou horário ausentes.", reservation);
    return <p>Erro: Dados do filme ou horário não encontrados. Retorne à página anterior.</p>;
  }

  const [seats] = useState<ISeat[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      row: String.fromCharCode(65 + Math.floor(i / 12)),
      number: (i % 12) + 1,
      isAvailable: Math.random() > 0.2,
    }))
  );

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const toggleSeat = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
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

  return (
    <div className={styles.wrapper}>
      <h1>Escolha seus assentos</h1>
      <h3>{movie.title}</h3>
      <div className={styles.screen}>TELA</div>

      <div className={styles.seatsGrid}>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const seatClass = seat.isAvailable
            ? isSelected
              ? styles.seatSelected
              : styles.seatAvailable
            : styles.seatOccupied;

          return (
            <button
              key={seat.id}
              disabled={!seat.isAvailable}
              className={`${styles.seat} ${seatClass}`}
              onClick={() => toggleSeat(seat.id)}
            >
              {seat.row}{seat.number}
            </button>
          );
        })}
      </div>

      <p>Assentos disponíveis: {remainingSeats}</p>

      <button
        className={styles.confirmBtn}
        onClick={handleConfirm}
        disabled={selectedSeats.length === 0}
      >
        Confirmar ({selectedSeats.length})
      </button>

      <button
        className={styles.clearBtn}
        onClick={handleClear}
        disabled={selectedSeats.length === 0}
      >
        Limpar Seleção
      </button>

      <div className={styles.legend}>
        <div><span className={styles.seatAvailable}></span> Disponível</div>
        <div><span className={styles.seatSelected}></span> Selecionado</div>
        <div><span className={styles.seatOccupied}></span> Ocupado</div>
      </div>
    </div>
  );
};

export default Seats;
