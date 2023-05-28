import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  PostCommentThunk,
  GetCommentThunk,
} from '../../../redux/features/async-thunk/CommentThunk'
import { getComment } from '../../../redux/features/slice/CommentSlice'
import { useNavigate } from 'react-router-dom'

type CommentProp = {
  name: string
  postID: string
}
export type DataType = {
  data: CommentProp
}

const CommentPost: FC<DataType> = ({ data }) => {
  const comment = useSelector((state: any) => state.CommentReducer.comment)
  const userInfo = useSelector((state: any) => state.LoginReducer.data)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  const { postID } = data
  const makeComment = async () => {
    if (userInfo.user) {
      const { _id, name } = userInfo?.user

      const commentObj = { userID: _id, postID, comment }
      if (comment) {
        await dispatch(PostCommentThunk({ data: commentObj }))
        dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
        dispatch(getComment(''))
      } else {
        console.log('erro')
      }
    }
  }

  const style = {
    mainDiv: `w-[80%]  max_smm:w-[100%] bg-[#262525] flex items-center jusify-center gap-5 py-10 flex-col`,
    p: `w-[90%] text-gray-400 flex  gap-2`,
    textarea: `w-[90%]  max_smm:w-[100%] text-gray-300 h-[200px] max-h-[400px] min-h-[150px] rounded-[3px] bg-[#363434] p-2 outline-none`,
    btn: `  text-white bg-gradient-to-r from-[#cf1b4e] via-[#cf1b4e] to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm    text-center w-[9rem] h-[2rem] `,
  }
  if (userInfo && userInfo?.user) {
    const { _id, name } = userInfo?.user
    return (
      <div className={style.mainDiv}>
        <p className={style.p}>
          Comment as
          <span className="text-blue-300 hover:underline text-blue-400 cursor-pointer">
            {name}
          </span>
        </p>
        <textarea
          value={comment}
          placeholder="Whar are your thoughts?"
          onChange={(e) => dispatch(getComment(e.target.value))}
          className={style.textarea}
        ></textarea>
        <div className="w-[90%] flex items-end justify-end">
          <button className={style.btn} onClick={() => makeComment()}>
            Comment
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className={style.mainDiv}>
        <h1 className="text-white text-[1rem]">
          If you want to comment on this post{' '}
          <span
            onClick={() => navigate(`/login`)}
            className="text-blue-300 font-bold hover:text-blue-400 hover:underline cursor-pointer"
          >
            Log-in
          </span>{' '}
          or{' '}
          <span
            onClick={() => navigate(`/register`)}
            className="text-red-400 font-bold hover:text-red-500 hover:underline cursor-pointer"
          >
            Register
          </span>
        </h1>
      </div>
    )
  }
}

export default CommentPost
