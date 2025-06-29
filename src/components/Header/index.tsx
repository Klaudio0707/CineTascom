import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import styles from "./styles.module.css";
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
    <header className={styles.header}>
      {/* Adicionado um link no logo para uma melhor UX */}
      <Link to="/" className={styles.headerLogo}>
        CINE TASCOM
      </Link>

      <nav className={styles.headerNav}>
        <ul>
          <li><Link to="/" >Início</Link></li>
          {user && (
            <li><Link to="/ticket">Meus Ingressos</Link></li>
          )}
        </ul>
      </nav>

      <div className={styles.headerActions}>
        {user ? (
          <div className={styles.userMenu}>
            <Input/>
            <span>Olá, {user.name?.split(" ")[0]}!</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className={styles.loginButton}>
            Login 
            <FcGoogle className={styles.iconGoogle} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
