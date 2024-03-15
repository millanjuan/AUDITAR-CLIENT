import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InspectionCards from "../../Components/InspectionCards/InspectionCards";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Pagination from "../../Components/Pagination/Pagination";
import { getAllInspections, updateCurrentPage } from "../../redux/actions";
import styles from "./InspectionHistory.module.css";

const InspectionHistory = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const inspections = useSelector((state) => state.inspections);
  const filteredInspections = useSelector((state) => state.filteredInspections);

  useEffect(() => {
    dispatch(getAllInspections(token)).then(() => {});
    dispatch(updateCurrentPage(1));
  }, [dispatch, token]);

  const renderInspections = () => {
    return filteredInspections && filteredInspections.total > 0 ? (
      <InspectionCards inspections={filteredInspections.inspections} />
    ) : inspections && inspections.total > 0 ? (
      <InspectionCards inspections={inspections.inspections} />
    ) : (
      <div>
        <span>No hay inspecciones</span>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span className={styles.title}>Historial</span>
      </div>
      <div className={styles.body}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.cardsContainer}>{renderInspections()}</div>
        <div className={styles.paginationContainer}>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default InspectionHistory;
