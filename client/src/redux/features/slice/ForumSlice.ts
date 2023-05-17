import { createSlice } from '@reduxjs/toolkit'
import { CreateThreadThunk } from '../async-thunk/CreateForumThunk'
type inistialStateForumType = {
  name: string
  avatar: string
  description: string
  forumID: string
  adminID: string
  data: {}
  loading: boolean
  error: string | null
  forumIDParams: string
}

const initialState = {
  forumIDParams: '',
  forumID: '',
  name: '',
  avatar: '',
  description: '',

  adminID: '',
  data: {},
  loading: false,
  error: null,
}

const ThreadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    getName: (state: inistialStateForumType, action) => {
      state.name = action.payload
    },
    getAvatar: (state: inistialStateForumType, action) => {
      state.avatar = action.payload
    },
    getDescription: (state: inistialStateForumType, action) => {
      state.description = action.payload
    },
    getForumID: (state: inistialStateForumType, action) => {
      state.forumID = action.payload
    },
    getForumIDparams: (state, action) => (state.forumIDParams = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateThreadThunk.pending, (state) => {
        console.log('padding')
        state.loading = true
        state.error = null
        state.data = {}
      })
      .addCase(CreateThreadThunk.fulfilled, (state, action: any) => {
        console.log('fulfiled')

        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(CreateThreadThunk.rejected, (state, action: any) => {
        console.log('rejected')

        state.loading = false
        state.error = action.error
        state.data = {}
      })
  },
})

export default ThreadSlice.reducer

export const {
  getName,
  getAvatar,
  getDescription,
  getForumID,
  getForumIDparams,
} = ThreadSlice.actions
