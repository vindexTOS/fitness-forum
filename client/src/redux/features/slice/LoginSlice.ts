import { createSlice } from '@reduxjs/toolkit'
import { LoginThunk } from '../async-thunk/LoginThunk'

import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
export type intialStateLoginType = {
  email: string
  password: string
  data: {}
  loading: boolean
  error: string | null
}

const initialState = {
  email: '',
  password: '',
  data: {},
  loading: false,
  error: null,
  realErro: '',
}

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getEmail: (state: intialStateLoginType, action) => {
      state.email = action.payload
    },
    getPassword: (state: intialStateLoginType, action) => {
      state.password = action.payload
    },
    getCookies: (state) => {
      const cookies = new Cookies()
      state.data = jwt(cookies.get('jwt_authorization'))
    },
    getError: (state, action: any) => {
      console.log(action.payload)
      state.realErro = action.payload
    },
    LogOut: (state) => {
      const cookies = new Cookies()
      state.data = {}
      cookies.remove('jwt_authorization')
    },
    getDataFromRegister: (state, action: any) => {
      state.data = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        console.log('padding')
        state.loading = true
        state.error = null
        state.data = {}
      })
      .addCase(LoginThunk.fulfilled, (state, action: any) => {
        console.log('fulfiled')

        state.loading = false
        state.error = null
        state.data = action.payload
      })
      .addCase(LoginThunk.rejected, (state, action: any) => {
        console.log('rejected')

        state.loading = false
        state.error = action.error
        state.data = {}
      })
  },
})

export default LoginSlice.reducer

export const {
  getEmail,
  getPassword,
  getCookies,
  LogOut,
  getError,
  getDataFromRegister,
} = LoginSlice.actions
