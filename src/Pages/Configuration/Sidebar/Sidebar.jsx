import styles from "./Sidebar.module.css";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { setSelectedOption } from "../../../redux/actions";
import { useState } from "react";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  drawerList: {
    color: "#212121",
    width: "100%",
    height: "56px",
    fontSize: "20px",
    fontWeight: "400",
    margin: "0px 20px 0px 20px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundImage:
        "linear-gradient(180deg, #22AEFF 0%, #0288D1 47.97%, #005DA5 100%)",
      color: "white",
    },
  },
  activeOption: {
    backgroundImage:
      "linear-gradient(180deg, #22AEFF 0%, #0288D1 47.97%, #005DA5 100%)",
    color: "white",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState("personalData");

  const handleOptionChange = (option) => {
    dispatch(setSelectedOption(option));
    setActiveOption(option);
  };
  return (
    <div className={styles.mainContainer}>
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <ListItem
          button
          className={`${classes.drawerList} ${
            activeOption === "personalData" ? classes.activeOption : ""
          }`}
          onClick={() => handleOptionChange("personalData")}
        >
          <RiUserSettingsLine className={styles.icon} />
          <ListItemText primary="Datos Personales" />
        </ListItem>
        <ListItem
          button
          className={`${classes.drawerList} ${
            activeOption === "security" ? classes.activeOption : ""
          }`}
          onClick={() => handleOptionChange("security")}
        >
          <FaShieldAlt className={styles.icon} />
          <ListItemText primary="Seguridad" />
        </ListItem>
        <ListItem
          button
          className={`${classes.drawerList} ${
            activeOption === "logOut" ? classes.activeOption : ""
          }`}
          onClick={() => handleOptionChange("logOut")}
        >
          <IoIosLogOut className={styles.icon} />
          <ListItemText primary="Cierre de sesión" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
