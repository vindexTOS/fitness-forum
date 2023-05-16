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
    const apiUrl = `http://localhost:3000/login`
    const cookies = new Cookies()

    if (val.email && val.password) {
      const { email, password } = val

      try {
        const data = await axios
          .post(apiUrl, { email, password })
          .then((res) => {
            const token = res.data.token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const decode: any = jwt(token)

            cookies.set(`jwt_authorization`, token, {
              expires: new Date(decode.exp * 1000),
            })
            const userCookieData = jwt(cookies.get('jwt_authorization'))

            return userCookieData
          })
          .catch((err) => {
            val.dispatch(getError(err.response.data.msg))
            console.log(err)
          })
        console.log(data)
        return data
      } catch (error) {
        const err: any = error
        val.dispatch(getError(err))

        console.log(error)
      }
    }
  },
)
