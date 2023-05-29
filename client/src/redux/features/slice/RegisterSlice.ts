import { createSlice } from '@reduxjs/toolkit'
import { RegisterThunk } from '../async-thunk/Register'
type initialStateType = {
  name: string
  email: string
  password: string
  error: string | null
  loading: boolean
  bench?: number
  squat?: number
  deadlift?: number
  about?: string
}

const initialState = {
  name: '',
  email: '',
  data: {},
  password: '',
  error: null,
  loading: false,
  bench: 0,
  squat: 0,
  deadlift: 0,
  about: '',
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
    getBench: (state: initialStateType, action) => {
      state.bench = action.payload
    },
    getSquat: (state: initialStateType, action) => {
      state.squat = action.payload
    },
    getDeadlift: (state: initialStateType, action) => {
      state.deadlift = action.payload
    },
    getAbout: (state: initialStateType, action) => {
      state.about = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.data = {}
      })
      .addCase(RegisterThunk.fulfilled, (state, action: any) => {
        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(RegisterThunk.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.error
        state.data = {}
      })
  },
})

export default RegisterSlice.reducer
export const {
  getName,
  getEmail,
  getPassword,
  getAbout,
  getDeadlift,
  getSquat,
  getBench,
} = RegisterSlice.actions
