import React from "react";
import loading from "../../assets/loading3.gif";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
