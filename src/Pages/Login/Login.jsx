import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux";


const Login = () => {
  //Utils
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Local states
  const [errors, setErrors] = useState({});
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };


  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      <form>
        <div className={styles.inputContainer}>
          <span>Usuario</span>
          <input
           type="text"
           placeholder="Coloca tu usuario" 
           name="user"
           />

          <input 
          type="text" 
          placeholder="Coloca tu contraseña"
          name="password"
          />
        </div>

      </form>
    </div>
  )
}

export default Login