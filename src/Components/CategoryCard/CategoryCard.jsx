import { Link } from "react-router-dom"
import styles from "./CategoryCard.module.css"

const CategoryCard = ({ name, image }) => {
  return (
    <Link className={styles.wrapperLinks}>
        <div className={styles.cardContainer}>
        <img src={image} alt="Card Image" className={styles.cardImage}/>
        <h2>{name}</h2>
    </div>
    </Link>
  )
}

export default CategoryCard