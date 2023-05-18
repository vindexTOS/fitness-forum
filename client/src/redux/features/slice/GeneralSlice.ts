import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  forumData: [],
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
  },
})

export const { navigatePage, getForumData } = GeneralSlices.actions
export default GeneralSlices.reducer
