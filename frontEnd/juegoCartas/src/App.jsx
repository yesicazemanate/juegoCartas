import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Sidebar from './components/sidebar';
import { AuthContext } from './context/autenticacion';
import Home from './pages/home';
import CrearPartida from './pages/CrearPartida';
import IniciarPartida from './pages/IniciarPartida';
import CerrarSesion from './pages/CerrarSesion';
import { Register } from './components/reggister';
import Pruebaa from "./pages/PruebaCAMBIONUMERO";
import SalaJuego from "./pages/Salajuego";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? element : <Navigate to="/home" />;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="ml-0 flex flex-row h-screen">
        {isAuthenticated && (
          <div className="w-52 h-full">
            <Sidebar />
          </div>
        )}

        <div
          style={{ marginLeft: isAuthenticated ? '0%' : '0%', padding: '7px', width: '100%' }}
        >
          <Routes>
      
            <Route path="/" element={<PublicRoute element={<Login />} />} />
             <Route path="/registro" element={<PublicRoute element={<Register />} />} /> 
             <Route path="/sala" element={<PublicRoute element={<SalaJuego />} />} /> 

        
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/crearpartida"
              element={<ProtectedRoute element={<CrearPartida />} />}
            />
            <Route
              path="/iniciarpartida"
              element={<ProtectedRoute element={<IniciarPartida />} />}
            />
            <Route
              path="/cerrarsesion"
              element={<ProtectedRoute element={<CerrarSesion />} />}
            />
             <Route
              path="/pruebaa"
              element={<ProtectedRoute element={<Pruebaa />} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
  
    </BrowserRouter>
  );
}

export default App;
