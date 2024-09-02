
import { number } from "prop-types";
import TotalDeJugadores from "../components/TotalDeJugadores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const IniciarPartida = () => {
   const navigate = useNavigate()
   const [modall, setModal] = useState({isOpen:false, number: null})
   const abrirModal =(number)=>{
      setModal({isOpen:true, number})
   }
   const cerrarModal=()=>{
      setModal({isOpen:false, number:null})
   }
   const unirse =()=>{
      if (modall.number !== null) {
         localStorage.setItem("TotalJugadoresParaUnirse: ",modall.number);
         navigate('/pruebaa')
      }
   }
    return(
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="w-5/6 max-w-5xl bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center">
          <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Iniciar Partida</h2>

          <h2 className="text-center font-semibold  text-2xl text-gray-700 mb-10">Partidas disponibles</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              <TotalDeJugadores number="2" modal={abrirModal} />
              <TotalDeJugadores number="5" modal={abrirModal}/>
              <TotalDeJugadores number="6"modal={abrirModal} />
              <TotalDeJugadores number="3"modal={abrirModal} />
              <TotalDeJugadores number="7"modal={abrirModal} />
          </div>

      </div>
      {modall.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Detalles de la partida</h2>
            <p>Total de jugadores {modall.number}.</p>
            <p>Creado por: </p>
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
      )}
  </div>
  )
  };
  
  export default IniciarPartida;
  