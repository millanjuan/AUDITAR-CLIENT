import styles from "./NewInspection.module.css";
import { useState, useEffect } from "react";
import Quizz from "../../Components/Quizz/Quizz";
import Category from "../../Components/Category/Category";
import { setFormData } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { validateForm } from "./validation";
import { useSelector } from "react-redux";
import { setInspectionState } from "../../redux/actions";

const form = "form";
const category = "category";
const quizz = "quizz";

const NewInspection = () => {
  const categoryName = useSelector((state) => state.category.name);
  const dispatch = useDispatch();
  const inspectionState = useSelector((state) => state.inspectionState);
  const [identity2, setIdentity2] = useState({
    type: "",
    number: "",
  });
  const [formInfo, setFormInfo] = useState({
    companyName: "",
    autorizationNumber: "",
    fullname: "",
    companyAddress: "",
    identity: "",
    inspectionDate: "",
    inspectionTime: "",
    cellphone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(setInspectionState("form"));
  }, [dispatch]);

  const handleSetState = (value) => {
    dispatch(setInspectionState(value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleIdentityChange = (e) => {
    const { name, value } = e.target;
    setIdentity2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmitForm = () => {
    const validateErrors = validateForm(formInfo, identity2);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      console.log(errors);
      return;
    }
    dispatch(
      setFormData({
        ...formInfo,
        identity: `${identity2.type} ${identity2.number}`,
      })
    );
    dispatch(setInspectionState(category));
  };

  const renderContent = (option) => {
    switch (option) {
      case form:
        return (
          <div className={styles.container}>
            <div className={styles.navigation}>
              <Link className={styles.link} to="/inicio">
                Inicio
              </Link>
              <IoIosArrowForward className={styles.icon} />
              <span>Nueva Inspección</span>
            </div>
            <div className={styles.header}>
              <span className={styles.title}>Formulario</span>
              <span className={styles.subtitle}>
                Completar los siguientes datos
              </span>
            </div>
            <div className={styles.formContainer}>
              <form className={styles.form}>
                <div className={styles.leftForm}>
                  <div className={styles.inputContainer}>
                    <span>Nombre del comercio</span>
                    <input
                      type="text"
                      placeholder="Comercio"
                      name="companyName"
                      className={`${styles.input} ${
                        errors.companyName && styles.inputError
                      }`}
                      value={formInfo.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && (
                      <p className={styles.errors}>{errors.companyName}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>N° de habilitación</span>
                    <input
                      type="text"
                      placeholder="Número"
                      name="autorizationNumber"
                      className={`${styles.input} ${
                        errors.autorizationNumber && styles.inputError
                      }`}
                      value={formInfo.autorizationNumber}
                      onChange={handleChange}
                    />
                    {errors.autorizationNumber && (
                      <p className={styles.errors}>
                        {errors.autorizationNumber}
                      </p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Nombre y apellido del titular</span>
                    <input
                      type="text"
                      placeholder="Nombre y apellido"
                      name="fullname"
                      className={`${styles.input} ${
                        errors.fullname && styles.inputError
                      }`}
                      value={formInfo.fullname}
                      onChange={handleChange}
                    />
                    {errors.fullname && (
                      <p className={styles.errors}>{errors.fullname}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Domicilio del comercio</span>
                    <input
                      type="text"
                      placeholder="Domicilio"
                      name="companyAddress"
                      className={`${styles.input} ${
                        errors.companyAddress && styles.inputError
                      }`}
                      value={formInfo.companyAddress}
                      onChange={handleChange}
                    />
                    {errors.companyAddress && (
                      <p className={styles.errors}>{errors.companyAddress}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Tipo y número de documento</span>
                    <div className={styles.identityContainer}>
                      <select
                        className={`${styles.select} ${
                          errors.type && styles.inputError
                        }`}
                        value={identity2.type}
                        name="type"
                        onChange={handleIdentityChange}
                      >
                        {" "}
                        <option value="" disabled defaultValue>
                          Tipo
                        </option>
                        <option value="DNI">DNI</option>
                        <option value="CUIL">CUIL</option>
                        <option value="CUIT">CUIT</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Número"
                        name="number"
                        className={`${styles.input2} ${
                          errors.number && styles.inputError
                        }`}
                        value={identity2.number}
                        onChange={handleIdentityChange}
                      />
                    </div>
                    {errors.type && (
                      <p className={styles.errors}>{errors.type}</p>
                    )}
                    {errors.number && (
                      <p className={styles.errors}>{errors.number}</p>
                    )}
                  </div>
                </div>
                <div className={styles.rightForm}>
                  <div className={styles.inputContainer}>
                    <span>Fecha</span>
                    <input
                      type="date"
                      className={`${styles.input} ${
                        errors.inspectionDate && styles.inputError
                      }`}
                      placeholder="Fecha"
                      name="inspectionDate"
                      value={formInfo.inspectionDate}
                      onChange={handleChange}
                    />
                    {errors.inspectionDate && (
                      <p className={styles.errors}>{errors.inspectionDate}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Hora</span>
                    <input
                      type="time"
                      placeholder="Hora"
                      name="inspectionTime"
                      className={`${styles.input} ${
                        errors.inspectionTime && styles.inputError
                      }`}
                      value={formInfo.inspectionTime}
                      onChange={handleChange}
                    />
                    {errors.inspectionTime && (
                      <p className={styles.errors}>{errors.inspectionTime}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Celular</span>
                    <input
                      type="text"
                      placeholder="Celular"
                      name="cellphone"
                      className={`${styles.input} ${
                        errors.cellphone && styles.inputError
                      }`}
                      value={formInfo.cellphone}
                      onChange={handleChange}
                    />
                    {errors.cellphone && (
                      <p className={styles.errors}>{errors.cellphone}</p>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <span>Correo Electrónico</span>
                    <input
                      type="email"
                      placeholder="Correo"
                      name="email"
                      className={`${styles.input} ${
                        errors.email && styles.inputError
                      }`}
                      value={formInfo.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className={styles.errors}>{errors.email}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className={styles.formButtonContainer}>
              <button
                type="submit"
                className={styles.button}
                onClick={handleSubmitForm}
              >
                Continuar
              </button>
            </div>
          </div>
        );

      case category:
        return (
          <div className={styles.renderFunctionDiv}>
            <div className={styles.navigation}>
              <Link className={styles.link} to="/inicio">
                Inicio
              </Link>
              <IoIosArrowForward className={styles.icon} />
              <span
                className={styles.navSpan}
                onClick={() => handleSetState(form)}
              >
                Nueva Inspección
              </span>
              <IoIosArrowForward className={styles.icon} />
              <span>Rubros</span>
            </div>
            <Category />
          </div>
        );

      case quizz:
        return (
          <div className={styles.renderFunctionDiv}>
            <div className={styles.navigation}>
              <Link className={styles.link} to="/inicio">
                Inicio
              </Link>
              <IoIosArrowForward className={styles.icon} />
              <span
                className={styles.navSpan}
                onClick={() => handleSetState(form)}
              >
                Nueva Inspección
              </span>
              <IoIosArrowForward className={styles.icon} />
              <span
                className={styles.navSpan}
                onClick={() => handleSetState(category)}
              >
                Rubros
              </span>
              <IoIosArrowForward className={styles.icon} />
              <span>Inspección: {categoryName}</span>
            </div>
            <Quizz />
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.render}>{renderContent(inspectionState)}</div>
    </div>
  );
};

export default NewInspection;
