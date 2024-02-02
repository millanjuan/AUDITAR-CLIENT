import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoryCards.module.css"

const CategoryCards = ({categories}) => {
  return (
    <div className={styles.cardsContainer}>
        {categories.map((category) => {
            return <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
            />
        })}
    </div>
  )
}

export default CategoryCards
