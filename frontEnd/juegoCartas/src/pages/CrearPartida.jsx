import TotalDeJugadores from "../components/TotalDeJugadores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CrearPartida = () => {
   const navigate = useNavigate()
   const [modal, setModal] = useState({open:false, number:null})
   const abrir = (number)=>{
      setModal({open:true, number})
   }
   const cerrar = ()=>{
      setModal({open:false, number:null})
   }
   const aceptar =()=>{
      if(modal.number !== null){
         localStorage.setItem("Numero de jugadores: " , modal.number)
         navigate('/pruebaa')
      }
   }
   return (
       <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
           <div className="w-5/6 max-w-5xl bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center">
               <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Crear Partida</h2>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                   <TotalDeJugadores number="2" modal={abrir} />
                   <TotalDeJugadores number="3" modal={abrir} />
                   <TotalDeJugadores number="4" modal={abrir}/>
                   <TotalDeJugadores number="5" modal={abrir}/>
                   <TotalDeJugadores number="6" modal={abrir}/>
                   <TotalDeJugadores number="7" modal={abrir}/>
               </div>
           </div>
           {
            modal.open &&(
               <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
               <div className="bg-white p-6 rounded-lg shadow-lg">
                 <h2 className="text-xl font-semibold mb-4">¿Estas seguro de crear la partida? </h2>
                 <p>Total de jugadores {modal.number}.</p>
                 <button
                   onClick={aceptar}
                   className="mr-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                 >Aceptar</button>
                 <button
                   onClick={cerrar}
                   className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                 >
                   Cancelar
                 </button>
               </div>
             </div>
            )
           }
       </div>
   );
};

export default CrearPartida;
