import { createSlice } from '@reduxjs/toolkit'
import { RegisterThunk } from '../async-thunk/Register'
type initialStateType = {
  name: string
  email: string
  password: string
  error: string | null
  loading: boolean
}

const initialState = {
  name: '',
  email: '',
  password: '',
  error: null,
  loading: false,
}

const RegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    getName: (state: initialStateType, action) => {
      state.name = action.payload
    },
    getEmail: (state: initialStateType, action) => {
      state.email = action.payload
    },
    getPassword: (state: initialStateType, action) => {
      state.password = action.payload
    },
    errorHandle: (state: initialStateType, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(RegisterThunk.fulfilled, (state, action: any) => {
        state.loading = false
        state.error = null
      })
      .addCase(RegisterThunk.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export default RegisterSlice.reducer
export const {
  getName,
  getEmail,
  getPassword,
  errorHandle,
} = RegisterSlice.actions
