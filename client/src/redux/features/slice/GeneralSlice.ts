import { createSlice } from '@reduxjs/toolkit'

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
})

export const {
  navigatePage,
  getForumData,
  getUserData,
  getVotesData,
  sharePopUp,
} = GeneralSlices.actions
export default GeneralSlices.reducer
