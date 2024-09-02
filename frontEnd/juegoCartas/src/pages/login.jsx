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
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="w-2/5 h-3/4 flex gap-9 flex-col justify-center items-center rounded-2xl bg-slate-200">
        <p className='text-xl font-bold'>INICIAR SESION</p>
        <form onSubmit={SubirDatos} className="w-3/4 flex flex-col justify-center items-center gap-9">
          <div className="flex flex-col gap-2 w-3/5">
            <label className='text-lg font-semibold'>Correo electronico</label>
            <input
              id='email'
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg" placeholder="pepito@gmail.com" />
          </div>
          <div className="flex flex-col w-3/5 gap-2">
            <label className='text-lg font-semibold'>Contraseña</label>
            <input
              id='password'
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg" placeholder="**********" />
          </div>
          <button className='rounded-xl bg-slate-300 p-3' type='submit'>Iniciar sesión</button>
        </form>
        <div className='w-5/6 flex flex-row gap-2 justify-center items-center'>
          <p>¿No tienes cuenta?</p>
          <p>
            <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
