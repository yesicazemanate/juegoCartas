import jwt from 'jsonwebtoken';
const JWT_SECRET = 'tu_clave_secreta'; 

 const GenerarToken = (user) => {
    const payload = {
        id: user._id,
        correo: user.email
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
const verifyToken =(jwt)=>{
    try{
        const isVerify=jwt.verify(jwt, JWT_SECRET)
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