import { createSlice } from '@reduxjs/toolkit'
import { GetForumThunk } from '../async-thunk/GetForumThunk'
import { UserDataThunk } from '../async-thunk/UserDataThunk'
import { GetVotes } from '../async-thunk/UpVoteDownVoteThunks'
const initialState = {
  page: 1,
  forumData: [],
  userData: [],
  votesData: [],
  shareBoolean: false,
}

const GeneralSlices = createSlice({
  name: 'general',
  initialState,
  reducers: {
    navigatePage: (state, action) => {
      state.page = action.payload
    },
    getForumData: (state, action) => {
      state.forumData = action.payload
    },
    getUserData: (state, action) => {
      state.userData = action.payload
    },
    getVotesData: (state, action) => {
      state.votesData = action.payload
    },
    sharePopUp: (state) => {
      state.shareBoolean = !state.shareBoolean
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetForumThunk.fulfilled, (state, action) => {
      state.forumData = action.payload
    })
    builder.addCase(UserDataThunk.fulfilled, (state, action) => {
      state.userData = action.payload
    })
    builder.addCase(GetVotes.fulfilled, (state, action) => {
      state.votesData = action.payload
    })
  },
})

export const {
  navigatePage,
  getForumData,
  getUserData,
  getVotesData,
  sharePopUp,
} = GeneralSlices.actions
export default GeneralSlices.reducer
