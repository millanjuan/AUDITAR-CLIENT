import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
// Components
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import NewInspection from "./Pages/NewInspection/NewInspection";
import Login from "./Pages/Login/Login";
import Configuration from "./Pages/Configuration/Configuration";
import Header from "./Components/Header/Header";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Footer from "./Components/Footer/Footer";
import swal from "sweetalert";
import Loading from "./Components/Loading/Loading";
import InspectionHistory from "./Pages/InspectionHistory/InspectionHistory";
import InspectionDetail from "./Pages/InpectionDetail/InspectionDetail";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const unauthenticatedRoutes = ["/", "/registrarse", "/ingresar"];

  useEffect(() => {
    if (
      !isAuthenticated &&
      !unauthenticatedRoutes.includes(location.pathname)
    ) {
      setShowAccessDenied(true);
    }
  }, [isAuthenticated, location.pathname, unauthenticatedRoutes]);

  const handleCloseAccessDenied = () => {
    setShowAccessDenied(false);
    navigate("/ingresar");
  };

  // Determinar si debe renderizar el encabezado basado en la ruta actual
  const shouldRenderHeader = !unauthenticatedRoutes.includes(location.pathname);
  const shouldRenderFooter = !unauthenticatedRoutes.includes(location.pathname);

  useEffect(() => {
    const checkExpirationTime = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("expirationTime");

      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        const expiration = new Date(expirationTime).getTime();

        if (currentTime >= expiration && location.pathname !== "/ingresar") {
          // Token ha expirado, eliminarlo del local storage
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
          navigate("/ingresar");
          return false;
        } else if (currentTime >= expiration) {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
        }
      } else {
        // No hay token o expirationTime en el local storage
        return true;
      }
    };

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400); // Simular una carga de 2 segundos

    // Ejecutar checkExpirationTime cuando cambie la ubicación
    checkExpirationTime();

    return () => clearTimeout(timeout);
  }, [location.pathname, navigate]);

  // Mostrar mensaje de acceso denegado
  useEffect(() => {
    if (showAccessDenied) {
      swal({
        title: "Acceso denegado",
        text: "Por favor inicia sesión",
        icon: "warning",
        buttons: {
          confirm: "OK",
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then(() => handleCloseAccessDenied());
    }
  }, [showAccessDenied]);

  useEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {shouldRenderHeader && <Header />}
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/configuracion" element={<Configuration />} />
          <Route path="/" element={<Landing />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/nuevaInspeccion" element={<NewInspection />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/panel-de-administrador" element={<AdminDashboard />} />
          <Route path="/historial" element={<InspectionHistory />} />
          <Route path="/historial/:id" element={<InspectionDetail />} />
        </Routes>
      )}

      {shouldRenderFooter && <Footer />}
      {showAccessDenied && <div className="overlay"></div>}
    </div>
  );
}

export default App;
