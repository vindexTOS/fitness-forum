import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostInnerCard from './PostInnerCard'
import { UserDataThunk } from '../../redux/features/async-thunk/UserDataThunk'
import { GetAllPostsThunk } from '../../redux/features/async-thunk/GetAllPostsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import CommentPost from './comment-section/CommentPost'
import CommentsSection from './comment-section/CommentsSection'
import CommentPages from './comment-section/CommentPages'
const PostInside = () => {
  const { postID } = useParams()

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    dispatch(UserDataThunk({ dispatch }))
    dispatch(GetAllPostsThunk({ dispatch, pages: '1', search: '' }))
    console.log('PostInsdie')
  }, [postID])

  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  if (allPostData && allPostData.AllData && userData) {
    const findData = allPostData.posts?.find((val: any) => postID === val._id)
    const { _id, forumID, photo, post, userID, title, date, upvote } =
      findData || {}
    const user = userData && userData.find((val: any) => val._id === userID)
    const { name } = user ? user : { name: 'user name' }
    return (
      <section className="w-[100%]   pt-40  flex-col flex justify-center items-center">
        <PostInnerCard
          data={{
            _id,
            forumID,
            photo,
            post,
            userID,
            title,
            name,
            date,
            upvote,
          }}
        />
        <CommentPost data={{ userID, name, postID: _id }} />
        <CommentsSection />
        <CommentPages postID={_id} />
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default PostInside
