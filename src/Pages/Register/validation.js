// Función para validar los datos del formulario de registro
export const validateRegister = (registerData, password) => {
    const errors = {};
  
    // Validar si las contraseñas coinciden
    if (password.password1 !== password.password2) {
      errors.password2 = "Las contraseñas no coinciden";
    }
  
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
    if (!password.password1.trim()) {
      errors.password1 = "La contraseña es requerida";
    }
  
    return errors;
  };