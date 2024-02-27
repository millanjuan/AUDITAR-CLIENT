import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { useState } from "react"
import logo from "../../assets/logoRegister.png";
import { login } from "../../utils/Auth/Auth";


const Login = () => {
  //Utils
  const navigate = useNavigate()

  //Local states
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  })

  //Handle functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("")
  };

  const handleLogin = async () => {
    try {
      const data = await login(userData.user, userData.password);
      if (!data || data.error) {
        setError("Usuario o contraseña incorrectos.");
      } else {
        navigate(data.rol === "admin" ? "/dashboard" : "/home");
      }
    } catch (error) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <img src={logo} alt="logo" className={styles.logo}/>
          <h2 className={styles.title}>Iniciar Sesión</h2>
        </div>
        <form className={styles.form}>
          <div className={styles.inputs}>
          <div className={styles.inputContainer}>
          <span>Usuario</span>
          <input
           type="text"
           placeholder="Coloca tu usuario" 
           name="user"
           value={userData.user}
           onChange={handleChange}
           className={`${styles.input} ${error && styles.error}`}
           />

        </div>
        <div className={styles.inputContainer}>
          <span>Contraseña</span>
          <input 
          type="password" 
          placeholder="Coloca tu contraseña"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className={`${styles.input} ${error && styles.error}`}
          />
        </div>
          </div>
        {error && <span className={styles.error}>{error}</span>}
        <button 
          type="button" 
          className={styles.button}
          onClick={handleLogin}
          >
            Ingresar
          </button>
      </form>
      </div>
    </div>
  )
}

export default Login;