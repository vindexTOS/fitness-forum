import { createSlice } from '@reduxjs/toolkit'
import { GetCommentThunk } from '../async-thunk/CommentThunk'
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
  },
  extraReducers: (builder) => {
    builder.addCase(GetCommentThunk.fulfilled, (state, action) => {
      state.allComments = action.payload
    })
  },
})

export default CommentSlice.reducer

export const { getComment } = CommentSlice.actions
