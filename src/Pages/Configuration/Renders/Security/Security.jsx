import styles from "./Security.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Security = () => {
  const token = localStorage.getItem("token");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    password2: "",
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
      [name]: "", // Limpiar el error cuando se realiza un cambio en el campo
    }));
    if (name === "password2") {
      // Verificar si las contraseñas coinciden
      setPasswordMatch(value === userData.password);
    }
  };

  const handleSubmit = () => {
    // Validar que las contraseñas coincidan
    if (userData.password !== userData.password2) {
      setErrors({
        password2: "Las contraseñas no coinciden, revise nuevamente",
      });
      return;
    } else {
      setPasswordMatch(true);
    }

    // Filtrar solo los campos que el usuario haya modificado
    const updatedUserData = {};
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== "" && userData[key] !== null) {
        updatedUserData[key] = userData[key];
        console.log(updatedUserData);
        try {
          axios
            .put(
              `${import.meta.env.VITE_BACK_URL}/user/profile`,
              updatedUserData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating user information:", error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Función para cargar los datos del usuario
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData({
          username: response.data.username,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span>Seguridad</span>
      </div>
      <div className={styles.body}>
        <div className={styles.inputContainer}>
          <span>Usuario</span>
          <input
            type="text"
            placeholder="Coloca tu nuevo usuario"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Contraseña</span>
          <input
            type="password"
            placeholder="Escribe tu contraseña"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.password2 && styles.inputError
            } ${passwordMatch && styles.inputMatch}`}
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Confirmar contraseña</span>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            name="password2"
            value={userData.password2}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.password2 && styles.inputError
            } ${passwordMatch && styles.inputMatch}`}
          />
          {errors.password2 && (
            <p className={styles.error}>{errors.password2}</p>
          )}
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default Security;
