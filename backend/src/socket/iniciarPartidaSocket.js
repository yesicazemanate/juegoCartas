import User from "../models/user.models.js";

let waitingRoomUsers = []; // Lista de usuarios en la sala de espera

export const inicioPartida = (io) => {
    io.on('connection', (socket) => {
        //console.log('Usuario conectado:', socket.id);
    
        // Manejo del evento 'joinRoom'
        socket.on('joinRoom', async (userId) => {
          if(userId){
            try {
                const user = await User.findById(userId.iduser);
                console.log('user'+user);
                if (!user) {
                    console.log('Usuario no encontrado');
                    return;
                }
    
                // Añadir usuario a la sala de espera
                waitingRoomUsers.push({user});
                io.emit('updateWaitingRoom', waitingRoomUsers);
                console.log('Usuario añadido a la sala de espera:', waitingRoomUsers);
            } catch (error) {
                console.error('Error al encontrar el usuario:', error);
            }
          }
            
        });
    
        // Manejo del evento 'disconnect'
        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado:', socket.id);
            waitingRoomUsers = waitingRoomUsers.filter(u => u.socketId !== socket.id);
            io.emit('updateWaitingRoom', waitingRoomUsers);
        });
    
        // Manejo del evento 'updateWaitingRoomRequest'
    
    });
};