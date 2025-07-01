// src/pages/Payment/index.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { type IPaymentData } from '../../@types/IPayment';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<IPaymentData | null>(null);

  useEffect(() => {
    const dataString = localStorage.getItem('paymentData');
    if (!dataString) {
      console.error("Nenhum dado de pagamento encontrado. Redirecionando...");
      navigate('/');
      return;
    }
    
    try {
      const data: IPaymentData = JSON.parse(dataString);
      setPaymentData(data);
    } catch (error) {
      console.error("Erro ao parsear dados do pagamento:", error);
      navigate('/');
    }
  }, [navigate]);

  const saveTicket = () => {
    // Como temos a guarda abaixo, podemos assumir que paymentData existe aqui.
    // Adicionamos '!' para dizer ao TypeScript: "Eu sei o que estou fazendo, confie em mim".
    const ingressos = JSON.parse(localStorage.getItem("ingressos") || "[]");
    const newTicket = {
      id: Date.now().toString(),
      movieTitle: paymentData!.movie.title,
      sessionTime: paymentData!.movie.session,
      seats: paymentData!.seats.selected,
      status: "Pago",
      user: {
        name: paymentData!.user.name,
        email: paymentData!.user.email,
      },
      total: paymentData!.total,
    };
    localStorage.setItem("ingressos", JSON.stringify([...ingressos, newTicket]));
  };

  const handlePayment = () => {
    if (!paymentData) return;

    const updatedPaymentData: IPaymentData = { ...paymentData, paid: true };
    localStorage.setItem('paymentData', JSON.stringify(updatedPaymentData));
    setPaymentData(updatedPaymentData);

    saveTicket(); 
    alert('Pagamento realizado com sucesso!');
    navigate('/ticket'); 
  };

  // ESTA É A GUARDA PRINCIPAL
  if (!paymentData) {
    return <p>Carregando resumo do pagamento...</p>;
  }

  // A partir daqui, o TypeScript sabe que `paymentData` não é nulo.
  return (
     <div className={styles.wrapper}>
      <h1 className={styles.title}>Resumo da Compra</h1>

      <div className={styles.summaryCard}>
        <p>
          <strong>Filme:</strong> 
          <span>{paymentData.movie.title}</span>
        </p>
        <p>
          <strong>Sessão:</strong> 
          <span>{paymentData.movie.session}</span>
        </p>
        <p>
          <strong>Usuário:</strong> 
          <span>{paymentData.user.name}</span>
        </p>
        <p>
          <strong>Assentos:</strong>
          <span>{paymentData.seats.selected.join(', ')}</span>
        </p>
        <p className={styles.total}>
          <strong>Total:</strong> 
          <span>R$ {paymentData.total.toFixed(2)}</span>
        </p>
      </div>

      {/* Exibe o status do pagamento */}
      {paymentData.paid ? (
        <p className={styles.paidMessage}>Pagamento Confirmado!</p>
      ) : (
        <button onClick={handlePayment} className={styles.payButton}>
          Pagar Agora
        </button>
      )}
    </div>
  );
};

export default Payment;