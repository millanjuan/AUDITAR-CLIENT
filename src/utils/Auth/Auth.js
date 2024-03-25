import axios from "axios";
import swal from "sweetalert";

//Función para registrar un usuario
export async function register({ username, email, password }) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACK_URL}/user/register`,
      { username, email, password }
    );
    console.log(response);

    if (
      response.status === 200 &&
      response.data.token &&
      response.data.user &&
      response.data.user.rol
    ) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expirationTime", response.data.expirationTime);

      // Establecer temporizador para la alerta de expiración
      const alertTime = new Date(response.data.expirationTime - 60000); // Mostrar alerta 1 minuto antes de la expiración
      setTimeout(() => {
        swal(
          "Alerta",
          "Tu sesión está a punto de expirar. Por favor, cierra sesión si has terminado.",
          "warning"
        );
      }, alertTime.getTime() - Date.now());

      return { token: response.data.token, rol: response.data.user.rol };
    } else if (response.status === 200 && response.data.message) {
      return { message: response.data.message };
    } else {
      throw new Error(response.data.message || "Error de registro");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACK_URL}/user/login`,
      { username, password }
    );
    if (
      response.status === 200 &&
      response.data.token &&
      response.data.user &&
      response.data.user.rol
    ) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expirationTime", response.data.expirationTime);

      // Establecer temporizador para la alerta de expiración
      const expirationTime = new Date(response.data.expirationTime);

      // Calcular el tiempo restante en milisegundos
      const expiresIn = expirationTime.getTime() - Date.now();

      // Calcular el tiempo para mostrar la alerta (1 minuto antes de la expiración)
      const alertTime = expiresIn - 60000;
      setTimeout(() => {
        swal(
          "Alerta",
          "Tu sesión está a punto de expirar. Por favor, cierra sesión si has terminado.",
          "warning"
        );
      }, alertTime);

      return { token: response.data.token, rol: response.data.user.rol };
    } else if (response.status === 200 && response.data.message) {
      return { message: response.data.message };
    } else {
      throw new Error(response.data.message || "Error de inicio de sesión");
    }
  } catch (error) {
    console.error("Error de inicio de sesión:", error.message);
    throw error;
  }
}
