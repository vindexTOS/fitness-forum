import express from 'express'
import { verifyToken } from '../middleware/auth'
import { getUser } from '../controllers/userController.js'

const route = express.Router()

route.route.get('/:id', verifyToken, getUser)

export default route
