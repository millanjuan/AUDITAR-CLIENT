import { useState, useEffect, useRef } from "react";
import styles from "./Quizz.module.css";
import { useSelector, useDispatch } from "react-redux";
import { BsSend } from "react-icons/bs";
import SignatureCanvas from "react-signature-canvas";
import { validateForm } from "./validation";
import Swal from "sweetalert2";
import loading from "../../assets/loading.gif";
import { setFormData } from "../../redux/actions";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

const Quizz = () => {
  const dispatch = useDispatch();
  //STATES
  const category = useSelector((state) => state.category);
  console.log(category);
  const formData = useSelector((state) => state.formData);
  const [days, setDays] = useState("");
  const [error, setError] = useState();
  const [answers, setAnswers] = useState({
    formId: category && category.id,
    data:
      category && category.form
        ? category.form.map((question) => ({
            answer: null,
            activeIndex: null,
            observation: "",
          }))
        : [],
  });
  const [signatures, setSignatures] = useState({
    inspectorSign1: "",
    inspectorSign2: null,
    ownerSign: "",
  });
  const inspectorSign1Ref = useRef();
  const inspectorSign2Ref = useRef();
  const ownerSignRef = useRef();

  useEffect(() => {
    setAnswers({
      formId: category && category.id,
      data:
        category && category.form
          ? category.form.map((question) => ({
              answer: null,
              activeIndex: null,
              observation: "",
            }))
          : [],
    });
  }, [category]);

  //HANDLE FUNCTIONS
  const handleSaveDays = (number) => {
    setDays(number);
  };

  const handleSaveSignatures = async () => {
    const showError = (message) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    };

    const showLoading = () => {
      Swal.fire({
        title: "Subiendo firmas...",
        html: `<img src=${loading} style="width: 50px; height: 50px;" />`,
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    };

    const showSuccess = () => {
      Swal.fire({
        title: "¡Listo!",
        icon: "success",
        text: "Las firmas se guardaron con éxito.",
      });
    };

    const uploadSignatureToCloudinary = async (signatureKey, signatureRef) => {
      if (!signatureRef.current || signatureRef.current.isEmpty()) {
        return;
      }

      const signatureDataUrl = signatureRef.current.toDataURL();

      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", signatureDataUrl);
      formDataCloudinary.append("upload_preset", cloudinaryUploadPreset);

      const responseCloudinary = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formDataCloudinary,
        }
      );

      const cloudinaryData = await responseCloudinary.json();
      setSignatures((prevState) => ({
        ...prevState,
        [signatureKey]: cloudinaryData.secure_url,
      }));
    };
    console.log(signatures);

    if (!inspectorSign1Ref.current || !ownerSignRef.current) {
      showError("Por favor completa las firmas obligatorias");
      return;
    }

    showLoading();

    try {
      await Promise.all([
        uploadSignatureToCloudinary("inspectorSign1", inspectorSign1Ref),
        uploadSignatureToCloudinary("inspectorSign2", inspectorSign2Ref),
        uploadSignatureToCloudinary("ownerSign", ownerSignRef),
      ]);

      Swal.close();
      showSuccess();
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      showError(
        "Hubo un error al guardar las firmas. Por favor intenta de nuevo."
      );
    }
  };

  const handleAnswerClick = (questionIndex, answerIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      const currentAnswer = updatedAnswers.data[questionIndex];

      if (!currentAnswer) return;

      if (currentAnswer.activeIndex === answerIndex) {
        updatedAnswers.data[questionIndex] = {
          ...currentAnswer,
          answer: null,
          activeIndex: null,
        };
      } else {
        if (currentAnswer.activeIndex !== null) {
          updatedAnswers.data[questionIndex] = {
            ...currentAnswer,
            activeIndex: null,
          };
        }

        updatedAnswers.data[questionIndex] = {
          ...currentAnswer,
          answer: answerIndex,
          activeIndex: answerIndex,
        };
      }
      return updatedAnswers;
    });
  };

  const handleObservationChange = (questionIndex, observationText) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      updatedAnswers.data[questionIndex] = {
        ...updatedAnswers.data[questionIndex],
        observation: observationText,
      };
      return updatedAnswers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const showError = (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    };
    const validationErrors = validateForm(answers, signatures);
    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(
          setFormData({
            ...formData,
            form: answers,
            inspectorSign1: signatures.inspectorSign1,
            inspectorSign2: signatures.inspectorSign2,
            ownerSign: signatures.ownerSign,
          })
        );
        console.log(formData);
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
      }
    } else {
      setError(validationErrors);
      showError(error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span className={styles.title}>Inspección</span>
        <span className={styles.subtitle}>{category.name}</span>
        <img
          src={category.image}
          className={`${styles.headerImage} ${styles[`imagen${category.id}`]}`}
          alt="image"
        />
        <span className={styles.headerAlert}>IMPORTANTE</span>
        <p className={styles.statement}>{category.statement}</p>
      </div>
      <div className={styles.body}>
        <div>
          {category.form.negative &&
            category.form.negative
              .split("\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        {category.form &&
          category.form.map((question, questionIndex) => (
            <div className={styles.questionContainer} key={question.pregunta}>
              <span className={styles.question}>{question.pregunta}</span>
              {question.negative && (
                <div className={styles.negative}>
                  {question.negative.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              {question.puntos && (
                <ul className={styles.points}>
                  {question.puntos.map((point, pointIndex) => (
                    <li key={point} className={styles.point}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              <div className={styles.buttonsContainer}>
                {question.respuestas &&
                  Array.isArray(question.respuestas) &&
                  question.respuestas.map((respuesta, answerIndex) => (
                    <button
                      key={respuesta}
                      className={`${styles.button} ${
                        answers?.data[questionIndex]?.activeIndex ===
                        answerIndex
                          ? styles.active
                          : ""
                      } ${
                        answerIndex === 0
                          ? styles.greenButton
                          : answerIndex === 1
                          ? styles.redButton
                          : answerIndex === 2
                          ? styles.blueButton
                          : styles.altButton
                      }`}
                      onClick={() =>
                        handleAnswerClick(questionIndex, answerIndex)
                      }
                    >
                      {respuesta}
                    </button>
                  ))}
              </div>
              {question.observacion && (
                <div className={styles.observation}>
                  <span className={styles.observationSpan}>
                    {question.observacion}
                  </span>
                  {question.observacion ===
                  "Cantidad de identificaciones vigentes:" ? (
                    <input
                      type="text"
                      className={styles.inputIdentity}
                      placeholder="Ingrese la cantidad"
                      value={answers?.data[questionIndex]?.observation}
                      onChange={(e) =>
                        handleObservationChange(questionIndex, e.target.value)
                      }
                    />
                  ) : (
                    <textarea
                      type="text"
                      className={styles.textArea}
                      placeholder="Ingrese las observaciones correspondientes"
                      value={answers?.data[questionIndex]?.observation}
                      onChange={(e) =>
                        handleObservationChange(questionIndex, e.target.value)
                      }
                    />
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.footerText}>
          Atención: Tanto el inspector designado como el titular del comercio
          deberán colocar su firma de manera electrónica para finalizar el
          procedimiento.
        </span>
        <div className={styles.signs}>
          <div className={styles.inspectorSigns}>
            <div className={styles.signContainer}>
              <span className={styles.signTitle}>
                Firma del inspector designado (*)
              </span>
              <div className={styles.padContainer}>
                <SignatureCanvas
                  ref={inspectorSign1Ref}
                  canvasProps={{
                    width: 400,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
                <button
                  onClick={() => inspectorSign1Ref.current.clear()}
                  className={styles.clearButton}
                >
                  Limpiar
                </button>
              </div>
            </div>
            <div className={styles.signContainer}>
              <span className={styles.signTitle}>
                Firma del inspector designado Nº2
              </span>
              <div className={styles.padContainer}>
                <SignatureCanvas
                  ref={inspectorSign2Ref}
                  canvasProps={{
                    width: 400,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
                <button
                  onClick={() => inspectorSign2Ref.current.clear()}
                  className={styles.clearButton}
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
          <div className={styles.ownerSignContainer}>
            <div className={styles.signContainer}>
              <span className={styles.signTitle}>
                Firma del titular del comercio (*)
              </span>
              <div className={styles.padContainer2}>
                <SignatureCanvas
                  ref={ownerSignRef}
                  canvasProps={{
                    width: 400,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
                <button
                  onClick={() => ownerSignRef.current.clear()}
                  className={styles.clearButton}
                >
                  Limpiar
                </button>
                <button
                  onClick={handleSaveSignatures}
                  className={styles.saveSigns}
                >
                  Guardar Firmas
                </button>
              </div>
            </div>
          </div>
        </div>
        <span className={styles.footerSpan}>
          Este control se llevó a cabo conforme a lo establecido por art. 14 de
          la ley 18.284 y por lo estipulado en el Código Alimentario Argentino.
        </span>
        <div className={styles.finalText}>
          <span className={styles.footerSpan}>Se establece un plazo de </span>
          <input
            type="text"
            className={styles.finalInput}
            name="days"
            onChange={handleSaveDays}
          />
          <span className={styles.footerSpan}>
            días para aplicar las medidas mencionadas en esta acta.
          </span>
        </div>
        <div className={styles.quizzButtons}>
          <button className={styles.sendButton}>
            <BsSend className={styles.icon} />
            Enviar correo
          </button>
          <button className={styles.saveButton} onClick={handleSubmit}>
            Guardar y salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizz;
