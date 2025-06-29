import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
const NotFound = () => {
    return (_jsxs("div", { className: styles.container, children: [_jsx("h1", { className: styles.errorCode, children: "404" }), _jsx("h2", { className: styles.title, children: "P\u00E1gina N\u00E3o Encontrada" }), _jsx("p", { className: styles.description, children: "Oops! Parece que o filme que voc\u00EA procurava saiu de cartaz ou a p\u00E1gina foi movida." }), _jsx(Link, { to: "/", className: styles.homeLink, children: "Voltar para a Bilheteria" })] }));
};
export default NotFound;
