import React, { useEffect } from 'react'
import InputDiv from '../../components/auth-components/InputDiv'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { getCookies } from '../../redux/features/slice/LoginSlice'
import { CreateThreadThunk } from '../../redux/features/async-thunk/CreateForumThunk'
import {
  getName,
  getAvatar,
  getDescription,
  getForumID,
} from '../../redux/features/slice/ForumSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
const CreateForum = () => {
  const user = useSelector((state: any) => state.LoginReducer.data)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { name, avatar, description, forumID, adminID } = useSelector(
    (state: any) => state.ThreadReducer,
  )

  const createThread = () => {
    const val = { name, avatar, description, forumID, adminID: user.user._id }
    dispatch(CreateThreadThunk(val))
  }
  if (user && user.user && user.user.adminStatus) {
    return (
      <div>
        <input
          onChange={(e) => dispatch(getName(e.target.value))}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => dispatch(getDescription(e.target.value))}
          type="text"
          placeholder="dec"
        />
        <input
          onChange={(e) => dispatch(getForumID(e.target.value))}
          type="text"
          placeholder=" forum id"
        />
        <button onClick={createThread}>Create Thread</button>
      </div>
    )
  } else {
    return <div>Restircted Area Premission Denied</div>
  }
}

export default CreateForum
