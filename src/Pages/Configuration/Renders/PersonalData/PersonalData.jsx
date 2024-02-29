import styles from "./PersonalData.module.css";
import { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import axios from "axios";
import { MdOutlinePhotoCamera } from "react-icons/md";

const PersonalData = () => {
  // Obtener token de localStorage
  const token = localStorage.getItem("token");

  // Estado inicial del componente
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    profilePicture: "",
  });
  const [userInfoBackUp, setUserInfoBackUp] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    profilePicture: "",
  });
  const [emailError, setEmailError] = useState(false); //
  const [editablePhoto, setEditablePhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Función para manejar cambios en la imagen seleccionada
  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  // Función para cancelar la edición de la foto
  const handleCancelClickPhoto = () => {
    setEditablePhoto(false);
    setSelectedImage(null);
  };

  // Función para editar la foto
  const handleEditPhoto = () => {
    setEditablePhoto(true);
  };

  // Función para manejar cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleDetelePhoto = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      profilePicture: "",
    }));
  };

  const handleCancelEdit = () => {
    setUserInfo(userInfoBackUp);
  };
  // Función para validar el email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email.trim())) {
      setEmailError("Ingrese un correo electrónico válido");
    } else {
      setEmailError("");
    }
  };

  // Función para cargar los datos del usuario
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setUserInfoBackUp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Actualizar la foto de perfil si se seleccionó una nueva
    let updatedUserInfo = { ...userInfo };
    if (selectedImage) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", selectedImage);
      formDataCloudinary.append("upload_preset", "AUDITAR");

      try {
        const responseCloudinary = await axios.post(
          "https://api.cloudinary.com/v1_1/dhu3uii7o/image/upload",
          formDataCloudinary
        );
        const cloudinaryData = responseCloudinary.data;

        if (cloudinaryData.secure_url) {
          updatedUserInfo.profilePicture = cloudinaryData.secure_url;
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    // Enviar la información actualizada del usuario
    axios
      .put(`${import.meta.env.VITE_BACK_URL}/user/profile`, updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        setUserInfo(response.data); // Actualizar el estado con los datos actualizados
        setEditablePhoto(false); // Desactivar la edición de la foto
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <span>Datos Personales</span>
      </div>
      <div className={styles.body}>
        <div className={styles.leftContainer}>
          <span>Foto de perfil</span>
          <div className={styles.photoContainer}>
            {editablePhoto ? (
              <div className={styles.editablePhoto}>
                <div className={styles.fileInput}>
                  <Avatar width={200} height={200} onCrop={handleImageChange} />
                </div>
                <span onClick={handleCancelClickPhoto}>Cancelar</span>
              </div>
            ) : (
              <div className={styles.notEditablePhoto}>
                <div className={styles.imageContainer}>
                  {userInfo.profilePicture ? (
                    <img
                      src={userInfo.profilePicture}
                      alt="profile-picture"
                      className={styles.profilePicture}
                    />
                  ) : (
                    <div className={styles.notPicture}>
                      <div className={styles.iconContainer}>
                        <MdOutlinePhotoCamera className={styles.icon} />
                      </div>
                    </div>
                  )}
                </div>
                <span onClick={handleEditPhoto}>Editar foto de perfil</span>
                {userInfo.profilePicture && (
                  <span
                    onClick={handleDetelePhoto}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <span>Nombre</span>
            <input
              type="text"
              placeholder="Coloca tu nombre"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Apellido</span>
            <input
              type="text"
              placeholder="Coloca tu apellido"
              name="lastname"
              value={userInfo.lastname}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>Correo electrónico</span>
            <input
              type="email"
              placeholder="Coloca tu email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              onBlur={validateEmail}
              className={`${styles.input} ${emailError && styles.inputError}`}
            />
            {emailError && <span className={styles.error}>{emailError}</span>}
          </div>
          <div className={styles.inputContainer}>
            <span>Celular</span>
            <input
              type="text"
              placeholder="Coloca tu telefono celular"
              name="cellphone"
              value={userInfo.cellphone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Guardar
        </button>
        <span className={styles.cancelButton} onClick={handleCancelEdit}>
          Cancelar
        </span>
      </div>
    </div>
  );
};

export default PersonalData;
