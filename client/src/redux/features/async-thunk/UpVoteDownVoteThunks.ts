import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getVotesData } from '../slice/GeneralSlice'
import axios from 'axios'
type getVoteType = {
  dispatch: ThunkDispatch<any, any, any>
  userID: string
}
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

export const GetVotes = createAsyncThunk(
  'getvote/get',
  async (val: getVoteType) => {
    const apiUrl = `http://localhost:3000/votes/${val.userID}`

    const data = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch((err) => console.log(err))
    val.dispatch(getVotesData(data))
  },
)
