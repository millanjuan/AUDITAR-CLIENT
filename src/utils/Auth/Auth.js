import axios from 'axios';
import swal from "sweetalert";

//Función para registrar un usuario
export  async function register({username, email, password}) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/users/register`, { username, email, password });

      if (response.status === 200) {        
        swal({
          title: "¡Succesfully registered!",
          text: "Now login and book your next PREET",
          icon: "success",
          button: null,
        });
        return response.data.token;
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