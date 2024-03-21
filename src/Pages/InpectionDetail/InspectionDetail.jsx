import styles from "./InspectionDetail.module.css";
import { getInspectionById } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import loading from "../../assets/loading3.gif";
import InspectionPdf from "../../Components/InspectionPdf/InspectionPdf";
import { pdf } from "@react-pdf/renderer";

const backUrl = import.meta.env.VITE_BACK_URL;

const InspectionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const inspection = useSelector((state) => state.inspectionDetail);
  console.log(inspection);
  const user = useSelector((state) => state.userData);

  const userData = {
    clientEmail: user.email,
    cellphone: user.cellphone,
    ownerEmail: inspection.email,
    pdf: null,
  };

  useEffect(() => {
    dispatch(getInspectionById(id, token));
  }, [id, token, dispatch]);

  const handleExit = () => {
    navigate("/historial");
  };

  const showError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
    });
  };

  const showLoading = (text) => {
    Swal.fire({
      title: text,
      html: `<img src=${loading} style="width: 50px; height: 50px;" />`,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };

  const handlePdf = async () => {
    const MyDocument = <InspectionPdf inspection={inspection} />;
    const blob = await pdf(MyDocument).toBlob();
    const reader = new FileReader();
    reader.onload = async function () {
      const base64String = reader.result.split(",")[1];
      // Enviar la cadena base64 al backend
      showLoading("Enviando email...");
      try {
        const response = await axios.post(
          `${backUrl}/email/inspection`,
          { ...userData, pdf: base64String },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          Swal.close();
          Swal.fire({
            title: "¡Listo!",
            icon: "success",
            text: "Correo electrónico enviado con éxito.",
          });
        } else {
          Swal.close();
          showError("Hubo un problema, intenta nuevamente.");
        }
      } catch (error) {
        console.error("Error al enviar el email:", error);
        Swal.close();
        showError("Hubo un problema, intenta nuevamente.");
      }
    };

    reader.readAsDataURL(blob);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navigation}>
        <Link className={styles.link} to="/historial">
          Historial
        </Link>
        <IoIosArrowForward className={styles.icon2} />
        <span>Formularios completos</span>
      </div>
      <span className={styles.title}>Historial</span>
      <span className={styles.subtitle}>Formularios completos</span>
      <div className={styles.dataContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.inputContainer}>
            <span>Nombre del comercio</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.companyName}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>N° de habilitación</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.autorizationNumber}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Titular</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.fullname}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Domicilio del comercio</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.companyAddress}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Tipo y número de documento</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.identity}
            />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.inputContainer}>
            <span>Fecha</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.inspectionDate}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Hora</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.inspectionTime}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Celular</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.cellphone}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Correo electrónico</span>
            <input
              type="text"
              className={styles.input}
              value={inspection.email}
            />
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <span className={styles.categoryTitle}>
            {inspection.category && inspection.category.name}
          </span>
          <img
            src={inspection.category && inspection.category.image}
            alt="categoryImage"
            className={styles.categoryImage}
          />
          <span className={styles.headerAlert}>IMPORTANTE</span>
          <p className={styles.categoryStatement}>
            {inspection.category && inspection.category.statement}
          </p>
        </div>
        <div className={styles.body}>
          {inspection.category &&
            inspection.category.form.map((question, questionIndex) => (
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
                          answerIndex ===
                          inspection.form.data[questionIndex].answer
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
                        value={inspection.form.data[questionIndex].observation}
                        readOnly
                      />
                    ) : (
                      <textarea
                        type="text"
                        className={styles.textArea}
                        placeholder="Ingrese las observaciones correspondientes."
                        value={inspection.form.data[questionIndex].observation}
                        readOnly
                      />
                    )}
                  </div>
                )}
                {question.negative &&
                  inspection.form.data[questionIndex]?.negative === true && (
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
                  Firma del inspector designado
                </span>
                <img
                  src={inspection.inspectorSign1}
                  className={styles.sign}
                  alt="inspectorSign1"
                />
              </div>
              {inspection.inspectorSign2 && (
                <div className={styles.signContainer}>
                  <span className={styles.signTitle}>
                    Firma del inspector designado Nº2
                  </span>
                  {inspection.inspectorSign2 && (
                    <img
                      src={inspection.sign}
                      alt="inpectorSign2"
                      className={styles.inspectorSign2}
                    />
                  )}
                </div>
              )}
            </div>
            <div className={styles.ownerSignContainer}>
              <div className={styles.signContainer}>
                <span className={styles.signTitle}>
                  Firma del titular del comercio
                </span>
                <img
                  src={inspection.ownerSign}
                  alt="ownerSign"
                  className={styles.sign}
                />
              </div>
            </div>
          </div>
          <span className={styles.footerSpan}>
            Este control se llevó a cabo conforme a lo establecido por art. 14
            de la ley 18.284 y por lo estipulado en el Código Alimentario
            Argentino.
          </span>
          <div className={styles.finalText}>
            <span className={styles.footerSpan}>Se establece un plazo de </span>
            <input
              type="text"
              className={styles.finalInput}
              value={inspection.days ? inspection.days : null}
              readOnly
            />
            <span className={styles.footerSpan}>
              días para aplicar las medidas mencionadas en esta acta.
            </span>
          </div>
          <div className={styles.quizzButtons}>
            <button className={styles.sendButton} onClick={handlePdf}>
              <BsSend className={styles.icon} />
              Reenviar correo
            </button>
            <button className={styles.exitButton} onClick={handleExit}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetail;
