import styles from "./AdminDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import ManageUsers from "./Renders/ManageUsers/ManageUsers";
import NewUser from "./Renders/NewUser/NewUser";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import { useEffect } from "react";
import { setAdminOption } from "../../redux/actions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.selectedAdminOption);
  useEffect(() => {
    dispatch(setAdminOption(manageUsers));
  }, [dispatch]);

  const manageUsers = "manageUsers";
  const newUser = "newUser";

  const renderContent = (option) => {
    switch (option) {
      case manageUsers:
        return <ManageUsers />;

      case newUser:
        return <NewUser />;

      default:
        break;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.render}>{renderContent(selectedOption)}</div>
    </div>
  );
};

export default AdminDashboard;
