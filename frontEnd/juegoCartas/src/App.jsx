// src/App.js
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Sidebar from './components/sidebar';
import { AuthContext } from './context/autenticacion';
import Home from './pages/home';
import CrearPartida from './pages/CrearPartida';
import IniciarPartida from './pages/IniciarPartida';
import CerrarSesion from './pages/CerrarSesion';
import ProtectedRoute from './pages/RutasProtegidas';
import { Register } from './components/reggister';
function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="flex flex-row pt-8 pl-8 h-screen">
        {isAuthenticated && (
          <div className="flex justify-center items-center">
            <Sidebar />
          </div>
        )}

        <div className='ml-5 p-14 w-full'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/register' element={<Register/>}/>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Crearpartida"
              element={
                <ProtectedRoute>
                  <CrearPartida />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Iniciarpartida"
              element={
                <ProtectedRoute>
                  <IniciarPartida />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CerrarSesion"
              element={
                <ProtectedRoute>
                  <CerrarSesion />
                </ProtectedRoute>
              }
            />
            {/* Otras rutas protegidas */}
          </Routes>
        </div>
      </div>
  
    </BrowserRouter>
  );
}

export default App;
