import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
const Payment = () => {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    useEffect(() => {
        console.log("Salvando paymentData:");
        const data = JSON.parse(localStorage.getItem('paymentData') || '{}');
        if (Object.keys(data).length === 0) {
            navigate('/');
        }
        else {
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
        navigate('/ticket');
    };
    if (!paymentData) {
        return _jsx("p", { children: "Carregando..." });
    }
    return (_jsxs("div", { style: { textAlign: 'center', padding: '20px' }, children: [_jsx("h1", { children: "Resumo do Pagamento" }), _jsxs("p", { children: [_jsx("strong", { children: "Filme:" }), " ", paymentData.movie.title] }), _jsxs("p", { children: [_jsx("strong", { children: "Usu\u00E1rio:" }), " ", paymentData.user.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Assentos:" }), " ", paymentData.seats.selected.join(', ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), " R$ ", paymentData.total.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", paymentData.paid ? 'Pago' : 'Pendente'] }), !paymentData.paid && (_jsx("button", { onClick: handlePayment, className: styles.btn_Paid, style: {
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }, children: "Pagar Agora" }))] }));
};
export default Payment;
