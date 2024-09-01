import express from 'express'
import { createPartida, obtenerPartida, obtenerPartidas, updatePartida, deletePartida } from '../controllers/partida.controller.js'
const routes = express.Router()

routes.post('/', createPartida)
routes.get('/', obtenerPartidas)
routes.get('/:id', obtenerPartida)
routes.patch('/:id', updatePartida)
routes.delete('/:id', deletePartida)

export default routes


