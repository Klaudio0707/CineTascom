import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles.module.css";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        }
        catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };
    const handleLogout = async () => {
        try {
            await signOut();
            // Limpa o localStorage ao sair
            localStorage.clear();
            navigate("/");
        }
        catch (error) {
            console.error("Erro ao sair:", error);
        }
    };
    return (_jsxs("header", { className: style.header, children: [_jsx("nav", { className: style.header_nav, children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: "/", children: "In\u00EDcio" }) }), user && (_jsx(_Fragment, { children: _jsx("li", { children: _jsx(Link, { to: "/ticket", children: "Meus Ingressos" }) }) }))] }) }), _jsxs("div", { className: style.header_actions, children: [_jsx(Input, {}), user ? (_jsx(_Fragment, { children: _jsx("button", { onClick: handleLogout, className: style.logoutButton, children: _jsxs("span", { children: ["Ol\u00E1, ", user.name?.split(" ")[0]] }) }) })) : (_jsx("button", { onClick: handleLogin, className: style.loginButton, children: "Login" }))] })] }));
};
export default Header;
