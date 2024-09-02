import { createUser } from "../controllers/user.controller.js";
import { InicioSesionPost } from "../controllers/inicioSesion.js"; 
import express from 'express'

const routes = express.Router()
routes.post('/inicioSesion', InicioSesionPost);
routes.post('/register', createUser)

export default routes