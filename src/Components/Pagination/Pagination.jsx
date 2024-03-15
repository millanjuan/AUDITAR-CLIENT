import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage, filterInspections } from "../../redux/actions";
import { IoMdSkipBackward } from "react-icons/io";
import { IoMdSkipForward } from "react-icons/io";
import { IoCaretBackSharp } from "react-icons/io5";
import { IoCaretForwardSharp } from "react-icons/io5";

const Pagination = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const searchInput = useSelector((state) => state.searchInput);
  const date = useSelector((state) => state.date);

  const handleClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(updateCurrentPage(newPage));
      dispatch(
        filterInspections(
          token,
          {
            companyName: searchInput,
            fullname: searchInput,
            date: date,
            page: newPage,
          },
          newPage,
          12
        )
      );
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    if (totalPages > 1) {
      if (currentPage > 1) {
        buttons.push(
          <button
            key="firstPage"
            onClick={() => handleClick(1)}
            className={styles.button}
          >
            <IoMdSkipBackward className={styles.icon} />
          </button>
        );
        buttons.push(
          <button
            key="prevPage"
            onClick={() => handleClick(currentPage - 1)}
            className={styles.button}
          >
            <IoCaretBackSharp className={styles.icon} />
          </button>
        );
      }
      if (currentPage > 2) {
        buttons.push(
          <button
            key="currentPageMinusOne"
            onClick={() => handleClick(currentPage - 1)}
            className={styles.button}
          >
            {currentPage - 1}
          </button>
        );
      }
      buttons.push(
        <span key="currentPage" className={styles.current}>
          {currentPage}
        </span>
      );
      if (currentPage < totalPages - 1) {
        buttons.push(
          <button
            key="currentPagePlusOne"
            onClick={() => handleClick(currentPage + 1)}
            className={styles.button}
          >
            {currentPage + 1}
          </button>
        );
      }
      if (currentPage < totalPages) {
        buttons.push(
          <button
            key="nextPage"
            onClick={() => handleClick(currentPage + 1)}
            className={styles.button}
          >
            <IoCaretForwardSharp className={styles.icon} />
          </button>
        );
        buttons.push(
          <button
            key="lastPage"
            onClick={() => handleClick(totalPages)}
            className={styles.button}
          >
            <IoMdSkipForward className={styles.icon} />
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className={styles.paginationContainer}>
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
