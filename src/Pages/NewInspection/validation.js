export const validateForm = (formData, identity2) => {
  const errors = {};

  // Validar companyName
  if (!formData.companyName.trim()) {
    errors.companyName = "El nombre de la empresa es requerido";
  }

  // Validar autorizationNumber
  if (!formData.autorizationNumber.trim()) {
    errors.autorizationNumber = "El número de autorización es requerido";
  }

  // Validar fullname
  if (!formData.fullname.trim()) {
    errors.fullname = "El nombre completo es requerido";
  }

  // Validar companyAddress
  if (!formData.companyAddress.trim()) {
    errors.companyAddress = "La dirección de la empresa es requerida";
  }

  // Validar inspectionDate
  if (!formData.inspectionDate.trim()) {
    errors.inspectionDate = "La fecha de inspección es requerida";
  }

  // Validar inspectionTime
  if (!formData.inspectionTime.trim()) {
    errors.inspectionTime = "La hora de inspección es requerida";
  }

  // Validar cellphone
  if (!formData.cellphone.trim()) {
    errors.cellphone = "El número de teléfono es requerido";
  }

  // Validar email
  if (!formData.email.trim()) {
    errors.email = "El correo electrónico es requerido";
  } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
    errors.email = "El correo electrónico es inválido";
  }

  if (!identity2.number) {
    errors.number = "El numero de documento es requerido";
  }

  if (!identity2.type) {
    errors.type = "El tipo de documento es requerido";
  }

  return errors;
};
