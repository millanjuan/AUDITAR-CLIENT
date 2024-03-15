import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryCards from "../../Components/CategoryCards/CategoryCards";
import { getAllCategories } from "../../redux/actions";
import styles from "./Category.module.css";

const Category = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories(token));
  }, [dispatch, token]);
  return (
    <div className={styles.inspectionContainer}>
      <h2 className={styles.wrapperTitle}>Rubros</h2>
      <CategoryCards categories={categories} />
    </div>
  );
};

export default Category;
