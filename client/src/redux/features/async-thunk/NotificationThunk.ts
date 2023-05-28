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

export const NotificationThunk = createAsyncThunk(
  'notification/post',
  async (obj: notificationType) => {
    const apiUrl = `http://localhost:3000/notification/create`
    await axios
      .post(apiUrl, obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const NotificationData = createAsyncThunk(
  'notification/get',
  async (obj: getNotification) => {
    const apiUrl = `http://localhost:3000/notification/${obj.userID}`

    await axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data)
        obj.dispatch(getNotifciation(res.data))
      })
      .catch((err) => console.log(err))
  },
)