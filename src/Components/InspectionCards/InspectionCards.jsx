import InspectionCard from "../InspectionCard/InspectionCard";
import styles from "./InspectionCards.module.css";

const InspectionCards = ({ inspections }) => {
  return (
    <div className={styles.mainContainer}>
      {inspections &&
        inspections.map((inspection) => {
          return (
            <InspectionCard
              key={inspection.id}
              id={inspection.id}
              companyName={inspection.companyName}
              fullname={inspection.fullname}
              category={inspection.category}
              inspectionDate={inspection.inspectionDate}
            />
          );
        })}
    </div>
  );
};

export default InspectionCards;
