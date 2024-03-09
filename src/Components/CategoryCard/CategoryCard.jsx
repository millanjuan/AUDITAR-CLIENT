import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import { getCategoryById, setInspectionState } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CategoryCard = ({ id, name, image }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleSetCategory = (id) => {
    dispatch(setInspectionState("quizz"));
    dispatch(getCategoryById(id, token));
  };
  return (
    <div className={styles.cardContainer} onClick={() => handleSetCategory(id)}>
      <img src={image} alt="Card Image" className={styles.cardImage} />
      <h2>{name}</h2>
    </div>
  );
};

export default CategoryCard;
