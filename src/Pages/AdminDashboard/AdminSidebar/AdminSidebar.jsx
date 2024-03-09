import styles from "./AdminSidebar.module.css";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setAdminOption } from "../../../redux/actions";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiUserAddFill } from "react-icons/ri";

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

const AdminSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState("manageUsers");

  const handleOptionChange = (option) => {
    dispatch(setAdminOption(option));
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
            activeOption === "manageUsers" ? classes.activeOption : ""
          }`}
          onClick={() => handleOptionChange("manageUsers")}
        >
          <PiUsersThreeFill className={styles.icon} />
          <ListItemText primary="Administrar Usuarios" />
        </ListItem>
        <ListItem
          button
          className={`${classes.drawerList} ${
            activeOption === "newUser" ? classes.activeOption : ""
          }`}
          onClick={() => handleOptionChange("newUser")}
        >
          <RiUserAddFill className={styles.icon} />
          <ListItemText primary="Nuevo Usuario" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;
