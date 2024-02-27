import styles from './Home.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.homeContainer}>
        <img src={logo} alt="logo" className={styles.logo}/>
        <div className={styles.buttonContainer}>
        <Link to='/NuevaInspeccion'>
          <button className={styles.newButton}>+ Nueva Inspección</button>
        </Link>
        <Link to='/historial'>
          <button className={styles.historyButton}>Historial</button>
        </Link>
        </div>
    </div>
  )
}

export default Home