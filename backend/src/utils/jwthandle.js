import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tu_clave_secreta'; 

 const GenerarToken = (user) => {
    const payload = {
        id: user._id,
        correo: user.email
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};
const verifyToken =(token)=>{
    try{
        const isVerify=jwt.verify(token, JWT_SECRET)
        return isVerify
    }catch(error){
        console.error('token verification failed', error)
        return null
    }
}


export{
    GenerarToken,
    verifyToken 
}