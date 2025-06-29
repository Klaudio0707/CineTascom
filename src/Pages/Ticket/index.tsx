import React, { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server'
import styles from "./styles.module.css"
import type {ITicket} from "../../@types/ITicket"
import PrintableTicket from "../../components/PrintTicket";



const QrCodeIcon = () => (

  <svg className={styles.qrIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <line x1="14" y1="14" x2="14" y2="21"></line>
    <line x1="21" y1="14" x2="21" y2="21"></line>
  </svg>
);



const Ticket: React.FC = () => {
  const [ticket, setTicket] = useState<ITicket[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("ingressos");
    if (data) {
      setTicket(JSON.parse(data));
    }
  }, []);
  const handlePrint = (ticket: ITicket) => {
    // 1. Renderiza o componente PrintableTicket para uma string HTML
    const ticketHtml = ReactDOMServer.renderToString(
      <PrintableTicket ticket={ticket} />
    );

    // 2. Abre a nova janela e escreve o HTML gerado
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(ticketHtml);
      
      // 3. Lógica de impressão
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
          printWindow.print();
          printWindow.close();
      }, 250); 
    }
  };

  return (
    <div className={styles.pageContainer}>
    <h1 className={styles.pageTitle}>Meus Ingressos</h1>
    
    {ticket.length === 0 ? (
      <p className={styles.emptyMessage}>Você ainda não possui nenhum ingresso.</p>
    ) : (
      <div className={styles.ticketsList}>
       
        {ticket.map((ticket) => (
          <div key={ticket.id} className={styles.ticketCard}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketId}>Pedido #{ticket.id.substring(0, 8)}</span>
              <h2 className={styles.movieTitle}>{ticket.movieTitle}</h2>
              <h3>{ticket.name}</h3>
              <div className={styles.details}>
                <span><strong>Sessão:</strong> {ticket.sessionTime}</span>
                <span><strong>Status:</strong> <span className={styles.status}>{ticket.status}</span></span>
              </div>
              <div className={styles.seats}>
                <strong>Assentos:</strong> {ticket.seats.join(", ")}
              </div>
            </div>

            <div className={styles.ticketStub}>
              <QrCodeIcon />
              <button className={styles.printButton} onClick={() => handlePrint(ticket)}>
                Imprimir
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Ticket;
