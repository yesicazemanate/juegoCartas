import TotalDeJugadores from "../components/TotalDeJugadores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CrearPartida = () => {
   const navigate = useNavigate()
    const random = ['1','2','3','4','5','6','7','8','9','0','c','a','b']

   const codigoRandom = ()=>{
      let codis = ''
      for (let index = 0; index < 6; index++) {
        const code = Math.floor(Math.random()* random.length)
       codis += random[code];
      }
      return codis;
     
   }
   const [codigo, setCodigo] = useState(codigoRandom())
   const [modal, setModal] = useState({open:false, number:null})
   const palabraNueva = codigoRandom()
   const [nombrePartida, setNombrePartida] = useState("");
   const abrir = (number)=>{
      setModal({open:true, number})
      setCodigo(palabraNueva);
   }
   const cerrar = ()=>{
      setModal({open:false, number:null})
   }
   const aceptar =()=>{
      if(modal.number !== null){
       axios.post('http://localhost:8089/partida/',{
         codigo: codigo,
         nombrePartida: nombrePartida
       })
       .then(() => {
         localStorage.setItem('Numero de jugadores', modal.number);
         navigate('/pruebaa');
     })
     .catch((error) => {
         console.error('Error al crear la partida:', error);
     });
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
               <div className="bg-white  p-6 rounded-lg shadow-lg">
                 <h2 className="text-xl  text-center font-semibold mb-4">¿Estas seguro de crear la partida? </h2>
                 <p className="mt-3 mb-4 text-center">Total de jugadores {modal.number}.</p>
                 <div className="flex flex-row mb-7 gap-5 justify-center items-center">
                 <h2 className="">Nombre de partida:</h2>
                 <input value={nombrePartida} onChange={(e) => setNombrePartida(e.target.value)} className="border-2 p-2 border-black rounded-lg"/>
                 </div>
                 <div className="flex gap-4 flex-row justify-center items-center">
                  <p>Tu codigo :</p>
                  <p className="border-2 p-1 rounded-lg">{codigo}</p>
                 </div>
                  <div className="flex flex-row gap-9 justify-center items-center">
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
             </div>
            )
           }
       </div>
   );
};

export default CrearPartida;
