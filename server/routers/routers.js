import express from 'express'
import { getThread, getForum } from '../controllers/forumController.js'
import { getData, postData } from '../controllers/controllers.js'
import { createThread } from '../controllers/forumController.js'
import { register, login } from '../controllers/authControllers.js'
const router = express.Router()
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/create-thread').post(createThread)
router.route('/posts').get(getData).post(postData)
router.get('/threads/:forumID', getThread)
router.get('/forums', getForum)
export default router
