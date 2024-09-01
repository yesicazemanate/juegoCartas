import { Link } from 'react-router-dom';
const Sidebar=()=> {
  return (
    <div className='w-52 '>
         <div className='bg-slate-200'>
      <ul className='p-5'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/Crearpartida">Crear Partida</Link></li>
        <li><Link to="/Iniciarpartida">Iniciar Partida</Link></li>
      </ul>
    </div>
    </div>
  )
}
export default Sidebar