import express from 'express'
import { register, login } from '../controllers/authControllers.js'
import { getUser } from '../controllers/userController.js'
import { verifyToken } from '../middleware/auth.js'
const authRouter = express.Router()

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/protected').get(verifyToken, getUser)
export default authRouter
