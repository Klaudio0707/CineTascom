
import { Link } from "react-router-dom"
import style from "./styles.module.css"


const index = () => {
  return (
    <div>
        <header className={style.header}>
    <div className={style.header_logo}>
        <img src="" alt="" />
    </div>
    <nav className={style.header_nav}>
        <ul>
        <li><Link to="/">Inicio</Link></li>
          <li><Link to="/seats">Assentos</Link></li>
          {/* Adicionar logica de login do fireabase */}
          <li><Link to="/ticket">Meus Ingressos</Link></li>
        </ul>
    </nav>
    <div className={style.header_actions}>
        <input type="text" placeholder="Buscar filmes" />
        <button>Login</button>
    </div>
</header>


        </div>
  )
}

export default index