import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
interface GetThreadType {
  dispatch: ThunkDispatch<any, any, any>
  forumID: string
  pages: any
}

export const GetThreadThunk = createAsyncThunk(
  'thread/get',
  async (val: GetThreadType) => {
    // let apiUrl = `http://localhost:3000/threads/${val.forumID}/?page=${String(
    //   val.pages,
    // )}&limit=10`

    const apiUrl = `https://fitness-forum-back.onrender.com/threads/${
      val.forumID
    }/?page=${String(val.pages)}&limit=10`

    try {
      const data = await axios
        .get(apiUrl)
        .then((res) => res.data)
        .catch((err) => console.log(err))

      return data
    } catch (error) {
      console.log(error)
    }
  },
)
