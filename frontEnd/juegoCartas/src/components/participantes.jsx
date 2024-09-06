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
  
  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        if(data){
          const responses = await Promise.all(
            data.map(async (user) => {
              const response = await axios.get(`http://localhost:8089/user/${user.iduser}`);
              return response.data;  
            })
          );
          console.log(responses)
         setUser(responses)  
        }
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  },[idPartida])
  useEffect(() => {
   
    socket.on('updatewaitingRoom', (updatedUsers) => {
      setData(updatedUsers); 
    });

    return () => {
      socket.off('updatewaitingRoom'); 
    };
  }, []);
  // console.log(user)
  return (
    <div>
    <h2>Participantes</h2>
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
