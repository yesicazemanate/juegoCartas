import { Link } from 'react-router-dom';
const Sidebar=()=> {
  return (
    <div className='w-52 h-full bg-slate-100'>
         <div className='bg-slate-100'>
      <ul className='p-5 gap-4 flex flex-col justify-center items-center'>
        <li className='flex justify-center items-center hover:bg-white rounded-2xl p-2' ><Link to="/home">
        <img className='w-8 ml-1' src='../../public/sidebar/home.png'/>
        <p>Home</p> 
        </Link></li>
        <li className='flex justify-center items-center hover:bg-white rounded-2xl p-2'><Link to="/Crearpartida">
        <img className='w-8 ml-7' src='../../public/sidebar/game-controller.png'/>
        <p>Crear partida</p>
        </Link></li>
        <li className='flex justify-center items-center hover:bg-white rounded-2xl p-2'>
          <Link to="/Iniciarpartida">
          <img className='w-8 ml-7' src='../../public/sidebar/start.png'/>
        <p>Iniciar partida</p>
        </Link></li>
        <li className='flex justify-center items-center hover:bg-white rounded-2xl p-2'>
          <Link to="/CerrarSesion">
        <img className='w-8 ml-7' src='../../public/sidebar/log-out.png'/>
        <p>Cerrar sesion</p>
        </Link></li>
      </ul>
    </div>
    </div>
  )
}
export default Sidebar