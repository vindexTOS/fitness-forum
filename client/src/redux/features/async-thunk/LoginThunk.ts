import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { getError } from '../slice/LoginSlice'

interface LoginThunkType {
  email: string
  password: string
  dispatch: ThunkDispatch<any, any, any>
}

export const LoginThunk = createAsyncThunk(
  'Login/mongo',
  async (val: LoginThunkType) => {
    // const apiUrl = `http://localhost:3000/login`
    const apiUrl = `https://fitness-forum-back.onrender.com/login`

    const cookies = new Cookies()

    if (val.email && val.password) {
      const { email, password } = val

      try {
        const res = await axios.post(apiUrl, { email, password })
        const token = res.data.token
        localStorage.setItem('token', token)

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const decode: any = jwt(token)

        cookies.set('jwt_authorization', token, {
          expires: new Date(decode.exp * 1000),
        })

        return decode
      } catch (err) {
        const errr: any = err
        val.dispatch(getError(errr.response.data.msg))

        console.log(err)
        throw err
      }
    }
  },
)
