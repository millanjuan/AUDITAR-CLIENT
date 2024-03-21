import styles from "./CategoryCard.module.css";
import {
  getCategoryById,
  setFormData,
  setInspectionState,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CategoryCard = ({ id, name, image }) => {
  const formData = useSelector((state) => state.formData);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCard(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSetCategory = (id) => {
    dispatch(setInspectionState("quizz"));
    dispatch(getCategoryById(id, token));
    dispatch(
      setFormData({
        ...formData,
        categoryId: id,
      })
    );
  };
  return (
    <div
      className={`${styles.cardContainer} ${showCard && styles.show}`}
      onClick={() => handleSetCategory(id)}
    >
      <img src={image} alt="Card Image" className={styles.cardImage} />
      <h2>{name}</h2>
    </div>
  );
};

export default CategoryCard;
