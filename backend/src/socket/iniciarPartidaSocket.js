import Partida from "../models/partida.model.js";
import User from "../models/user.models.js";

let waitingRoomUsers = []; // Lista de usuarios en la sala de espera

export const inicioPartida = (io) => {
    io.on('connection', (socket) => {
        //console.log('Usuario conectado:', socket.id);
    
        // Manejo del evento 'joinRoom'
        socket.on('joinRoom', async (idpartida) => {
            const partida = await Partida.findById(idpartida);
    
            if (!partida) {
              console.log(`Partida con id ${idpartida} no encontrada`);
              return;
            }
            const participantes= partida.participantes
            
            // Si se encuentra la partida, puedes usar la constante 'partida' para lo que necesites
           // console.log('Partida encontrada:', participantes);
          
            if (participantes && Array.isArray(participantes)) {
                try {
                  // Usamos forEach para recorrer cada ID del array
                  await Promise.all(participantes.map(async (userIdObj) => {
                    console.log(userIdObj)
                    const user = await User.findById(userIdObj.iduser);
                    if (!user) {
                      console.log(`Usuario con id ${userIdObj.iduser} no encontrado`);
                      return; 
                    }
                 
                    const userAlreadyInRoom = waitingRoomUsers.some(u => u.user._id.toString() === user._id.toString());
      if (!userAlreadyInRoom) {
        waitingRoomUsers.push({ user });
      }
                    
                }));
            
                  // Emitir la sala de espera actualizada a todos los clientes
                  io.emit('updateWaitingRoom', waitingRoomUsers);
                  console.log('Usuarios añadidos a la sala de espera:', waitingRoomUsers);
                } catch (error) {
                  console.error('Error al procesar los usuarios:', error);
                }
              }
        // Manejo del evento 'disconnect'
        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado:', socket.id);
            waitingRoomUsers = waitingRoomUsers.filter(u => u.socketId !== socket.id);
            io.emit('updateWaitingRoom', waitingRoomUsers);
        });
    
        // Manejo del evento 'updateWaitingRoomRequest'
    
    });
})}