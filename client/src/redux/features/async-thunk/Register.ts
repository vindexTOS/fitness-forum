import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'

interface RegisterPayload {
  name: string
  email: string
  password: string
}

const RegisterThunk = createAsyncThunk(
  'Register/mongo',
  async (val: RegisterPayload) => {
    const apiUrl = `http://localhost:3000/register`
    const cookies = new Cookies()
    if (val.name && val.email && val.password) {
      const { name, email, password } = val

      try {
        const data = await axios
          .post(apiUrl, { name, email, password })
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
          .catch((err) => console.log(err))

        return data
      } catch (error) {
        console.log(error)
      }
    }
  },
)

export { RegisterThunk }
