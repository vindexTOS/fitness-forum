import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  post: '',
  photo: '',
}

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getTitle: (state, action) => {
      state.title = action.payload
    },

    getPost: (state, action) => {
      state.post = action.payload
    },

    getPhoto: (state, action) => {
      state.photo = action.payload
    },
  },
})

export const { getTitle, getPost, getPhoto } = PostSlice.actions

export default PostSlice.reducer
