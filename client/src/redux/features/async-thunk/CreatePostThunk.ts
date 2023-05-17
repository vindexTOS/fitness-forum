import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface PostThunk {
  title: string
  post: string
  photo: string
  forumID: string
  userID: string
}

export const CreatePostThunk = createAsyncThunk(
  'post/post',
  async (val: PostThunk) => {
    const apiUrl = `http://localhost:3000/posts`
    const { title, post, photo, forumID, userID } = val
    try {
      if (title && post && photo && forumID && userID) {
        await axios
          .post(apiUrl, { title, post, photo, forumID, userID })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      }
    } catch (error) {
      console.log(error)
    }
  },
)
