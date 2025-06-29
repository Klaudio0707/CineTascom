import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'; 

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>Página Não Encontrada</h2>
      <p className={styles.description}>
        Oops! Parece que o filme que você procurava saiu de cartaz ou a página foi movida.
      </p>
      <Link to="/" className={styles.homeLink}>
        Voltar para a Bilheteria
      </Link>
    </div>
  );
};

export default NotFound;