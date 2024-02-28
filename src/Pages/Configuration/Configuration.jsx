import styles from "./Configuration.module.css";
import Sidebar from "./Sidebar/Sidebar";
import PersonalData from "./Renders/PersonalData/PersonalData";
import Security from "./Renders/Security/Security";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
  const selectedOption = useSelector((state) => state.selectedOption);

  const personalData = "personalData";
  const security = "security";
  const logOut = "logOut";

  const navigate = useNavigate();

  const logOutSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  const renderContent = (option) => {
    switch (option) {
      case personalData:
        return <PersonalData />;

      case security:
        return <Security />;

      case logOut:
        return (
          <div className={styles.logOutContainer}>
            <div className={styles.header}>
              <span>Cierre de sesión</span>
            </div>
            <div className={styles.body}>
              <span>Está a punto de cerrar sesión</span>
              <span>¿Está seguro que desea hacerlo?</span>
              <button className={styles.logOutButton} onClick={logOutSesion}>
                Cerrar sesion
              </button>
            </div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.renderContainer}>
        {renderContent(selectedOption)}
      </div>
    </div>
  );
};

export default Configuration;
