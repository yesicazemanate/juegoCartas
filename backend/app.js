import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from '../backend/src/config/db.js'
import routes from '../backend/src/routes/index.js'
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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express()
const port = process.env.PORT || 8089;
db()
app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

app.listen(port, ()=>{
    console.log(`server working port ${port}`)  
}) 