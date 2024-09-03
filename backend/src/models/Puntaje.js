import moongose from "mongoose";
const puntajeSchema = moongose.Schema({
    idUser:{
        type: String,
        require: true,
        trim: true
    },
    puntaje:{
        type: Number,
        require: true,
        trim: true
    },
    usuarios:{
        type:String,
        require: true, //Se quita
        trim:true
    }
})
const Puntaje = moongose.model("Puntaje", puntajeSchema)
export default Puntaje;