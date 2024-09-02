import express from 'express';

import routerUser from './user.js'
import routerPartida from './partida.js'
import { createPuntaje, updatePuntajeByIdUser, getPuntajeByIdUser, getPuntajes, deletePuntajeByIdUser } from "../controllers/Puntaje.js";
const router = express.Router();
router.use('/partida', routerPartida)
router.use('/user', routerUser)


// Puntaje
router.post('/crearPuntaje', createPuntaje);
router.get('/obtenerTodosPuntaje', getPuntajes);
router.get('/puntajePorUser/:idUser', getPuntajeByIdUser);
router.put('/actualizarPuntaje/:idUser', updatePuntajeByIdUser);
router.delete('/deletePuntaje/:idUser', deletePuntajeByIdUser);

export default router;
