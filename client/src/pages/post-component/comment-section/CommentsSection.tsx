import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCommentThunk } from '../../../redux/features/async-thunk/CommentThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import CommentCard from './CommentCard'
export type CommentType = {
  comment: string
  _id: string
  userID: string
  postID: string
  date: string
  user: {
    avatar: string
    name: string
    _id: string
  }
  reply: any
}
const CommentsSection = () => {
  const allComments = useSelector(
    (state: any) => state.CommentReducer.allComments,
  )
  const { postID } = useParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    if (postID) {
      dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
    }
  }, [postID])
  const style = {
    comment: `bg-[#262525] text-gray-400 w-[80%] flex flex-col gap-2`,
  }

  if (allComments) {
    return (
      <div
        className={style.comment}
        // onClick={() => console.log(allComments.comments)}
      >
        {allComments.comments?.map((val: CommentType) => (
          <CommentCard key={val._id} data={val} />
        ))}
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

export default CommentsSection
