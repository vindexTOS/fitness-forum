import { createSlice } from '@reduxjs/toolkit'
import { NotificationData } from '../async-thunk/NotificationThunk'
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
  extraReducers: (builder) => {
    builder.addCase(NotificationData.fulfilled, (state, action) => {
      state.notificationData = action.payload
    })
  },
})

export const { getNotifciation } = NotificationSlice.actions
export default NotificationSlice.reducer
