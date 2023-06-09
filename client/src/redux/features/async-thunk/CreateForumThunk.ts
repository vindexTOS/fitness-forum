import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ThreadType {
  name: string
  avatar?: string
  description: string
  forumID: string
  adminID: string
  color1: string
  color2: string
}

export const CreateThreadThunk = createAsyncThunk(
  'thread/post',
  async (val: ThreadType) => {
    const { name, avatar, description, forumID, adminID, color1, color2 } = val
    // const apiUrl = `http://localhost:3000/create-thread`
    const apiUrl = `https://fitness-forum-back.onrender.com/create-thread`

    console.log('triggered')
    try {
      if (name && description && forumID && adminID) {
        await axios
          .post(apiUrl, {
            name,
            avatar,
            description,
            forumID,
            adminID,
            color1,
            color2,
          })
          .then((res) => res)
          .catch((err) => console.log(err))
      }
      console.log('succsessful')
    } catch (error) {
      console.log(error)
    }
  },
)
