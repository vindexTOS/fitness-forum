import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCookies, LogOut } from '../redux/features/slice/LoginSlice'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import PostData from './user-components/post-components/PostData'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { getDataFromRegister } from '../redux/features/slice/LoginSlice'
const UserHome = () => {
  const registerUser = useSelector((state: any) => state.RegisterReducer.data)
  const user = useSelector((state: any) => state.LoginReducer.data)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      dispatch(getDataFromRegister(registerUser))
    }
  }, [])

  const LogOutHandler = async () => {
    await dispatch(LogOut())
    navigate('/login')
  }

  if (user && user.user) {
    const { _id, name, email, adminStatus, avatar } = user.user

    return (
      <div>
        <button onClick={LogOutHandler}>LOG OUT</button>
        <h1 onClick={() => console.log(user)}>LOG</h1>
        <h1 onClick={() => dispatch(getCookies())}>LOG</h1>
        <h1>{_id}</h1>
        <img src={avatar} />
        <h1>{String(adminStatus)}</h1>
        <h1>Name: {name}</h1>
        <h1>Email: {email}</h1>
        <PostData />
      </div>
    )
  } else {
    return <Navigate to="/login" />
  }
}

export default UserHome
