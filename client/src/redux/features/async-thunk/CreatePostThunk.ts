import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface PostThunk {
  title: string
  post: string
  photo?: string
  forumID: string
  userID: string
}

export const CreatePostThunk = createAsyncThunk(
  'post/post',
  async (val: PostThunk) => {
    const apiUrl = `http://localhost:3000/posts`
    const { title, post, photo, forumID, userID } = val
    try {
      const withPhoto = { title, post, photo, forumID, userID }
      if (title && post && forumID && userID) {
        await axios
          .post(apiUrl, withPhoto)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      }
    } catch (error) {
      console.log(error)
    }
  },
)
