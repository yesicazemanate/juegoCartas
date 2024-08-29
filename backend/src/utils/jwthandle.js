import jwt from 'jsonwebtoken';
const JWT_SECRET = 'tu_clave_secreta'; 

 const GenerarToken = (user) => {
    const payload = {
        id: user._id,
        correo: user.correo
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export{
    GenerarToken
}