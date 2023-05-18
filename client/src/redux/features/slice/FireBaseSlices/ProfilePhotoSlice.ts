import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface PhotoState {
  url: string
}
const initialState: PhotoState = {
  url: '',
}

const FireBasePhotoSlice = createSlice({
  name: 'profile-photo',
  initialState,
  reducers: {
    getPhotoUrl: (state, action) => {
      console.log(action.payload)
      state.url = action.payload
    },
  },
})

export const { getPhotoUrl } = FireBasePhotoSlice.actions

export default FireBasePhotoSlice.reducer
