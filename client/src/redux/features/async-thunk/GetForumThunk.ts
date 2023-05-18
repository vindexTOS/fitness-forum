import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getForumData } from '../slice/GeneralSlice'
interface GetThreadType {
  dispatch: ThunkDispatch<any, any, any>
}

export const GetForumThunk = createAsyncThunk(
  'thread/get',
  async (val: GetThreadType) => {
    let apiUrl = `http://localhost:3000/forums`
    try {
      const data = await axios
        .get(apiUrl)
        .then((res) => res.data)
        .catch((err) => console.log(err))

      val.dispatch(getForumData(data))
    } catch (error) {
      console.log(error)
    }
  },
)
