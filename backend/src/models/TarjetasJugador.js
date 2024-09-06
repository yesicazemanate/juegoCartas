import mongoose from "mongoose";
const SchemaTarjetas =  mongoose.Schema({
    idUser:{
        type: String,
        require: true
    },
    tarjetasUsuario:{
        type:String,
        require: true
    }
    
})
const Tajetas = mongoose.model("TarjetasByUser", SchemaTarjetas)
export default Tajetas;