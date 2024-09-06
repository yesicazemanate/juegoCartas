import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from '../backend/src/config/db.js'
import routes from '../backend/src/routes/index.js'
import { Server as SocketServer } from "socket.io";
import http from "http";
import { initializeSocket } from './src/socket/socket.js'
import { CrearPartidaSocket } from "./src/socket/crearPaartidaSocket.js";
import { CartasTiradasPorUser } from "./src/socket/CartasTiradasPorUser.js";


dotenv.config()
const allowedDomains =['http://localhost:5173']
const corsOptions ={
    origin: function(origin, callback){
        if(allowedDomains.indexOf(origin) !== -1 || !origin){
            callback(null, true); 
    } else {
      callback(new Error('No permitido por CORS'));  
    }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

const app = express()
const server = http.createServer(app);


const port = process.env.PORT || 8089;
db()
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)



server.listen(port, ()=>{
    console.log(`server working port ${port}`)  
}) 
const io = new SocketServer(server,{ 
  cors:{
    origin:"http://localhost:5173/", //Colocar la ruta de front para problemas de cor
    methods: ["GET", "POST"],
  }
})

CrearPartidaSocket(io);
CartasTiradasPorUser(io);
//initializeSocket(io)
