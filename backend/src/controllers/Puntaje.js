import PuntajeModelo from "../models/Puntaje.js";
//Insertar puntaje
 const createPuntaje = async (req, res) => {
    try {
        const { idUser, puntaje, usuario } = req.body;

        const nuevoPuntaje = new PuntajeModelo({
            idUser,
            puntaje,
            usuario
        });

        const savedPuntaje = await nuevoPuntaje.save();
        res.status(201).json(savedPuntaje);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el puntaje', error });
    }
};

// Obtener todos los puntajes GENERAL
 const getPuntajes = async (req, res) => {
    try {
        const puntajes = await PuntajeModelo.find();
        res.status(200).json(puntajes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los puntajes', error });
    }
};

// Obtener el puntaje por ID de usuario
 const getPuntajeByIdUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const puntaje = await PuntajeModelo.findOne({ idUser });

        if (!puntaje) {
            return res.status(404).json({ message: 'Puntaje no encontrado para este usuario' });
        }

        res.status(200).json(puntaje);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el puntaje', error });
    }
};

// Actualizar un puntaje por ID de usuario
 const updatePuntajeByIdUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const { puntaje, usuario } = req.body;

        const updatedPuntaje = await PuntajeModelo.findOneAndUpdate(
            { idUser },
            { puntaje, usuario },
            { new: true } // Retorna el documento actualizado
        );

        if (!updatedPuntaje) {
            return res.status(404).json({ message: 'Puntaje no encontrado para este usuario' });
        }

        res.status(200).json(updatedPuntaje);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el puntaje', error });
    }
};

// Eliminar un puntaje por ID de usuario
 const deletePuntajeByIdUser = async (req, res) => {
    try {
        const { idUser } = req.params;

        const deletedPuntaje = await PuntajeModelo.findOneAndDelete({ idUser });

        if (!deletedPuntaje) {
            return res.status(404).json({ message: 'Puntaje no encontrado para este usuario' });
        }

        res.status(200).json({ message: 'Puntaje eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el puntaje', error });
    }
};
export{
    deletePuntajeByIdUser,updatePuntajeByIdUser, getPuntajeByIdUser, getPuntajes, createPuntaje
}