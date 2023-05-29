import { createSlice } from '@reduxjs/toolkit'
import { GetAllPostsThunk } from '../async-thunk/GetAllPostsThunk'
const initialState = {
  data: [],
  error: null,
  loading: false,
  search: '',
}

const GetAllPostSlice = createSlice({
  name: 'getAllPosts',
  initialState,
  reducers: {
    getAllPost: (state, action) => {
      // console.log('hi')
      state.data = action.payload
    },
    getSearch: (state, action) => {
      state.search = action.payload
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(GetAllPostsThunk.pending, (state) => {
  //         state.loading = true
  //         state.error = null
  //         state.data = []
  //       })
  //       .addCase(GetAllPostsThunk.fulfilled, (state, action: any) => {
  //         state.loading = false
  //         state.error = null
  //         state.data = action.payload
  //       })
  //       .addCase(GetAllPostsThunk.rejected, (state, action: any) => {
  //         state.loading = false
  //         state.error = action.error
  //         state.data = []
  //       })
  //   },
})

export const { getAllPost, getSearch } = GetAllPostSlice.actions

export default GetAllPostSlice.reducer
