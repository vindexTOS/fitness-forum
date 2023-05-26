import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  forumData: [],
  userData: [],
  votesData: [],
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
  },
})

export const {
  navigatePage,
  getForumData,
  getUserData,
  getVotesData,
} = GeneralSlices.actions
export default GeneralSlices.reducer
