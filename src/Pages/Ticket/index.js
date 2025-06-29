import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const Ingressos = () => {
    const [ingressos, setIngressos] = useState([]);
    useEffect(() => {
        const data = localStorage.getItem("ingressos");
        if (data) {
            setIngressos(JSON.parse(data));
        }
    }, []);
    const handlePrint = (ingresso) => {
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
    return (_jsxs("div", { children: [_jsx("h1", { children: "Meus Ingressos" }), ingressos.length === 0 ? (_jsx("p", { children: "Voc\u00EA ainda n\u00E3o comprou nenhum ingresso." })) : (ingressos.map((ingresso) => (_jsxs("div", { style: { border: "1px solid #ccc", margin: "10px", padding: "10px" }, children: [_jsxs("p", { children: [_jsx("strong", { children: "Pedido ID:" }), " ", ingresso.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Filme:" }), " ", ingresso.movieTitle] }), _jsxs("p", { children: [_jsx("strong", { children: "Sess\u00E3o:" }), " ", ingresso.sessionTime] }), _jsxs("p", { children: [_jsx("strong", { children: "Assentos:" }), " ", ingresso.seats.join(", ")] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", ingresso.status] }), _jsx("button", { onClick: () => handlePrint(ingresso), children: "Imprimir Ticket" })] }, ingresso.id))))] }));
};
export default Ingressos;
