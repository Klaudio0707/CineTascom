import React, { useEffect, useState } from "react";

type Ingresso = {
  id: string;
  movieTitle: string;
  sessionTime: string;
  seats: string[];
  status: string;
};

const Ingressos: React.FC = () => {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("ingressos");
    if (data) {
      setIngressos(JSON.parse(data));
    }
  }, []);

  const handlePrint = (ingresso: Ingresso) => {
    const ticketContent = `
      ---- TICKET CINE TASCOM ----
      Pedido ID: ${ingresso.id}
      Filme: ${ingresso.movieTitle}
      Sessão: ${ingresso.sessionTime}
      Assentos: ${ingresso.seats.join(", ")}
      Status: ${ingresso.status}
      ----------------------------
      Apresente este ticket na entrada.
    `;
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`<pre>${ticketContent}</pre>`);
    printWindow?.print();
    printWindow?.close();
  };

  return (
    <div>
      <h1>Meus Ingressos</h1>
      {ingressos.length === 0 ? (
        <p>Você ainda não comprou nenhum ingresso.</p>
      ) : (
        ingressos.map((ingresso) => (
          <div key={ingresso.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><strong>Pedido ID:</strong> {ingresso.id}</p>
            <p><strong>Filme:</strong> {ingresso.movieTitle}</p>
            <p><strong>Sessão:</strong> {ingresso.sessionTime}</p>
            <p><strong>Assentos:</strong> {ingresso.seats.join(", ")}</p>
            <p><strong>Status:</strong> {ingresso.status}</p>
            <button onClick={() => handlePrint(ingresso)}>Imprimir Ticket</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Ingressos;
