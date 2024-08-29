
import mongoose from "mongoose";
const inicioSesionSchema = mongoose.Schema({
    correo:{
        type: String,
        require: true,
        trim: true
    },
    contraseña:{
        type: String,
        require: true,
        trim: true
    }
})
const IncioSesion = mongoose.model("InicioSesion", inicioSesionSchema)
export default IncioSesion;