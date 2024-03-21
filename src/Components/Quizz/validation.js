export const validateForm = (answers, signatures, category) => {
  // Verificar si la categoría es "Inspección de Habilitación" o "Fábrica de alimentos"
  const isSpecialCategory =
    category &&
    (category.name === "Inspección de Habilitación" ||
      category.name === "Fábrica de alimentos");

  if (isSpecialCategory) {
    // Validar que las firmas estén completas
    const signaturesCompleted =
      signatures.inspectorSign1.includes("cloudinary") &&
      signatures.ownerSign.includes("cloudinary");

    if (!signaturesCompleted) {
      return "Por favor completa las firmas.";
    }

    return ""; // Retornar un string vacío para categorías especiales
  }

  // Validar que al menos una pregunta tenga respuesta y observación
  const questionWithAnswerAndObservation = answers.data.some(
    (question) => question.answer !== null && question.observation.trim() !== ""
  );

  // Validar que haya al menos una respuesta en el formulario
  const atLeastOneAnswer = answers.data.some(
    (question) => question.answer !== null
  );

  if (!questionWithAnswerAndObservation || !atLeastOneAnswer) {
    return "Por favor completa todos los campos.";
  }

  // Validar que las firmas estén completas
  const signaturesCompleted =
    signatures.inspectorSign1.includes("cloudinary") &&
    signatures.ownerSign.includes("cloudinary");

  if (!signaturesCompleted) {
    return "Por favor completa las firmas.";
  }

  return ""; // No hay errores
};
