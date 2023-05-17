import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CreatePostThunk } from '../../redux/features/async-thunk/CreatePostThunk'

import {
  getTitle,
  getPost,
  getPhoto,
} from '../../redux/features/slice/PostSlice'
import { useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getCookies } from '../../redux/features/slice/LoginSlice'
import Cookies from 'universal-cookie'
const PostData = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')
  useEffect(() => {
    if (token) {
      dispatch(getCookies())
    }
  }, [])

  const hard = 'bodybuilding'
  const user = useSelector((state: any) => state.LoginReducer.data)
  const { title, post, photo } = useSelector((state: any) => state.PostReducer)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const hanndlePost = () => {
    dispatch(
      CreatePostThunk({
        title,
        post,
        photo,
        userID: user.user._id,
        forumID: hard,
      }),
    )
  }
  return (
    <div>
      <div>
        <input
          // onClick={() => console.log(user)}
          type="text"
          placeholder=" title "
          onChange={(e) => dispatch(getTitle(e.target.value))}
        />
        <input
          onChange={(e) => dispatch(getPost(e.target.value))}
          type="text"
          placeholder=" post "
        />
        <input
          onChange={(e) => dispatch(getPhoto(e.target.value))}
          type="text"
          placeholder=" photo "
        />

        <button onClick={hanndlePost}>POST DATA</button>
      </div>
    </div>
  )
}

export default PostData
