
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Participantes } from "../components/participantes";

const IniciarPartida = () => {
  const navigate = useNavigate()
  const [modall, setModal] = useState({isOpen:false, number: null})
  const token = document.cookie.split('=')[1];
  const [iduser, setIduser]= useState()
  const [codigo, setCodigo]=useState()
  const [alert, setAlert]= useState()
  const [idpartida, setPartida]= useState()
 const [pasar, setPasar]= useState()
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

  console.log(idpartida)
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
   const cerrarModal=()=>{
      setModal({isOpen:false, number:null})

      navigate('/home')
   }
   const unirse =()=>{
     actualizarPartida()

    if(pasar){
      localStorage.setItem('idpartida',idpartida)
      navigate('/pruebaa')
    }
   }

    return(
      <>
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
    
     
        <div className="fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center w-96 bg-white p-6 rounded-lg shadow-lg">
            {alert&&(
              <h1 className="text-lg mb-4">El código proporcionado no pertenece a ninguna partida</h1>
            )}
          <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Escriba su codigo para inicarPartida</h2>

    
            <h2 className="text-lg mb-4">Debe tener 6 caracteres</h2>
            <input className="border-2 p-2  border-black rounded-lg"
            value={codigo}
            onChange={(e)=>setCodigo(e.target.value)}
            />
            <div className="flex flex-row">
            <div className="flex flex-row">
            <button
              onClick={()=>unirse()}
              className="mr-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >Unirme</button>
              </div>
            <button
              onClick={cerrarModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
            </div>
            
          </div>
        </div>
    
  </div>
  
  
      </>
  )
  };
  
  export default IniciarPartida;
  