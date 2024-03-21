import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions";
import { useEffect } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUserData(token));
  }, [token]);
  const rol = useSelector((state) => state.userData.rol);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav}>
        <Link to="/inicio" className={styles.link}>
          <li className={styles.navItem}>Inicio</li>
        </Link>
        <Link to="/configuracion" className={styles.link}>
          <li className={styles.navItem}>Configuracion</li>
        </Link>
        {rol === "admin" && (
          <Link to="/panel-de-administrador" className={styles.link}>
            <li className={styles.navItem}>Panel de Administrador</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
