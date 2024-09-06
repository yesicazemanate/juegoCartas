
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartidasDisponibles from "../components/PartidasDisponibles";
import io from 'socket.io-client'
const socket = io('http://localhost:8089')
const IniciarPartida = () => {
  const navigate = useNavigate()
  const [modall, setModal] = useState({isOpen:false, numeroParticipantes: null, nombrePartida: null})
  const token = document.cookie.split('=')[1];
  const [iduser, setIduser]= useState()
  const [codigo, setCodigo]=useState()
  const [alert, setAlert]= useState()
  const [idpartida, setPartida]= useState()
 const [pasar, setPasar]= useState()
 const [datosPartida, setDatosPartida] = useState([])
 const [iamge,setImage] = useState('');
//  useEffect(()=>{
//   socket.on('connect', ()=>{
//     console.log('conectado sockect.io')
//   })
//   return ()=>{
//     socket.disconnect()
//   }
//  },[])
  useEffect(()=>{
const decodeToken =async()=>{
  try{
const response= await axios.post('http://localhost:8089/user/',{},{
  headers:{
     Authorization:token 
  }
})

setIduser(response.data.id)
  }catch(error){
console.log(error)
  }
}
decodeToken()
socket.emit('joinRoom', { iduser });

socket.on('updatewaitingRoom', (users) => {
  setWaitingRoomUsers(users);  
});
return () => {
  socket.off('updatewaitingRoom');  
}
  },[codigo])
useEffect(()=>{
  const compararCodigo=async()=>{
    try{
    const response = await axios.post('http://localhost:8089/partida/comparar',{
      codigo
    })
    if(response.data.length > 0){
      setAlert(false)
      setPartida(response.data[0]._id)
    
      setPasar(true)
    
    }else{
      setAlert(true)
      setPasar(false)
    }
    
    }catch(error){
      console.log(error)
    }
      }
      compararCodigo()
},[codigo])

  // console.log(idpartida)
const actualizarPartida=async()=>{
  const user={
    iduser
  }
  try{
    const response = await axios.patch(`http://localhost:8089/partida/${idpartida}`,{
      participantes:user
    })
    console.log(response)
    
  }catch(error){
    console.log(error)
  }
}
const traerPartidas = async()=>{
  try{
    const data = await axios.get('http://localhost:8089/partida/')
    console.log('datooos : ',data.data)
    setDatosPartida(data.data)
  
  }
  catch(error){
    console.log(error);
  }
 
}
useEffect(()=>{
  traerPartidas()
},[])

const cerrarModal=()=>{
      setModal({isOpen:false, number:null})
      navigate('/iniciarpartida')
}


   const unirse =()=>{
     actualizarPartida()
    if(pasar){
      localStorage.setItem('idpartida',idpartida)
      navigate('/pruebaa')
    }
   
    //   }
}
const abrirParticipantesModal = (nombrePartida, numeroParticipantes) => {
    setModal({ isOpen: true, nombrePartida, numeroParticipantes });
};

const iamgenPokemon = [
  '/buo.png',
  '/fuego.png',
  '/tortuga.png',
  '/zorrito.png'
]
const radnomImage = (index) => {
  const imageIndex = index % iamgenPokemon.length; // Para hacer que las imágenes se repitan
  return `/images/pokemon/${iamgenPokemon[imageIndex]}`; // Ruta relativa a la carpeta public
};
  
  //  console.log(codigo)
  

    return(
      <>
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
         
        {modall.isOpen && (
          <div className="fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center w-96 bg-white p-6 rounded-lg shadow-lg">
              {alert && (
                <h1 className="text-lg mb-4">El código proporcionado no pertenece a ninguna partida</h1>
              )}
              <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Escriba su código para iniciar partida</h2>
              <h2 className="text-lg mb-4">Debe tener 6 caracteres</h2>
              <input
                className="border-2 p-2 border-black rounded-lg"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <div className="flex flex-row">
                <button
                  onClick={() => unirse()}
                  className="mr-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Unirme
                </button>
                <button
                  onClick={cerrarModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
         <div className="w-5/6 max-w-5xl bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center">
         <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Partidas Disponibles</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {
           datosPartida && datosPartida.map((partida, index)=>{
            return (
              <PartidasDisponibles
                key={partida._id}
                nombrePartida={partida.nombrePartida}
                numeroParticipantes={partida.numeroParticipantes}
                modal={abrirParticipantesModal}
                imagenPokemon={radnomImage(index)} 
              />
            );
          })}
          </div>
          <div className=" w-full flex justify-end items-end">
          <button className="relative cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-500 p-6 rounded-xl border-white border-2 w-40 shadow-lg transform transition-transform hover:scale-105 text-white">Partidas a las que perteneces</button>
          </div>
          
         </div>
       
      </div>
  
  
      </>
  )
  };
  
  export default IniciarPartida;
  