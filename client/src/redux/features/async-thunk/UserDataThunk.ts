import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserData } from '../slice/GeneralSlice'
import axios from 'axios'

type UserDataThunkProp = {
  dispatch: ThunkDispatch<any, any, any>
}

export const UserDataThunk = createAsyncThunk(
  'user-data/get',
  async (val: UserDataThunkProp) => {
    const apiUrl = `http://localhost:3000/api/v1/user`

    const data = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    val.dispatch(getUserData(data))
  },
)
