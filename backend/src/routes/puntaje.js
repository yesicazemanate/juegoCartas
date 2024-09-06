import express from 'express'
import { createPartida, obtenerPartida, obtenerPartidas, updatePartida, deletePartida, compararCodigo } from '../controllers/partida.controller.js'
const routes = express.Router()

routes.post('/', createPartida)
routes.get('/', obtenerPartidas)
routes.get('/:id', obtenerPartida)
routes.patch('/:id', updatePartida)
routes.delete('/:id', deletePartida)
routes.post('/comparar', compararCodigo)

export default routes

