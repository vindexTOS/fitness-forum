import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const UpVoteThunk = createAsyncThunk(
  'upvote/patch',
  async ({
    id,
    query,
    userID,
    voteType,
  }: {
    id: string

    userID: string
    query: string
    voteType: boolean
  }) => {
    const apiUrl = `http://localhost:3000/post/${query}/${id}`

    await axios
      .patch(apiUrl, { userID, voteType })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const DeleteVote = createAsyncThunk(
  'downvote/patch',
  async ({
    id,

    userID,
    voteType,
  }: {
    id: string

    userID: string
    voteType: boolean
  }) => {
    const apiUrl = `http://localhost:3000/post/${voteType}/${id}`

    await axios
      .delete(apiUrl, { data: { userID } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
