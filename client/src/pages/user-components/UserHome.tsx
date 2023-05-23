import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCookies, LogOut } from '../../redux/features/slice/LoginSlice'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import PostData from './make-post-components/PostData'

import { getDataFromRegister } from '../../redux/features/slice/LoginSlice'
import { useMainContext } from '../../context'
import { UserDataThunk } from '../../redux/features/async-thunk/UserDataThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { GetAllPostsThunk } from '../../redux/features/async-thunk/GetAllPostsThunk'
const UserHome = () => {
  const { imgUploadDrag, imgUpload, htmlImg } = useMainContext()
  const registerUser = useSelector((state: any) => state.RegisterReducer.data)
  const user = useSelector((state: any) => state.LoginReducer.data)

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      dispatch(getDataFromRegister(registerUser))
    }
    dispatch(GetAllPostsThunk({ dispatch, pages: '1' }))
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
    const { _id, name, email, role, avatar, postLength } = user.user
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
              {role === 'admin' ? (
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
                {postLength}
              </span>
            </h1>
            <button
              className="text-[2rem] text-blue-500"
              onClick={() => navigate(`/edit-user/${_id}`)}
            >
              Edit
            </button>
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
