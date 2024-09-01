import  { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/autenticacion';

export default function Login() {
    const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    login();
    navigate('/home'); // Redirige al home después del login
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
         <div className="w-3/5 h-3/4 flex flex-col justify-center items-center rounded-2xl bg-slate-200">
            <p>INICIAR SESION</p>
            <form className="w-2/4 flex flex-col justify-center items-center">
                <div className="flex flex-col w-3/5">
                    <label>Usuario</label>
                <input className="w-full" placeholder="pepito@gmail.com"/>
                </div>
               <button onClick={handleLogin}>Iniciar</button>
            </form>
         </div>
    
    </div>
  );
}
