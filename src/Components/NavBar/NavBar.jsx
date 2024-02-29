import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const [rol, setRol] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {}, [token]);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav}></ul>
    </nav>
  );
};

export default NavBar;
