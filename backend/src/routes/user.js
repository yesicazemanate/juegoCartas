import { createUser,decodeToken, obtenerUserId } from "../controllers/user.controller.js";
import { InicioSesionPost } from "../controllers/inicioSesion.js"; 

import express from 'express'

const routes = express.Router()
routes.post('/inicioSesion', InicioSesionPost);
routes.post('/register', createUser)
routes.get('/:id', obtenerUserId)
routes.post('/', decodeToken)

export default routes