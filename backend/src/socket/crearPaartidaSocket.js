import Partida from "../models/partida.model.js";
import { Server as SocketServer } from "socket.io";

export const CrearPartidaSocket = (io) => {
    io.on('connection', (socket) => {
<<<<<<< HEAD
        // console.log(`usuario conectado :${socket.id}`);
=======
        //console.log(`usuario conectado :${socket.id}`);
>>>>>>> 15c3a1435fc28e70975ea5527e2947f74d270e6f

        socket.on('crearPartida', async (data) => {
            try {
                const partidaExistente = await Partida.findOne({ codigo: data.codigo });
                if (partidaExistente) {
                    return socket.emit('error', 'Código ya existe');
                }

                const nuevaPartida = new Partida({
                    codigo: data.codigo,
                    nombrePartida: data.nombrePartida,
                    numeroParticipantes: data.numeroParticipantes,
                    participantes: [data.participante]

                });

                await nuevaPartida.save();
                io.emit('crearPartida', nuevaPartida);
                console.log('Partida emitida a los demás usuarios:', nuevaPartida);
            } catch (error) {
                console.error('Error al crear partida:', error);
                socket.emit('error', 'No se pudo crear la partida');
            }
        });

        socket.on('disconnect', () => {
            console.log('user Desconectado');
        });
    });
}
