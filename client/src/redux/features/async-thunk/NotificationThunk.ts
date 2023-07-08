import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getNotifciation } from '../slice/NotificationSlice'
export type notificationType = {
  authorsID: string
  receiverID: string
  postID: string
  isRead: boolean
  reply: string
}

type getNotification = {
  dispatch: ThunkDispatch<any, any, any>
  userID: string
}

type notificationUpdateType = {
  isRead: boolean
  notificationID: string
}
export const NotificationThunk = createAsyncThunk(
  'notification/post',
  async (obj: notificationType) => {
    // const apiUrl = `http://localhost:3000/notification/create`
    const apiUrl = `https://fitness-forum-back.onrender.com/notification/create`

    await axios
      .post(apiUrl, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const NotificationData = createAsyncThunk(
  'notification/get',
  async (obj: getNotification) => {
    // const apiUrl = `http://localhost:3000/notification/${obj.userID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/notification/${obj.userID}`

    const data = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return data
  },
)

export const NotificationRead = createAsyncThunk(
  'notificatio/patch',
  async (obj: notificationUpdateType) => {
    // const apiUrl = `http://localhost:3000/notification/${obj.notificationID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/notification/${obj.notificationID}`

    await axios
      .patch(apiUrl, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
