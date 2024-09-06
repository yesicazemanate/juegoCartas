import Partida from "../models/partida.model.js";
import mongoose from "mongoose";
export const createPartida = async (req, res) => {
    const data = req.body;
    try {
        const partidaExistente = await Partida.findOne({ codigo: data.codigo });
        if (partidaExistente) {
            return res.status(400).send('Código ya existe');
        }
        const partida = await Partida.create(data);
        return res.status(200).json(partida);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'No se pudo crear la partida' });
    }
} 


export const obtenerPartidas = async (req, res) => {
    try {
        const partidas = await Partida.find();
        res.send(partidas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error de servidor, no se pudo encontrar las partidas' });
    }
}

export const obtenerPartida= async(req, res)=>{
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('ID no válido');
  }
  try {
    const partida = await Partida.findById(id);
    if (!partida) {
      return res.status(404).send('Partida no encontrada');
    }
    return res.status(200).json(partida);
  } catch (error) {
    console.log(error); 
    return 
}
}
export const updatePartida = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
        const partida = await Partida.findByIdAndUpdate(id, { $push: data }, { new: true, runValidators: true });
        if (!partida) return res.status(400).send('Partida no actualizada');
        return res.status(200).json({ message: 'Partida actualizada', partida });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error interno');
    }
}

export const deletePartida = async(req, res)=>{
    const {id}= req.params
    try{
const partida = await Partida.findByIdAndDelete(id)
res.status(200).send('partida eliminada ')
    }catch(error){
        console.log(error)
        return res.status(500).send('error de servidor')
    }
}
export const compararCodigo= async(req, res)=>{
    const { codigo } = req.body;
  if (!codigo) {
    return res.status(400).send('Código no proporcionado');
  }
  try {
    const partidas = await Partida.find({ codigo });
    if (partidas.length === 0) {
      return res.status(404).send('Código no encontrado');
    }
    return res.status(200).json(partidas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
}