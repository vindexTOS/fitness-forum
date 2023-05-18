import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface PhotoState {
  url: string
  image: File | null
}
const initialState: PhotoState = {
  url: '',
  image: null,
}

const FireBasePhotoSlice = createSlice({
  name: 'profile-photo',
  initialState,
  reducers: {
    getPhoto: (state, action: PayloadAction<File>) => {
      state.image = action.payload
    },
  },
})

export const { getPhoto } = FireBasePhotoSlice.actions

export default FireBasePhotoSlice.reducer
