import axios from 'axios'
import  { useEffect, useState } from 'react'

export const Participantes = () => {
  const idPartida= localStorage.getItem('idpartida')
  const [data, setData]= useState()
  const [user, setUser]= useState([])
  useEffect(()=>{
    const participante=async()=>{
      const response = await axios.get(`http://localhost:8089/partida/${idPartida}`)
      console.log(response)
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
         setUser(responses)  
        }
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  },[idPartida])
  console.log(user)
  return (
    <div>Participantes</div>
  )
}
