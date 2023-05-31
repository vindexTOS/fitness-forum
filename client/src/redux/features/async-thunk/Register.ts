import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { getError } from '../slice/LoginSlice'

export type DescriptionType = {
  bench?: number
  squat?: number
  deadlift?: number
  about?: string
}
interface RegisterPayload {
  name: string
  email: string
  password: string
  url?: string
  description: DescriptionType

  dispatch: ThunkDispatch<any, any, any>
}

const RegisterThunk = createAsyncThunk(
  'Register/mongo',
  async (val: RegisterPayload) => {
    // const apiUrl = `http://localhost:3000/register`
    const apiUrl = `https://fitness-forum-back.onrender.com/register`

    const cookies = new Cookies()
    if (val.name && val.email && val.password) {
      const { name, email, password, url, description } = val

      try {
        const data = await axios
          .post(apiUrl, { name, email, password, avatar: url, description })
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

        return data
      } catch (error) {
        const errr: any = error
        val.dispatch(getError(errr.response.data.msg))

        console.log(error)
      }
    }
  },
)

export { RegisterThunk }
