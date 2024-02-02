import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryCards from "../../Components/CategoryCards/CategoryCards";
import { getAllCategories } from "../../redux/actions";
import styles from "./NewInspection.module.css"

const NewInspection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);
  return (
    <div className={styles.inspectionContainer}>
      <h2 className={styles.wrapperTitle}>Rubros</h2>
      <CategoryCards categories={categories}/>
    </div>
  )
}

export default NewInspection