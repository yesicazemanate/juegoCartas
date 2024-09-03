
import moongose, { Schema } from "mongoose"
const partidaShema= moongose.Schema({
    nombrePartida:{
        type:String,
        require:true,
        trim:true
    },
    participantes:{
        type: Schema.Types.Mixed,
        require:false,
        trim:true
    },
    tiempo:{
        type: String,
        require: false
    },
    codigo:{
        type: String,
        require:false
    }



},
{
    timestamps: true
 })
 const Partida = moongose.model("Partida", partidaShema)
 export default Partida