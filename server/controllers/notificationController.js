import Notification from '../models/notificationModel.js'

export const createNotification = async (req, res) => {
  const { receiverID, commentID, postID, isRead, reply, authorsID } = req.body

  if (!receiverID) {
    res.status(400).json({ msg: 'No User ID provided' })
  }
  const notee = await Notification.create({
    receiverID,
    commentID,
    postID,
    isRead,
    reply,
    authorsID,
  })
}

export const getNotifications = async (req, res) => {
  const { notificationID } = req.params

  try {
    const notifications = await Notification.find({
      receiverID: notificationID,
    })
    res.status(200).json(notifications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to retrieve notifications' })
  }
}
