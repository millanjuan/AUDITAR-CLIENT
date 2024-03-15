import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import {
  getCategoryById,
  setFormData,
  setInspectionState,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const CategoryCard = ({ id, name, image }) => {
  const formData = useSelector((state) => state.formData);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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
    <div className={styles.cardContainer} onClick={() => handleSetCategory(id)}>
      <img src={image} alt="Card Image" className={styles.cardImage} />
      <h2>{name}</h2>
    </div>
  );
};

export default CategoryCard;
