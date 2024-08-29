import inicioSesion from "../models/inicioSesion.js";
import { ComparacionContra } from "../utils/bcrypt.js";
import { GenerarToken } from "../utils/jwthandle.js";

const InicioSesionPost = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

      
        const user = await inicioSesion.findOne({ correo });
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

      
        const passwordOk = await ComparacionContra(contraseña, user.contraseña);
        if (!passwordOk) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = GenerarToken(user);

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

export  {
    InicioSesionPost
};
