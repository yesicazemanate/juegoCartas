import moongose from "mongoose";
const userShema = moongose.Schema({
usuario:{
    type:String,
    require:true,
    trim:true
},
email:{
    type:String,
    require:true,
    trim:true
},
password:{
    type:String,
    require:true,
    trim:true 
},
public_id:{
    type:String,
    require:true,
    trim:true 
},
string_url:{
    type:String,
    require:true,
    trim:true 
}
})
const User = moongose.model("User", userShema)
export default User;
