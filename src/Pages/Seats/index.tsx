import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { ReservationContext } from "../../context/ReservationContext";
import type { ISeat } from "../../@types/Seats";

const Seats: React.FC = () => {
  const { sessaoId } = useParams<{ sessaoId: string }>();
  const navigate = useNavigate();
  const { setReservation } = useContext(ReservationContext);

  const seats: ISeat[] = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    row: String.fromCharCode(65 + Math.floor(i / 12)), // Fileiras: A, B, C...
    number: (i % 12) + 1,
    isAvailable: Math.random() > 0.2,
  }));

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
        title: `Sessão ${sessaoId}`,
        session: "Horário da sessão",
      },
      seats: {
        selected: chosenSeats,
      },
      user: {
        name: "Usuário Exemplo",      // você pode pegar isso do contexto auth ou formulário
        email: "user@example.com",    // idem acima
        age: 30,                      // opcional
      },
      total: chosenSeats.length * 20, // ex: R$ 20 por assento
      paid: false,
    };
  
    // Atualiza o contexto
    setReservation(reservationData);
  
    // Salva no localStorage para o Payment.tsx conseguir ler
    localStorage.setItem("paymentData", JSON.stringify(reservationData));
  
    // Navega para a tela de pagamento
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
