import expres from 'express'
import {
  createNotification,
  getNotifications,
} from '../controllers/notificationController.js'

const notificationRouter = expres.Router()

// notification/create
notificationRouter.route('/create').post(createNotification)
notificationRouter.route('/:notificationID').get(getNotifications)

export default notificationRouter
