import { useState, useEffect } from "react";
import styles from "./InspectionCard.module.css";
import { useNavigate } from "react-router-dom";

const InspectionCard = ({
  id,
  companyName,
  fullname,
  category,
  inspectionDate,
}) => {
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCard(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleNavigate = () => {
    navigate(`/historial/${id}`);
  };

  return (
    <div
      className={`${styles.cardContainer} ${showCard && styles.show}`}
      onClick={handleNavigate}
    >
      <div className={styles.header}>
        <img
          src={category.image}
          alt="categoryImage"
          className={styles.categoryImage}
        />
        <span className={styles.categoryTitle}>{category.name}</span>
      </div>
      <div className={styles.body}>
        <span>Nombre del comercio:</span>
        <p className={styles.text}>{companyName}</p>
        <span>Titular:</span>
        <p className={styles.text}>{fullname}</p>
        <span>Fecha de inspección:</span>
        <p className={styles.text}>{inspectionDate}</p>
      </div>
    </div>
  );
};

export default InspectionCard;
