
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
            <li><a href="/">Home</a></li>
            <li><a href="/filmes">Filmes</a></li>
            <li><a href="/ingressos">Ingressos</a></li>
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