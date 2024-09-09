
import { useEffect,useState } from "react";
import { Participantes } from "../components/participantes"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:8089")
export default function PruebaCAMBIONUMERO() {
  const navigate = useNavigate();
  const [estado, setEstado] = useState(true)
  const [usuarios, setUsuarios]= useState([])
  const idPartida = localStorage.getItem('idpartida')
  useEffect(() => {
    socket.on('updateWaitingRoom', (users)=>{
setUsuarios(users)
    })
    
}, []);

const comenzarPartida = () => {
  console.log('Emitir comenzarPartida');
  socket.emit('comenzarPartida', idPartida, usuarios);
  socket.on('redirigirAPartida', (usuaris) => {
    navigate('/sala'); 
    console.log(usuaris);
});
};
//console.log(usuarios);
  return (
    <div>
      <Participantes/>
      <button 
      onClick={()=>comenzarPartida()}
      className="w-full py-3 mt-4 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition duration-200">Play</button>
    </div>
  )
}
