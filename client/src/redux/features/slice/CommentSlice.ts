import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comment: '',
  allComments: [],
}

const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getComment: (state, action) => {
      state.comment = action.payload
    },
    getAllComments: (state, action) => {
      state.allComments = action.payload
    },
  },
})

export default CommentSlice.reducer

export const { getComment, getAllComments } = CommentSlice.actions
