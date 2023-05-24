import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCommentThunk } from '../../../redux/features/async-thunk/FireStoreThunks/CommentThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import CommentCard from './CommentCard'
export type CommentType = {
  comment: string
  _id: string
  userID: string
  postID: string
  user: {
    avatar: string
    name: string
    _id: string
  }
}
const CommentsSection = () => {
  const allComments = useSelector(
    (state: any) => state.CommentReducer.allComments,
  )
  const { postID } = useParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    if (postID) {
      dispatch(GetCommentThunk({ dispatch, postID }))
    }
  }, [postID])
  if (allComments) {
    return (
      <div>
        {allComments?.map((val: CommentType) => (
          <CommentCard key={val._id} data={val} />
        ))}
      </div>
    )
  } else {
    return <div>Loading</div>
  }
}

export default CommentsSection
