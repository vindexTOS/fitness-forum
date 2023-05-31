import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserData } from '../slice/GeneralSlice'
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { DescriptionType } from './Register'
type UserDataThunkProp = {
  dispatch: ThunkDispatch<any, any, any>
}
type UserInfo = {
  name: string

  avatar: string
  description: DescriptionType
}
export const UserDataThunk = createAsyncThunk(
  'user-data/get',
  async (val: UserDataThunkProp) => {
    // const apiUrl = `http://localhost:3000/api/v1/user`
    const apiUrl = `https://fitness-forum-back.onrender.com/api/v1/user`

    const data = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    val.dispatch(getUserData(data))
  },
)

export const UpdateUser = createAsyncThunk(
  'user/update',
  async ({ userID, obj }: { userID: string; obj: UserInfo }) => {
    // const apiUrl = `http://localhost:3000/api/v1/user/${userID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/api/v1/user/${userID}`

    await axios
      .patch(apiUrl, obj)
      .then((res) => {
        console.log(res)
        const cookies = new Cookies()
        cookies.remove('jwt_authorization')
        console.log(res.data.user)
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
  },
)
