// Función para validar los datos del formulario de registro
export const validateRegister = (registerData, password2) => {
    const errors = {};
  
  
    // Validar si el campo de usuario está vacío
    if (!registerData.username.trim()) {
      errors.username = "El nombre de usuario es requerido";
    }

    if (registerData.username.length < 6 && registerData.username.length === 1 || registerData.username.length > 20) {
      errors.username = "Debe contener ente 6 y 20 caracteres"
    }
  
    // Validar si el campo de correo electrónico está vacío
    if (!registerData.email.trim()) {
      errors.email = "El correo electrónico es requerido";
    }
  
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }
  
    // Validar si el campo de contraseña está vacío
    if (!registerData.password.trim()) {
      errors.password = "La contraseña es requerida";
    }

    if (registerData.password !== password2) {
      errors.password = "Las contraseñas deben ser iguales"
    }
  
    return errors;
  };