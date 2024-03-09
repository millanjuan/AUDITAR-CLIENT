export const validateForm = (answers, signatures) => {
  // Validar que todas las preguntas estén respondidas
  const allQuestionsAnswered = answers.data.every(
    (question) => question.answer !== null || question.observation.trim() !== ""
  );

  // Validar que las firmas estén completas
  const signaturesCompleted =
    signatures.inspectorSign1.includes("cloudinary") &&
    signatures.ownerSign.includes("cloudinary");

  if (!allQuestionsAnswered || !signaturesCompleted) {
    return "Por favor completa todos los campos.";
  }

  return ""; // No hay errores
};
