
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const IniciarPartida = () => {
   const navigate = useNavigate()
   const [modall, setModal] = useState({isOpen:false, number: null})
  //  const abrirModal =(number)=>{
  //     setModal({isOpen:true, number})
  //  }
   const cerrarModal=()=>{
      setModal({isOpen:false, number:null})
      navigate('/home')
   }
   const unirse =()=>{
      if (modall.number !== null) {
         localStorage.setItem("TotalJugadoresParaUnirse: ",modall.number);
         navigate('/pruebaa')
      }
   }
    return(
      <>
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
    
     
        <div className="fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center w-96 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Escriba su codigo para inicarPartida</h2>

    
            <h2 className="text-lg mb-4">Debe tener 6 caracteres</h2>
            <input className="border-2 p-2  border-black rounded-lg"/>
            <div className="flex flex-row">
            <button
              onClick={unirse}
              className="mr-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >Unirme</button>
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
  