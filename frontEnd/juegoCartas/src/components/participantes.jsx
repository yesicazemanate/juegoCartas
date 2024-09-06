import axios from 'axios'
import  { useEffect, useState } from 'react'
import io from 'socket.io-client'; 

const socket = io('http://localhost:8089');
export const Participantes = () => {
  const idPartida= localStorage.getItem('idpartida')
  const [data, setData]= useState()
  const [user, setUser]= useState([])
  useEffect(()=>{
    const participante=async()=>{
      const response = await axios.get(`http://localhost:8089/partida/${idPartida}`)
     // console.log(response)
      setData(response.data.participantes)
    }
    participante()
  },[idPartida])
  //console.log(data)
  
  
  useEffect(() => {
   if(data){
     socket.emit('joinRoom', data)
    }
    socket.on('updateWaitingRoom',(data)=>{
      console.log('Datos recibidos del servidor: ', data )
      setUser(data)
    })
    socket.on('updateWaitingRoom')
         return () => {
           socket.off('updateWaitingRoom');
         };
  },[data]);
  console.log(user);
  return (
    <div>
    {user.length > 0 ? (
      <ul>
        {user.map((users, index) => (
          <li key={index}>{users.usuario}</li>
        ))}
      </ul>
    ) : (
      <p>No hay participantes todavía.</p>
    )}
  </div>
  )
}
