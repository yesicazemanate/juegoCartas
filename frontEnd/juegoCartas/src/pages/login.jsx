import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/autenticacion';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const SubirDatos = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/home'); 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-8">
          <img
            src="https://via.placeholder.com/150" // Reemplaza con la URL de tu imagen
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">INICIAR SESIÓN</h2>
        <form onSubmit={SubirDatos} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor='email' className="text-lg font-semibold text-gray-700">Correo electrónico</label>
            <input
              id='email'
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="pepito@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor='password' className="text-lg font-semibold text-gray-700">Contraseña</label>
            <input
              id='password'
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="**********"
            />
          </div>
          <button
            type='submit'
            className="w-full py-3 mt-4 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <p className="text-gray-600">¿No tienes cuenta?</p>
          <Link to="/registro" className="text-blue-500 ml-2 font-semibold hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
      );
}
