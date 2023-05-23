import express from 'express'
import { getThread, getForum } from '../controllers/forumController.js'
import {
  getAllPosts,
  postData,
  getUserData,
  deleteData,
  updateUser,
  updateData,
} from '../controllers/controllers.js'
import { authMiddleware, authRole } from '../middleware/auth.js'
import { createThread } from '../controllers/forumController.js'
import { register, login } from '../controllers/authControllers.js'
const router = express.Router()
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/create-thread').post(authRole('admin'), createThread)
router.route('/posts').get(getAllPosts).post(authMiddleware, postData)
router
  .route('/post/:id')
  .delete(authMiddleware, deleteData)
  .patch(authMiddleware, updateData)
router.get('/threads/:forumID', getThread)
router.get('/forums', getForum)
router.get('/api/v1/user', getUserData)
router.patch('/api/v1/user/:userId', authMiddleware, updateUser)
export default router
