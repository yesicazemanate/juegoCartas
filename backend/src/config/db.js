import mongoose from "mongoose";
const connectionDB = async ()=>{
    try{
        const dbURI = 'mongodb+srv://yemaze123yz:HLcHTZv88jU1QpNX@cluster0.s3jk1.mongodb.net/juegoCartas?retryWrites=true&w=majority&appName=Cluster0';
await mongoose.connect(dbURI)
console.log("connection established to juegoCartas database")
    }catch( error){
        console.log("Error al conectarse a la base de datos")
    process.exit(1)
    }
}
export default connectionDB  