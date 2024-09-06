
import moongose, { Schema } from "mongoose"
const partidaShema= moongose.Schema({
    nombrePartida:{
        type:String,
        required:true,
        trim:true
    },
    participantes:{
        type: Schema.Types.Mixed,
        required:false,
        trim:true
    },
    tiempo:{
        type: String,
        required: false
    },
    codigo:{
        type: String,
        required:false,
        unique:true
    },
    numeroParticipantes:{
        type: Number,
        required:false,
    }

},
{
    timestamps: true
 })
 const Partida = moongose.model("Partida", partidaShema)
 export default Partida