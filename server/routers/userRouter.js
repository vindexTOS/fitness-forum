import express from 'express'
import { verifyToken } from '../middleware/auth'
import { getUser } from '../controllers/userController.js'

const route = express.Router()

route.route.get('/protected', verifyToken, getUser)

export default route
