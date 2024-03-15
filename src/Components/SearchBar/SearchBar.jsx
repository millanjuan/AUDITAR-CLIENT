import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterInspections,
  getAllInspections,
  resetFiltersParams,
  setSearchedInput,
  updateCurrentPage,
  updateTotalPages,
  setDate,
} from "../../redux/actions";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [date1, setDate1] = useState("");
  const [params, setParams] = useState({
    companyName: "",
    fullname: "",
    date: "",
  });

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleReset = () => {
    dispatch(resetFiltersParams());
    setSearchInput("");
    setDate1("");
    dispatch(setSearchedInput(""));
    dispatch(setDate(""));
    dispatch(updateCurrentPage(1));
    dispatch(getAllInspections(token, 1, 12));
    dispatch(updateTotalPages(1));
  };

  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput && !date1) {
      return;
    }

    dispatch(resetFiltersParams());
    setParams({
      companyName: trimmedInput,
      fullname: trimmedInput,
      date: date1,
    });
    dispatch(setSearchedInput(trimmedInput));
    dispatch(setDate(date1));
    dispatch(updateCurrentPage(1));
    dispatch(updateTotalPages(1));
  };

  useEffect(() => {
    dispatch(filterInspections(token, params, 1, 12));
  }, [token, params, dispatch]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre del comercio o titular"
          className={styles.searchInput}
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <input
          type="date"
          className={styles.dateInput}
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
          placeholder="Seleccionar fecha"
        />
      </div>
      <div className={styles.buttonContainer}>
        <span className={styles.cancel} onClick={handleReset}>
          Cancelar
        </span>
        <button className={styles.searchButton} onClick={handleSearch}>
          Buscar
          <CiSearch className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
