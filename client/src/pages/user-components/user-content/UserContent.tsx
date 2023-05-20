import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetAllPostsThunk } from '../../../redux/features/async-thunk/GetAllPostsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
const UserContent = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { userID } = useParams()

  return <div></div>
}

export default UserContent
