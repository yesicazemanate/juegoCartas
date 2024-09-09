import React from 'react'
import io from 'socket.io-client'; 
const socket = io('http://localhost:8089'); 
export const ParticipantesJuego = () => {
socket.on('updateWaitingRoom'
   
)
  return (
    <div>participantesJuego</div>
  )
}
