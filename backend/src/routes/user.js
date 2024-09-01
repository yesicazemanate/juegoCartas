import { createUser } from "../controllers/user.controller.js";
import express from 'express'

const routes = express.Router()

routes.post('/register', createUser)

export default routes