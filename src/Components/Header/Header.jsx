import styles from "./Header.module.css";
import LogoHeader from "../../assets/LogoHeader.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src={LogoHeader} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.navbarContainer}></div>
      </div>
    </header>
  );
};

export default Header;
