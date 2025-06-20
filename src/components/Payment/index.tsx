import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Recuperar os dados do localStorage
    const data = JSON.parse(localStorage.getItem('paymentData') || '{}');
    if (Object.keys(data).length === 0) {
      navigate('/'); // Redirecionar para a home se não houver dados
    } else {
      setPaymentData(data);
    }
  }, [navigate]);

  const handlePayment = () => {
    const updatedPaymentData = {
      ...paymentData,
      paid: true, // Atualizar o status para "pago"
    };

    localStorage.setItem('paymentData', JSON.stringify(updatedPaymentData));
    setPaymentData(updatedPaymentData);

    alert('Pagamento realizado com sucesso!');
    navigate('/');
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
      >
        Pagar Agora
      </button>
    </div>
  );
};

export default Payment;


// import React, { useState, useEffect } from 'react';

// const Payment: React.FC = () => {
//   const [paymentConfirmed, setPaymentConfirmed] = useState(false);
//   const [purchaseDetails, setPurchaseDetails] = useState<any>(null);

//   useEffect(() => {
//     const details = JSON.parse(localStorage.getItem('purchaseDetails') || '{}');
//     setPurchaseDetails(details);
//   }, []);

//   const handlePayment = () => {
//     setPaymentConfirmed(true);
//     alert('Pagamento realizado com sucesso!');
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Pagamento</h1>
//       {purchaseDetails && (
//         <>
//           <p><strong>Usuário:</strong> {purchaseDetails.user.name}</p>
//           <p><strong>Cadeiras:</strong> {purchaseDetails.seats.join(', ')}</p>
//           <p><strong>Total a pagar:</strong> R$ {purchaseDetails.total.toFixed(2)}</p>
//         </>
//       )}
//       <button
//         onClick={handlePayment}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: paymentConfirmed ? '#4caf50' : '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//         }}
//       >
//         {paymentConfirmed ? 'Pagamento Confirmado' : 'Pagar'}
//       </button>
//     </div>
//   );
// };

// export default Payment;




