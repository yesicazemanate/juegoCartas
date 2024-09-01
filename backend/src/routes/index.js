import express from 'express';
import { InicioSesionPost } from "../controllers/inicioSesion.js"; 
import routerUser from './user.js'
import { createPuntaje, updatePuntajeByIdUser, getPuntajeByIdUser, getPuntajes, deletePuntajeByIdUser } from "../controllers/Puntaje.js";
const router = express.Router();

router.use('/user', routerUser)
router.post('/inicioSesion', InicioSesionPost);

// Puntaje
router.post('/crearPuntaje', createPuntaje);
router.get('/obtenerTodosPuntaje', getPuntajes);
router.get('/puntajePorUser/:idUser', getPuntajeByIdUser);
router.put('/actualizarPuntaje/:idUser', updatePuntajeByIdUser);
router.delete('/deletePuntaje/:idUser', deletePuntajeByIdUser);

export default router;
