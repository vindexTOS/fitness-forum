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
import { createThread } from '../controllers/forumController.js'
import { register, login } from '../controllers/authControllers.js'
const router = express.Router()
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/create-thread').post(createThread)
router.route('/posts').get(getAllPosts).post(postData)
router.route('/post/:id').delete(deleteData).patch(updateData)
router.get('/threads/:forumID', getThread)
router.get('/forums', getForum)
router.get('/api/v1/user', getUserData)
router.patch('/api/v1/user/:userId', updateUser)
export default router
