import { useState, useEffect, useRef } from "react";
import styles from "./Quizz.module.css";
import { useSelector, useDispatch } from "react-redux";
import { BsSend } from "react-icons/bs";
import SignatureCanvas from "react-signature-canvas";
import { validateForm } from "./validation";
import Swal from "sweetalert2";
import loading from "../../assets/loading.gif";
import { setFormData, setPdfData } from "../../redux/actions";
import axios from "axios";
import { Document, Page, PDFViewer, pdf } from "@react-pdf/renderer";
import InspectionPdf from "../InspectionPdf/InspectionPdf";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const backUrl = import.meta.env.VITE_BACK_URL;
const token = localStorage.getItem("token");

const Quizz = () => {
  const dispatch = useDispatch();
  //STATES
  const inspection = useSelector((state) => state.pdfData);
  const category = useSelector((state) => state.category);
  const formData = useSelector((state) => state.formData);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [pdf1, setPdf1] = useState(null);
  const [days, setDays] = useState(null);
  const [error, setError] = useState();
  const [answers, setAnswers] = useState({
    data:
      category && category.form
        ? category.form.map((question) => ({
            answer: null,
            activeIndex: null,
            observation: "",
            negative: false,
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
  const mainContainerRef = useRef();

  useEffect(() => {
    setAnswers({
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
  const handleSaveDays = (e) => {
    setDays(e.target.value);
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

    const showSuccess = (text) => {
      Swal.fire({
        title: "¡Listo!",
        icon: "success",
        text: text,
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
      showSuccess("Las firmas se guardaron con exito.");
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

      let isNegative = false;
      if (answerIndex === 1) {
        isNegative = true;
      }

      if (currentAnswer.activeIndex === answerIndex) {
        updatedAnswers.data[questionIndex] = {
          ...currentAnswer,
          answer: null,
          activeIndex: null,
          negative: false,
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
          negative: isNegative,
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
            days: days,
          })
        );
        dispatch(
          setPdfData({
            companyName: formData.companyName,
            autorizationNumber: formData.companyAddress,
            fullname: formData.fullname,
            companyAddress: formData.companyAddress,
            identity: formData.identity,
            inspectionDate: formData.inspectionDate,
            inspectionTime: formData.inspectionTime,
            cellphone: formData.cellphone,
            email: formData.email,
            category: category,
            form: answers,
            inspectorSign1: signatures.inspectorSign1,
            inspectorSign2: signatures.inspectorSign2,
            ownerSign: signatures.ownerSign,
            days: days,
          })
        );
        const updatedFormData = {
          ...formData,
          form: JSON.stringify(answers),
          inspectorSign1: signatures.inspectorSign1,
          inspectorSign2: signatures.inspectorSign2,
          ownerSign: signatures.ownerSign,
          days: days,
        };
        console.log(updatedFormData);
        const response = await axios.post(
          `${backUrl}/inspection/new`,
          updatedFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          Swal.fire({
            title: "¡Listo!",
            icon: "success",
            text: "Inspección creada correctamente.",
          });
          setPdf1(null);
          setPdfBlob(null);
        } else {
          showError(
            "Hubo un problema al subir la inspección, intenta nuevamente."
          );
        }
      } catch (error) {
        console.error("Error al subir la inspección:", error);
        showError(
          "Hubo un problema al subir la inspección, intenta nuevamente."
        );
      }
    } else {
      setError(validationErrors);
      showError("Por favor, completa correctamente todos los campos.");
    }
  };

  const handlePdf = async () => {
    console.log(inspection);
    const MyDocument = <InspectionPdf inspection={inspection} />;
    const blob = await pdf(MyDocument).toBlob();
    setPdfBlob(blob);
  };
  const handleDownloadPdf = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inspection.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
        {category.form &&
          category.form.map((question, questionIndex) => (
            <div className={styles.questionContainer} key={question.pregunta}>
              <span className={styles.question}>{question.pregunta}</span>
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
                      placeholder="Ingrese las observaciones correspondientes."
                      value={answers?.data[questionIndex]?.observation}
                      onChange={(e) =>
                        handleObservationChange(questionIndex, e.target.value)
                      }
                    />
                  )}
                </div>
              )}
              {question.negative && answers.data[questionIndex]?.negative && (
                <div className={styles.negativeContainer}>
                  {question.negative.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
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
            value={days}
            name="days"
            onChange={handleSaveDays}
          />
          <span className={styles.footerSpan}>
            días para aplicar las medidas mencionadas en esta acta.
          </span>
        </div>
        <div className={styles.quizzButtons}>
          <button className={styles.sendButton} onClick={handlePdf}>
            <BsSend className={styles.icon} />
            Enviar correo
          </button>
          <button className={styles.saveButton} onClick={handleSubmit}>
            Finalizar
          </button>
          <button className={styles.saveButton} onClick={handleDownloadPdf}>
            DESCARGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizz;
