 import {BrowserRouter, Routes, Route } from "react-router-dom"
 import Login from "./pages/login";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import CrearPartida from "./pages/CrearPartida";
import IniciarPartida from "./pages/IniciarPartida";
function App() {

  return (
  <BrowserRouter>
  <div className="flex flex-row pt-8 pl-8 h-screen">
    <div className="flex justify-center items-center">
    <Sidebar />
    </div>
        
        <div style={{ marginLeft: '10px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/Crearpartida" element={<CrearPartida />} />
            <Route path="/Iniciarpartida" element={<IniciarPartida />} />

            {/* Demas rutas se añaden aca */}
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
  </BrowserRouter>
  // <Sidebar/>
  
  )
}

export default App
