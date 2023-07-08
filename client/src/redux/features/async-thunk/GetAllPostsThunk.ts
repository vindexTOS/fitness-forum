import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
interface GetThreadType {
  dispatch: ThunkDispatch<any, any, any>
  pages: any
  search: string
}
export const GetAllPostsThunk = createAsyncThunk(
  'allposts/get',
  async (val: GetThreadType) => {
    // const apiUrl = `http://localhost:3000/posts/?page=${String(
    //   val.pages,
    // )}&limit=5${val.search}`

    const apiUrl = `https://fitness-forum-back.onrender.com/posts/?page=${String(
      val.pages,
    )}&limit=5${val.search}`

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
