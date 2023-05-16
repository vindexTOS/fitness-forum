import React, { useEffect } from 'react'

import PostData from './user-components/PostData'
import { useSelector, useDispatch } from 'react-redux'

import { getCookies, LogOut } from '../redux/features/slice/LoginSlice'
import { useNavigate } from 'react-router-dom'
const UserHome = () => {
  const user = useSelector((state: any) => state.LoginReducer.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCookies())
  }, [])
  const navigate = useNavigate()
  const LogOutHanndler = () => {
    dispatch(LogOut())
    navigate('/login')
  }
  if (user && user.user) {
    const { _id, name, email } = user.user
    return (
      <div>
        <button onClick={() => LogOutHanndler()}>LOG OUT </button>
        <h1 onClick={() => console.log(user)}>LOG</h1>
        <h1>{_id}</h1>
        <h1>Name:{name}</h1>
        <h1>EMAIL:{email}</h1>
        <PostData />
      </div>
    )
  } else {
    return null
  }
}

export default UserHome
