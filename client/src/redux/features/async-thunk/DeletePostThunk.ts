import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
interface DeletThunk {
  id: string
}
export const DeletePost = createAsyncThunk(
  'post/delete',
  async (val: DeletThunk) => {
    const apiUrl = `http://localhost:3000/post/${val.id}`
    console.log(val.id)
    await axios
      .delete(apiUrl)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
