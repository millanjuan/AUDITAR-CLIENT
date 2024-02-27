import axios from 'axios';
import swal from "sweetalert";

//Función para registrar un usuario
export  async function register({username, email, password}) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/user/register`, { username, email, password });

      if (response.status === 200) {        
        swal({
          title: "¡Registro exitoso!",
          text: "Now login and book your next PREET",
          icon: "success",
          button: null,
        });
      }
    } catch (error) {
      swal({
        title: "Email already registered",
        text: "Login and start searching your next hotel",
        icon: "warning",
        button: null,
      });
      throw error;
    }
}

export async function login(username, password) {
  try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/user/login`, { username, password });
      if (response.status === 200 && response.data.token && response.data.user && response.data.user.rol) {
          const expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + 7200); // 2 horas de expiración
          localStorage.setItem('token', response.data.token );
          localStorage.setItem(expirationDate, expirationDate.getTime()); // Guardar la fecha de expiración en milisegundos

          localStorage.setItem('rol', response.data.user.rol);

          // Establecer temporizador para la alerta de expiración
          const alertTime = new Date(expirationDate.getTime() - 60000); // Mostrar alerta 1 minuto antes de la expiración
          setTimeout(() => {
              swal("Alerta", "Tu sesión está a punto de expirar. Por favor, cierra sesión si has terminado.", "warning");
          }, alertTime.getTime() - Date.now());

          return { token: response.data.token, rol: response.data.user.rol };
      } else if (response.status === 200 && response.data.message) {
          return {message: response.data.message};
      }
       else {
          throw new Error(response.data.message || 'Error de inicio de sesión');
      }
  } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
  }
}