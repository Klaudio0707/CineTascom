import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    console.log("Salvando paymentData:");
    const data = JSON.parse(localStorage.getItem('paymentData') || '{}');
    if (Object.keys(data).length === 0) {
      navigate('/');
    } else {
      setPaymentData(data);
    }
  }, [navigate]);

  const saveTicket = () => {
    console.log("Dados do pagamento ao salvar o ticket:", paymentData);
    const ingressos = JSON.parse(localStorage.getItem("ingressos") || "[]");

    const newTicket = {
      id: Date.now().toString(),
      movieTitle: paymentData.movie.title,
      sessionTime: paymentData.movie.session,
      seats: paymentData.seats.selected,
      status: "Pago",
      user: {
        name: paymentData.user.name,
        email: paymentData.user.email,
      },
      total: paymentData.total,
    };

    localStorage.setItem("ingressos", JSON.stringify([...ingressos, newTicket]));
  };

  const handlePayment = () => {
    const updatedPaymentData = {
      ...paymentData,
      paid: true,
    };

    localStorage.setItem('paymentData', JSON.stringify(updatedPaymentData));
    setPaymentData(updatedPaymentData);

    saveTicket(); // Salva o ingresso depois de pagar

    alert('Pagamento realizado com sucesso!');
    navigate('/ticket'); // Redireciona para a tela de ingressos
  };

  if (!paymentData) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Resumo do Pagamento</h1>
      <p><strong>Filme:</strong> {paymentData.movie.title}</p>
      <p><strong>Usuário:</strong> {paymentData.user.name}</p>
      <p><strong>Email:</strong> {paymentData.user.email}</p>
      <p><strong>Idade:</strong> {paymentData.user.age}</p>
      <p><strong>Assentos:</strong> {paymentData.seats.selected.join(', ')}</p>
      <p><strong>Total:</strong> R$ {paymentData.total.toFixed(2)}</p>
      <p><strong>Status:</strong> {paymentData.paid ? 'Pago' : 'Pendente'}</p>

      {!paymentData.paid && (
        <button
          onClick={handlePayment}
          className={styles.btn_Paid}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Pagar Agora
        </button>
      )}
    </div>
  );
};

export default Payment;
