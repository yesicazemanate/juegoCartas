import User from "../models/user.models.js";
import {EncriptacionContra } from "../utils/bcrypt.js";
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