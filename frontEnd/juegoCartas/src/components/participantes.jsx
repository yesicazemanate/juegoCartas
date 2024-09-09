import axios from 'axios'
import  { useEffect, useState } from 'react'
import io from 'socket.io-client'; 

const socket = io('http://localhost:8089');
export const Participantes = () => {
  const idPartida= localStorage.getItem('idpartida')
  //const [data, setData]= useState()
  const [user, setUser]= useState([])
  
  useEffect(() => {
 
     socket.emit('joinRoom', idPartida)
     socket.on('updateWaitingRoom',(datos)=>{
       console.log('Datos recibidos del servidor: ', datos )
       setUser(datos)
     })
     socket.on('updateWaitingRoom')
    
         return () => {
           socket.off('updateWaitingRoom');
         };
  },[idPartida]);
  console.log(user);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {user.length > 0 ? (
      user.map((user, index) => (
        <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
          <img className="w-full h-48 object-cover rounded-t-lg" src={user.user.string_url} alt="User Image" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{user.user.usuario}</div>
          </div>
        </div>
      ))
    ) : (
      <p>No hay participantes todavía.</p>
    )}
  </div>
  )
}
