
import React from 'react';
import type { ITicket } from '../../@types/ITicket';
import styles from "./styles.module.css"

const printStyles = `
  @media print {
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #000;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .ticket-container {
      width: 320px;
      margin: 20px auto;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #fff;
    }
    .header {
      text-align: center;
      border-bottom: 2px dashed #999;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .header h1 {
      font-size: 1.4rem;
      margin: 0;
      color: #111;
    }
    .header span {
      font-size: 0.8rem;
      color: #555;
    }
    .section {
      margin-bottom: 12px;
    }
    .section h2 {
      font-size: 1rem;
      margin: 0 0 5px 0;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 3px;
    }
    .section p {
      font-size: 0.95rem;
      margin: 0 0 5px 0;
      color: #444;
    }
    .section p strong {
      color: #000;
    }
    .seats-list {
      font-weight: 700;
      font-size: 1.1rem;
      color: #000;
    }
    .footer {
      margin-top: 20px;
      padding-top: 10px;
      border-top: 2px dashed #999;
      text-align: center;
      font-size: 0.8rem;
      color: #555;
    }
  }
`;

interface PrintableTicketProps {
  ticket: ITicket;
}


const PrintableTicket: React.FC<PrintableTicketProps> = ({ ticket }) => {
  return (
    <html>
      <head>
        <title>Ticket Cine Tascom - Pedido {ticket.id}</title>
      
        <style>{printStyles}</style>
      </head>
      <body>
        <div className="ticket-container">
          <header className="header">
            <h1>CINE TASCOM</h1>
            <span>Seu Ingresso Oficial</span>
          </header>

          <section className="section">
            <h2>{ticket.movieTitle}</h2>
            <p><strong>Sessão:</strong> {ticket.sessionTime}</p>
          </section>
          
          <section className="section">
            <h2>Seus Assentos</h2>
            <p className="seats-list">{ticket.seats.join(", ")}</p>
          </section>

          <section className="section">
            <p><strong>Nome:</strong>{ticket.status}</p>
            <p><strong>Pedido ID:</strong> {ticket.id}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
          </section>

          <footer className="footer">
            Apresente este ticket na entrada da sala. Bom filme!
          </footer>
        </div>
      </body>
    </html>
  );
};

export default PrintableTicket;