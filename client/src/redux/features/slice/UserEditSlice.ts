import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  benchValue: 0,
}

const userEditSlice = createSlice({
  name: 'user-edit',
  initialState,
  reducers: {
    getBench: (state, action) => {
      state.benchValue = action.payload
    },
  },
})

export default userEditSlice.reducer

export const { getBench } = userEditSlice.actions
