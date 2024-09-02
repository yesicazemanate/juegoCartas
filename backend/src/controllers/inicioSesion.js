import inicioSesion from "../models/user.models.js";
import { ComparacionContra } from "../utils/bcrypt.js";
import { GenerarToken } from "../utils/jwthandle.js";

const InicioSesionPost = async (req, res) => {
    try {
        const { email, password } = req.body;

      
        const user = await inicioSesion.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

      
        const passwordOk = await ComparacionContra(password, user.password);
        if (!passwordOk) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = GenerarToken(user);

        res.cookie('authToken', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'Strict' 
        });

       res.status(200).json({ message: 'Inicio de sesión exitoso' ,token});
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

export  {
    InicioSesionPost
};
