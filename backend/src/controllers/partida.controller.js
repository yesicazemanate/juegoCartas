import Partida from "../models/partida.model.js";

export const createPartida=async(req, res)=>{
const data = req.body
try{
const partida = await Partida.create(data)
return res.status(200).send(partida) 

}catch(error){
    console.error(error)
    return res.status(500).json({message:'usuario no creado'})
}
}
export const obtenerPartidas= async(req, res)=>{
    try{
const partidas = await Partida.find()
res.send(partidas)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'error de servidor no se puedo encontrar las partidas '})
    }
}
export const obtenerPartida= async(req, res)=>{
    const {id}= req.params
    try{
const partida = await Partida.findById(id)
if (!partida) {
    return res.status(404).send('Partida no encontrada');
}
    return res.status(200).send(partida)
    }catch(error){
        console.log(error)
     res.status(500).json({message:'error interno'})
    }
}
export const updatePartida=async(req, res)=>{
    const data=req.body
    console.log(data)
    const {id}=req.params
    try{    
const partida= await Partida.findByIdAndUpdate(id, 
    { $push: data },
    { new: true, runValidators: true } )
if(!partida) return res.status(400).send('partida no actualizada ')
    return res.status(200).json({message:'partida actualizada', partida})
    }catch(error){
        console.log(error)
        return res.status(500).send('error interno')
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
    const codigo=req.body.codigo
    // console.log(codigo)
    try{

        if (!codigo) {
            return res.status(400).send('Código no proporcionado.');
        }
const codi= await Partida.find({codigo:codigo})
console.log(codi)
if (!codi) {
    return res.status(404).send('Código no encontrado.');
}
return res.status(200).send(codi)
    }catch(error){
        console.log(error)
        return  res.status(500).send(error)
    }
}