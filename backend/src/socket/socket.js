let currentTurn = 0; // Mantiene el seguimiento del turno actual
let cartasEnJuego = []; // Mantiene las cartas jugadas en el centro
let jugadores = []; // Lista de jugadores conectados
export const initializeSocket=(io)=>{

io.on('connection', socket => {
  if (!jugadores.some(jugador => jugador.id === socket.id)) {
    jugadores.push({ id: socket.id, nombre: `Jugador ${jugadores.length + 1}` });
}
// console.log(jugadores);

socket.emit('estadoInicial', { jugadores, cartasEnJuego, currentTurn });
// console.log(`Estado inicial enviado a ${socket.id}: jugadores = ${jugadores.length}, currentTurn = ${currentTurn}`);


    // Lógica para manejar la carta jugada
    socket.on('jugarCarta', data => {
        const { idJugador, carta } = data;

        if (idJugador === jugadores[currentTurn].id) { // Verifica si es el turno del jugador
            cartasEnJuego.push(carta); // Agrega la carta al centro
            io.emit('actualizarCartas', { cartasEnJuego }); // Actualiza las cartas para todos

            // Cambia al siguiente turno
            currentTurn = (currentTurn + 1) % jugadores.length;
            io.emit('cambiarTurno', { currentTurn });
        } else {
            socket.emit('errorTurno', 'No es tu turno');
        }
    });

    // Lógica para manejar la desconexión
    socket.on('disconnect', () => {
      const jugadorDesconectado = jugadores.find(jugador => jugador.id === socket.id);
      const esSuTurno = jugadores[currentTurn]?.id === socket.id;
  
      jugadores = jugadores.filter(jugador => jugador.id !== socket.id);
    //   console.log("Desconectado Socket:", socket.id);
  
      if (jugadores.length === 0) {
          cartasEnJuego = []; // Reinicia el juego si todos se desconectan
          currentTurn = 0; // Reinicia el turno
      } else if (esSuTurno) {
          // Si era el turno del jugador desconectado, pasa el turno al siguiente jugador
          currentTurn = currentTurn % jugadores.length;
          io.emit('cambiarTurno', { currentTurn });
      }
  
      io.emit('jugadorDesconectado', { jugadores, currentTurn });
  });
  
});
}