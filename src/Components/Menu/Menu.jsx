import styles from "./Menu.module.css";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdMenu, MdAdminPanelSettings } from "react-icons/md";
import { IoMdHome, IoMdSettings, IoIosLogOut } from "react-icons/io";
import LogoHeader from "../../assets/logoRegister.png";

const useStyles = makeStyles((theme) => ({
  drawerList1: {
    color: "white",
    width: "100%",
    margin: "0px 20px 0px 20px",
    backgroundColor: "transparent",
    gap: "10px",
    "&:active": {
      backgroundColor: "#01283F",
    },
  },
}));
const Menu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const rol = useSelector((state) => state.userData.rol);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDrawer(false);
  };

  const logOutSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleDrawerOpen}>
          <MdMenu className={styles.menuIcon} />
        </button>
      </div>
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background:
              "linear-gradient(180deg, #22aeff 0%, #0288d1 47.97%, #005da5 100%)",
            height: "100%",
            width: "100%",
            gap: "10px",
          }}
        >
          <div className={styles.logoContainer}>
            <img src={LogoHeader} alt="logo" className={styles.logo} />
          </div>
          <ListItem
            button
            className={classes.drawerList1}
            onClick={() => handleNavigate("/inicio")}
          >
            <IoMdHome className={styles.icon} />
            <ListItemText primary="Inicio" />
          </ListItem>

          <ListItem
            button
            className={classes.drawerList1}
            onClick={() => handleNavigate("/configuracion")}
          >
            <IoMdSettings className={styles.icon} />
            <ListItemText primary="Configuracion" />
          </ListItem>

          {rol === "admin" && (
            <ListItem
              button
              className={classes.drawerList1}
              onClick={() => handleNavigate("/panel-de-administrador")}
            >
              <MdAdminPanelSettings className={styles.icon} />
              <ListItemText primary="Panel de Administrador" />
            </ListItem>
          )}
          <ListItem
            button
            className={classes.drawerList1}
            onClick={logOutSesion}
          >
            <IoIosLogOut className={styles.icon} />
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Menu;
