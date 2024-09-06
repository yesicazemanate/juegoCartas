let waitingRoomUsers=[]
 export const inicioPartida =(io)=>{
io.on('connection', (socket)=>{
    console.log('usuario conectado')
    socket.on('joinRomm', (user)=>{
        waitingRoomUsers.push(user)
        io.emit('updatewaitingRoom', waitingRoomUsers)
    })
    socket.on('dicconnect', ()=>{
        console.log('un usuario se ha desconectado')
        waitingRoomUsers = waitingRoomUsers.filter(u=>u.socketId !== socket.id)
        io.emit('updatewaitingRoom', waitingRoomUsers)
    })
})

}