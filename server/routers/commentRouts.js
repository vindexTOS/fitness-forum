import express from 'express'
import {
  makeComment,
  getComments,
  deleteComment,
} from '../controllers/commentControllers.js'
import { authMiddleware } from '../middleware/auth.js'
const commentRouter = express.Router()

commentRouter.route('/comment').post(authMiddleware, makeComment)
commentRouter.route('/comment/:id').get(getComments)
commentRouter.route('/comment/:commentID').delete(authMiddleware, deleteComment)
export default commentRouter
