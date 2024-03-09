import styles from "./ManageUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../../redux/actions";
import axios from "axios";
import swal from "sweetalert";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllUsers(token));
    console.log(users);
  }, [dispatch]);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllUsers(token));
      swal.fire({
        icon: "success",
        title: "Usuario eliminado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span>Administrar Usuarios</span>
      </div>
      <div className={styles.body}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.name} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
