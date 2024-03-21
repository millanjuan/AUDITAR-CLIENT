import styles from "./NewUser.module.css";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const NewUser = () => {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    email: "",
    rol: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCreateUser = async () => {
    let formIsValid = true;

    // Validar el campo de email
    if (!isValidEmail(userData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor ingrese un email válido.",
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // Validar el campo de rol
    if (userData.rol === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rol: "Por favor seleccione un rol.",
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rol: "",
      }));
    }

    if (formIsValid) {
      try {
        await axios.post("http://localhost:3001/user/new", userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await axios.post(
          "http://localhost:3001/email/welcome",
          { to: userData.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Usuario creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserData({
          email: "",
          rol: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error creating user:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.",
        });
      }
    }
  };

  const isValidEmail = (email) => {
    // Esta es una validación de correo electrónico básica, se puede mejorar si es necesario
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span>Nuevo Usuario</span>
      </div>
      <div className={styles.body}>
        <div className={styles.inputContainer}>
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="Ingrese un correo electrónico"
            value={userData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email && styles.inputError}`}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.inputContainer}>
          <select
            name="rol"
            value={userData.rol}
            onChange={handleChange}
            className={`${styles.select} ${errors.rol && styles.inputError}`}
          >
            <option value="" disabled defaultValue>
              Rol
            </option>
            <option value="client">Cliente</option>
            <option value="admin">Admin</option>
          </select>
          {errors.rol && <p className={styles.error}>{errors.rol}</p>}
        </div>
        <button onClick={handleCreateUser} className={styles.createButton}>
          Crear Usuario
        </button>
      </div>
    </div>
  );
};

export default NewUser;
