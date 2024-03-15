import styles from "./Home.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className={styles.homeContainer}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button
          className={styles.newButton}
          onClick={() => handleNavigate("/nuevaInspeccion")}
        >
          + Nueva Inspección
        </button>
        <button
          className={styles.historyButton}
          onClick={() => handleNavigate("/historial")}
        >
          Historial
        </button>
      </div>
    </div>
  );
};

export default Home;
