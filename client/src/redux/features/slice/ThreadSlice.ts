import { createSlice } from '@reduxjs/toolkit'
import { GetThreadThunk } from '../async-thunk/GetThreadsThunk'
const initialState = {
  forumID: '',
  data: {},
  loading: false,
  error: null,
}

const ThreadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    getPostData: (state, action) => {
      state.data = action.payload
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(GetThreadThunk.pending, (state) => {
  //       state.loading = true
  //       state.error = null
  //       state.data = {}
  //     })
  //     .addCase(GetThreadThunk.fulfilled, (state, action: any) => {
  //       state.loading = false
  //       state.error = null
  //       state.data = action.payload
  //     })
  //     .addCase(GetThreadThunk.rejected, (state, action: any) => {
  //       state.loading = false
  //       state.error = action.error
  //       state.data = {}
  //     })
  // },
})

export const { getPostData } = ThreadSlice.actions

export default ThreadSlice.reducer
