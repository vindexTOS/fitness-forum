import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCookies, LogOut } from '../redux/features/slice/LoginSlice'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import PostData from './user-components/post-components/PostData'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { getDataFromRegister } from '../redux/features/slice/LoginSlice'
import { PostsComponentCardType } from './PostsComponentCard'
import { useMainContext } from '../context'
import { UserDataThunk } from '../redux/features/async-thunk/UserDataThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getAllPost } from '../redux/features/slice/GetAllPosts'
const UserHome = () => {
  const { imgUploadDrag, imgUpload, htmlImg } = useMainContext()
  const registerUser = useSelector((state: any) => state.RegisterReducer.data)
  const user = useSelector((state: any) => state.LoginReducer.data)

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      dispatch(getDataFromRegister(registerUser))
      dispatch(getAllPost(registerUser))
    }
  }, [])

  const LogOutHandler = async () => {
    await dispatch(LogOut())
    navigate('/login')
  }
  useEffect(() => {
    dispatch(UserDataThunk({ dispatch }))
  }, [dispatch])

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!user || !user.user || !allPostData.AllData) {
  //       navigate('/login')
  //     }
  //   }, 2000)
  // }, [user])

  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  if (user && user.user) {
    const { _id, name, email, adminStatus, avatar } = user.user
    const style = {
      mainDiv: `flex flex-col items-center py-20`,
    }
    // const filteredDataBasedOnUser = allPostData?.AllData.filter(
    //   (val: PostsComponentCardType) => _id === val.userID,
    // )

    return (
      <div className={style.mainDiv}>
        <div className="bg-[#2e2d2d]  rounded-[5px] w-[900px] py-10 flex px-2 gap-2">
          {' '}
          {/* <button onClick={LogOutHandler}>LOG OUT</button> */}
          <h1 onClick={() => console.log(user)}>LOG</h1>
          {/* <h1 onClick={() => dispatch(getCookies())}>LOG</h1> */}
          {/* <h1>{_id}</h1> */}
          <label onDrop={(e) => imgUploadDrag(e)} className=" " htmlFor="photo">
            <img
              className=" w-[250px] rounded-[5px]"
              src={htmlImg ? htmlImg : avatar}
            />
            <input
              onChange={(e) => imgUpload(e)}
              id="photo"
              className="  hidden"
              type="file"
            />
          </label>
          <div>
            <h1 className="text-[#cf1b4e] flex  gap-1">
              Role
              {adminStatus ? (
                <span className="text-orange-400">Administrator</span>
              ) : (
                <span className="text-green-400"> Member</span>
              )}
            </h1>
            <h1 className="text-[#cf1b4e] flex  gap-1">
              Name: <span className="text-white">{name}</span>
            </h1>
            <h1 className="text-[#cf1b4e] flex  gap-1">
              Email: <span className="text-white"> {email}</span>
            </h1>
            <h1 className="text-[#cf1b4e] flex  gap-1">
              Posts:
              <span
                onClick={() => navigate(`/user/${_id}`)}
                className="text-white hover:text-blue-300 hover:underline cursor-pointer"
              >
                {/* {filteredDataBasedOnUser.length} */}
              </span>
            </h1>
          </div>
        </div>
        <PostData />
      </div>
    )
  } else {
    return <Navigate to="/home" />
  }
}

export default UserHome
