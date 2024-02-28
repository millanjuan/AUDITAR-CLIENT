import { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/logoRegister.png";
import { validateRegister } from "./validation";
import {register} from "../../utils/Auth/Auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [password2, setPassword2] = useState("")
  const [errors, setErrors] = useState({});
  //Handle Functions
  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    };

    const handlePasswordChange = (e) => {
      const {value} = e.target;
      setPassword2(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    const handleRegister = async () => {
      const validationErrors = validateRegister(registerData, password2);
      if (Object.keys(validationErrors).length === 0) {
        try {
          const data = await register(registerData);
          navigate("/inicio", data);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setErrors(validationErrors);
      }
    };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
        <img src={logo} alt="logo" className={styles.logo}/>
        <h2 className={styles.title}>Registrarse</h2>
        </div>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <span>Usuario</span>
            <input 
            type="text" 
            placeholder="Escribe tu usuario"
            name="username"
            value={registerData.username}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.username && styles.inputError
            }`}
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>
          <div className={styles.inputContainer}>
            <span>Correo electrónico</span>
            <input 
            type="email" 
            placeholder="Escribe tu correo"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.email && styles.inputError
            }`}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputContainer}>
            <span>Contraseña</span>
            <input 
            type="password" 
            placeholder="Escribe tu contraseña"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            className={`${styles.input} ${
              errors.password1 && styles.inputError
            }`}
            />
            {errors.password1 && <p className={styles.error}>{errors.password1}</p>}
          </div>
          <div className={styles.inputContainer}>
            <span>Confirmar contraseña</span>
            <input 
            type="password" 
            placeholder="Confirma tu contraseña"
            name="password2"
            value={password2}
            onChange={handlePasswordChange}
            className={`${styles.input} ${
              errors.password2 && styles.inputError
            }`}
            />
            {errors.password2 && <p className={styles.error}>{errors.password2}</p>}
          </div>
          <button 
          type="button" 
          onClick={handleRegister}
          className={styles.button}
          >
            Registrarse
          </button>
          <div className={styles.footer}>
            <p>Ya tienes cuenta?</p>
            <Link to="/ingresar" className={styles.link}>
              <p>Iniciar sesión</p>
            </Link>
          </div>
        </form>

      </div>
      
    </div>
  )
}

export default Register;