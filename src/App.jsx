import { Routes, Route } from "react-router-dom"
import './App.css';
//Components
import Landing from './Pages/Landing/Landing'
import Register from './Pages/Register/Register'
import Home from "./Pages/Home/Home";
import NewInspection from "./pages/NewInspection/NewInspection";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/registrarse" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="NuevaInspeccion" element={<NewInspection/>}/>
      </Routes>

    </div>
  )
}

export default App
