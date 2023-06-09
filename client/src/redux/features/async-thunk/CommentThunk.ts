import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
type GetAllComments = {
  dispatch: ThunkDispatch<any, any, any>
  postID: string
  pages: string
}
type CommentThunkType = {
  comment: string
  postID: string
  userID: string
}

type commentReply = {
  reply: [{ comment: string; userID: string }]
}

export const PostCommentThunk = createAsyncThunk(
  'comment/post',
  async ({ data }: { data: CommentThunkType }) => {
    // const apiUrl = `http://localhost:3000/post/comment`

    const apiUrl = `https://fitness-forum-back.onrender.com/post/comment`

    const { comment, userID, postID } = data
    await axios
      .post(apiUrl, { comment, userID, postID })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const GetCommentThunk = createAsyncThunk(
  'comment/get',
  async (val: GetAllComments) => {
    // const apiUrl = `http://localhost:3000/post/comment/${
    //   val.postID
    // }/?page=${String(val.pages)}&limit=10`
    const apiUrl = `https://fitness-forum-back.onrender.com/post/comment/${
      val.postID
    }/?page=${String(val.pages)}&limit=10`

    const data = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return data
  },
)

export const DeleteCommentThunk = createAsyncThunk(
  'comment/delete',
  async (commentID: string) => {
    // const apiUrl = `http://localhost:3000/post/comment/${commentID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/post/comment/${commentID}`

    await axios
      .delete(apiUrl)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const UpdateCommentThunk = createAsyncThunk(
  'comment/update',
  async ({ commentID, comment }: { commentID: string; comment: string }) => {
    // const apiUrl = `http://localhost:3000/post/comment/${commentID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/post/comment/${commentID}`

    await axios
      .patch(apiUrl, { comment })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)

export const Addreply = createAsyncThunk(
  'comment-replay/patch',
  async ({ replyID, reply }: { replyID: string; reply: any }) => {
    // const apiUrl = `http://localhost:3000/post/comment/reply/${replyID}`
    const apiUrl = `https://fitness-forum-back.onrender.com/post/comment/reply/${replyID}`

    await axios
      .patch(apiUrl, reply)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  },
)
