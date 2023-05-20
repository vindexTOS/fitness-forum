import React, { useEffect } from 'react'
import InputDiv from '../../components/auth-components/InputDiv'
import { TiPointOfInterest } from 'react-icons/ti'
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

  const style = {
    mainDiv: `w-[100%] h-[100vh] gap-5 flex flex-col  items-center justify-center  `,
  }

  if (user && user.user && user.user.adminStatus) {
    return (
      <div className={style.mainDiv}>
        <InputDiv
          type="text"
          holder="thread name"
          fun={getName}
          Icon={TiPointOfInterest}
        />
        <InputDiv
          type="text"
          holder="thread description"
          fun={getDescription}
          Icon={TiPointOfInterest}
        />
        <InputDiv
          type="text"
          holder="forum name"
          fun={getForumID}
          Icon={TiPointOfInterest}
        />

        <button onClick={createThread}>Create Thread</button>
      </div>
    )
  } else {
    return <div>Restircted Area Premission Denied</div>
  }
}

export default CreateForum
