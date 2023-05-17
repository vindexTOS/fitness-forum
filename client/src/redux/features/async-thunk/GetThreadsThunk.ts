import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getPostData } from '../slice/ThreadSlice'
interface GetThreadType {
  dispatch: ThunkDispatch<any, any, any>
  forumID: string
}

export const GetThreadThunk = createAsyncThunk(
  'thread/get',
  async (val: GetThreadType) => {
    let apiUrl = `http://localhost:3000/threads/${val.forumID}`
    try {
      const data = await axios
        .get(apiUrl)
        .then((res) => res.data)
        .catch((err) => console.log(err))

      val.dispatch(getPostData(data))
    } catch (error) {
      console.log(error)
    }
  },
)
