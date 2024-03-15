import styles from "./Landing.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.textContainer}>
        <p className={styles.text}>
          Un inspector virtual que los ayudará a realizar las inspecciones
          bromatológicas y los guiará para mejorar la calidad y seguridad
          alimenticia.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/ingresar">
          <button className={styles.loginButton}>Ingresar</button>
        </Link>
        <Link to="/registrarse">
          <button className={styles.registerButton}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
