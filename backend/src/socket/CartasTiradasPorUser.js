
export const CartasTiradasPorUser = (io)=>{
    io.on('connection', (socket)=>{
        //console.log(`user Cartas: ${socket.id}`)

        socket.on('CartasSeleccionada', (card)=>{
            console.log(`Carta Jugada : ${card}`)
            io.emit('CartasSeleccionadaJuego', card)
            console.log('Carta jugada emitida a todos los clientes:', card);
        })
        socket.on('disconnect', () => {
            console.log('user Desconectado');
        });
    })

}