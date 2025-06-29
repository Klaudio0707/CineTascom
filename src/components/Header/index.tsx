import { Link, useNavigate } from "react-router-dom";
import React from "react";
import style from "./styles.module.css";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Limpa o localStorage ao sair
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className={style.header}>
      <nav className={style.header_nav}>
        <ul>
          <li><Link to="/">Início</Link></li>
          {user && (
            <>
              <li><Link to="/ticket">Meus Ingressos</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className={style.header_actions}>
        <Input />
        {user ? (
          <>
            <button onClick={handleLogout} className={style.logoutButton}>
              <span>Olá, {user.name?.split(" ")[0]}</span>
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className={style.loginButton}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
