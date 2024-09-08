export const CartasTiradasPorUser = (io) => {
    let jugadores = {};  
    let cartasRestantes = [];
    let jugadorTurno = null;

    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        // Manejar la lógica de iniciar partida
        socket.on('iniciarPartida', (jugadorId, numeroParticipantes, cartas) => {
            if (numeroParticipantes < 2 || numeroParticipantes > 7) {
                return socket.emit('error', 'El número de participantes debe estar entre 2 y 7.');
            }

            if (Object.keys(jugadores).length >= numeroParticipantes) {
                return socket.emit('error', 'Ya se ha alcanzado el número máximo de jugadores.');
            }

            if (cartas.length < numeroParticipantes * 8) {
                return socket.emit('error', 'No hay suficientes cartas para repartir 8 por jugador.');
            }

            const cartasBarajadas = cartas.sort(() => Math.random() - 0.5);
            const cartasJugador = cartasBarajadas.splice(0, 8);
            cartasRestantes = cartasBarajadas;  
            jugadores[jugadorId] = { id: socket.id, cartas: cartasJugador };

            socket.emit('cartasAsignadas', cartasJugador);
            console.log(`Cartas asignadas al jugador ${jugadorId}:`, cartasJugador);
        });

        socket.on('caracteristicaSeleccionada', ({ jugadorId, caracteristica }) => {
            console.log(`Evento caracteristicaSeleccionada recibido. Jugador: ${jugadorId}, Característica: ${caracteristica}`);
          
            if (!jugadores[jugadorId]) {
              return socket.emit('error', `Jugador ${jugadorId} no está registrado.`);
            }
          
            jugadorTurno = jugadorId;
            io.emit('turnoJugador', true); // Emitir a todos los jugadores
          
            // Mover el manejo de CartasSeleccionada fuera del evento caracteristicaSeleccionada
            // Esto asegura que el evento se maneje correctamente después de caracteristicaSeleccionada
          });
          
          socket.on('CartasSeleccionada', (data) => {
            console.log('Evento CartasSeleccionada recibido en el servidor');
            console.log('Datos recibidos:', data);
            
            const { card, caracteristica } = data;
            console.log('Carta:', card);
            console.log('Característica:', caracteristica);
          
            // if (jugadorTurno === null || jugadores[jugadorTurno].id !== socket.id) {
            //   return socket.emit('error', 'No es tu turno');
            // }
          
            socket.broadcast.emit('CartasSeleccionadaJuego', { card, caracteristica });
            console.log('Evento CartasSeleccionadaJuego emitido');
          
            //jugadorTurno = null;
          });
          
           
        // Manejar desconexiones
        socket.on('disconnect', () => {
            for (let jugadorId in jugadores) {
                if (jugadores[jugadorId].id === socket.id) {
                    console.log(`Jugador ${jugadorId} desconectado`);
                    delete jugadores[jugadorId];
                    break;
                }
            }
        });
    });
};
