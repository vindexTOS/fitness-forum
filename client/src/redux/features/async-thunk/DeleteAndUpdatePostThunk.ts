import { createAsyncThunk } from '@reduxjs/toolkit'
import { PostThunk } from './CreatePostThunk'
import axios from 'axios'
interface DeletAndUpdate {
  id: string
  update?: { title: string; post: string; date: Date }
  voteID?: string
}

export const DeletePost = createAsyncThunk(
  'post/delete',
  async (val: DeletAndUpdate) => {
    const apiUrl = `http://localhost:3000/post/${val.id}`
    console.log(val.id)
    await axios
      .delete(apiUrl)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    const voteUrl = `http://localhost:3000/vote/delte${val.voteID}`
    await axios
      .delete(voteUrl)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const UpdatePost = createAsyncThunk(
  'post/update',
  async (val: DeletAndUpdate) => {
    const apiUrl = `http://localhost:3000/post/${val.id}`
    console.log(val.id)
    await axios
      .patch(apiUrl, val.update)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
