import User from "../models/user.models.js";
import {EncriptacionContra } from "../utils/bcrypt.js";
import { verifyToken } from "../utils/jwthandle.js";
export const createUser= async(req, res)=>{
    const {
        usuario,
        email,
        password,
        public_id,
        string_url
    } = req.body;
    try{
        const passwordHash = await EncriptacionContra(password)
        const userData = {
            usuario,
            email,
            password: passwordHash, 
            public_id,
            string_url
        };
const newUser =await User.create(userData);
res.status(201).json(newUser);
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
 }
 export const obtenerUserId=async(req, res)=>{
    const {id}= req.params 
    try{
const user = await User.findById(id)
if(!user){
    return res.status(400).send('usuario no encontrado')
}
return res.status(200).send(user)
    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
 }
export const decodeToken =async(req, res)=>{
    const authHeader = req.headers.authorization;
// console.log(authHeader)
    if (!authHeader) {
        return res.status(401).send('Token no proporcionado.');
    }

    try{
const tokenDecoded = verifyToken(authHeader)
// console.log(tokenDecoded)
if(!tokenDecoded){
    return res.status(401).send('Acceso denegado.');
}
return res.status(200).send(tokenDecoded)
    }catch(error){
console.log(error)
return res.status(500).json({message:error})
    }
}
