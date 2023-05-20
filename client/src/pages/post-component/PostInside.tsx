import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostInnerCard from './PostInnerCard'
import { UserDataThunk } from '../../redux/features/async-thunk/UserDataThunk'
import { GetAllPostsThunk } from '../../redux/features/async-thunk/GetAllPostsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'

const PostInside = () => {
  const { postID } = useParams()

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  useEffect(() => {
    dispatch(UserDataThunk({ dispatch }))
    dispatch(GetAllPostsThunk({ dispatch, pages: '1' }))
  }, [postID])
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  if (allPostData && allPostData.AllData && userData) {
    const findData = allPostData.AllData?.find((val: any) => postID === val._id)
    const { _id, forumID, photo, post, userID, title, date } = findData || {}
    const user = userData && userData.find((val: any) => val._id === userID)
    const { name } = user ? user : { name: 'user name' }
    return (
      <section
        className="w-[100%] h-[100vh]  flex justify-center items-center"
        onClick={() => console.log(user)}
      >
        <PostInnerCard
          data={{ _id, forumID, photo, post, userID, title, name, date }}
        />
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default PostInside
