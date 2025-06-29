import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import type {ITicket} from "../../@types/ITicket"



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
    const ticketContent = `
      ---- TICKET CINE TASCOM ----
      Pedido ID: ${ticket.id}
      Filme: ${ticket.movieTitle}
      Sessão: ${ticket.sessionTime}
      Assentos: ${ticket.seats.join(", ")}
      Status: ${ticket.status}
      ----------------------------
      Apresente este ticket na entrada.
    `;
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`<pre>${ticketContent}</pre>`);
    printWindow?.print();
    printWindow?.close();
  };

  return (
    <div className={styles.pageContainer}>
    <h1 className={styles.pageTitle}>Meus Ingressos</h1>
    
    {ticket.length === 0 ? (
      <p className={styles.emptyMessage}>Você ainda não possui nenhum ingresso.</p>
    ) : (
      <div className={styles.ticketsList}>
        {/* CORREÇÃO: Usando a variável de estado 'tickets' para o .map */}
        {ticket.map((ticket) => (
          <div key={ticket.id} className={styles.ticketCard}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketId}>Pedido #{ticket.id.substring(0, 8)}</span>
              <h2 className={styles.movieTitle}>{ticket.movieTitle}</h2>
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
