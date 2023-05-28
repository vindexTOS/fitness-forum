import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notificationData: {},
}

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotifciation: (state, action) => {
      state.notificationData = action.payload
    },
  },
})

export const { getNotifciation } = NotificationSlice.actions
export default NotificationSlice.reducer
