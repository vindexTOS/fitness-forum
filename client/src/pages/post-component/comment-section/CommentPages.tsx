import { ThunkDispatch } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetCommentThunk } from '../../../redux/features/async-thunk/CommentThunk'
const CommentPages = ({ postID }: { postID: string }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigtion = useNavigate()
  const { pages, forumID } = useParams()
  const allComments = useSelector(
    (state: any) => state.CommentReducer.allComments,
  )
  return (
    <div className="   gap-3 items-center justify-center flex   outline ">
      {new Array(allComments.totalPages)
        .fill('')
        .map((val: string, index: number) => (
          <p
            onClick={() => {
              navigtion(`/${forumID}/${postID}/${String(index + 1)}`)
              dispatch(
                GetCommentThunk({ dispatch, postID, pages: String(index + 1) }),
              )
            }}
            className={` text-[1.3rem]  cursor-pointer ${
              Number(pages) === index + 1 ? 'text-blue-400' : `text-white`
            } `}
            key={index}
          >
            {index + 1}
          </p>
        ))}
    </div>
  )
}

export default CommentPages
