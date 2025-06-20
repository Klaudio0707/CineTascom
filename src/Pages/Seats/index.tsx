import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext'; // Importa o hook personalizado

const Seats: React.FC = () => {
  const { user } = useAuth(); // Obtém as informações do usuário a partir do contexto
  const navigate = useNavigate();
  const movie = JSON.parse(localStorage.getItem('selectedMovie') || '{}');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const seatPrice = 25;

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handlePayment = () => {
    const total = selectedSeats.length * seatPrice;

    const paymentData = {
      user: {
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
      },
      movie: {
        title: movie.title,
        release_date: movie.release_date,
      },
      seats: {
        selected: selectedSeats,
        quantity: selectedSeats.length,
      },
      total,
      paid: false, // Status inicial do pagamento
    };

    // Salvar dados no localStorage para usar na página de pagamento
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Redirecionar para a página de pagamento
    navigate('/payment');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Escolha Suas Cadeiras</h1>
      <p>Filme: {movie.title}</p>
      <p>Data de Lançamento: {movie.release_date}</p>
      <p>Usuário: {user?.name}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '20px' }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleSeatClick(i + 1)}
            style={{
              padding: '10px',
              backgroundColor: selectedSeats.includes(i + 1) ? '#4caf50' : '#ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handlePayment}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={selectedSeats.length === 0}
      >
        Ir para Pagamento
      </button>
    </div>
  );
};

export default Seats;
