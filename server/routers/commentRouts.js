import express from 'express'
import { makeComment, getComments } from '../controllers/commentControllers.js'
import { authMiddleware } from '../middleware/auth.js'
const commentRouter = express.Router()

commentRouter.route('/comment').post(authMiddleware, makeComment)
commentRouter.route('/comment/:id').get(getComments)
export default commentRouter
