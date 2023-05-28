import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetCommentThunk } from '../../../redux/features/async-thunk/CommentThunk'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import useScrollHandler from '../../../Hooks/useScrollHandler'
import { UpVoteThunk } from '../../../redux/features/async-thunk/UpVoteDownVoteThunks'
const CommentPages = ({ postID }: { postID: string }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigation = useNavigate()
  const { pages, forumID } = useParams()
  const allComments = useSelector(
    (state: any) => state.CommentReducer.allComments,
  )

  const { scrollRef, handleScroll } = useScrollHandler()

  const pageSlider = (direction: string) => {
    if (direction === 'right') {
      handleScroll('right')
      if (allComments.totalPages > Number(pages)) {
        navigation(`/${forumID}/${postID}/${String(Number(pages) + 1)}`)
        dispatch(
          GetCommentThunk({
            dispatch,
            postID,
            pages: String(Number(pages) + 1),
          }),
        )
      } else {
        navigation(`/${forumID}/${postID}/1`)
        dispatch(
          GetCommentThunk({
            dispatch,
            postID,
            pages: String(1),
          }),
        )
      }
    } else if (direction === 'left') {
      handleScroll('left')
      if (Number(pages) <= 1) {
        navigation(`/${forumID}/${postID}/1`)
        dispatch(
          GetCommentThunk({
            dispatch,
            postID,
            pages: String(1),
          }),
        )
      } else {
        navigation(`/${forumID}/${postID}/${String(Number(pages) - 1)}`)
        dispatch(
          GetCommentThunk({
            dispatch,
            postID,
            pages: String(Number(pages) - 1),
          }),
        )
      }
    }
  }
  return (
    <div
      className={`flex gap-5  h-[4rem] items-start justify-center ${
        allComments.totalPages > 0 ? ' ' : 'hidden'
      }`}
    >
      <RxDoubleArrowLeft
        onClick={() => pageSlider('left')}
        className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
      />
      <div
        ref={scrollRef}
        className="  gap-3   flex w-[100px] element-without-scrollbar   overflow-x-scroll "
      >
        {new Array(allComments.totalPages)
          .fill('')
          .map((val: string, index: number) => (
            <p
              onClick={() => {
                navigation(`/${forumID}/${postID}/${String(index + 1)}`)
                dispatch(
                  GetCommentThunk({
                    dispatch,
                    postID,
                    pages: String(index + 1),
                  }),
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
      <RxDoubleArrowRight
        onClick={() => pageSlider('right')}
        className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
      />
    </div>
  )
}

export default CommentPages
