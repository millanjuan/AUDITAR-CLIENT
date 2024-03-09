import styles from "./Footer.module.css";
import image from "../../assets/FooterImage.png";

const Footer = () => {
  return (
    <footer className={styles.mainContainer}>
      <img src={image} className={styles.footerImage} alt="logo" />
      <div className={styles.textContainer}>
        <span className={styles.title}>Municipio de Cafayate</span>
        <span className={styles.text}>Nuestra Señora del Rosario N° 9</span>
        <span className={styles.text}>(4427) Cafayate, Salta</span>
        <span className={styles.text}>Teléfono: 3868 638034</span>
      </div>
    </footer>
  );
};

export default Footer;
