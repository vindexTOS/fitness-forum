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
    dispatch(GetAllPostsThunk({ dispatch, pages: '1', search: '' }))
    console.log('UserHome')
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
    const {
      _id,
      name,
      email,
      role,
      avatar,
      postLength,
      description,
    } = user.user
    const style = {
      mainDiv: `flex flex-col items-center py-20`,
      profileDiv: `bg-[#2e2d2d] flex  flex-col    justify-around  rounded-[5px] w-[900px]  max_lg:w-[90%] py-10 flex px-5 gap-2 boxshaddow `,
      profileInfo: `bg-[#232323] max_smm:w-[90%]  rounded-lg flex flex-col p-2 justify-around max_smm:text-[12px] max_smm:`,
      imgEditDiv: `flex  max_smm:w-[90%] items-center justify-between w-[290px] py-5  rounded-lg gap-2 flex-col bg-[#232323]   `,

      img: ` w-[250px] h-[250px] max_smm:w-[90%] rounded-lg`,
      btn: `relative  max_smm:w-[90%]  w-[250px] flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-[#cf1b4e] group-hover:from-purple-500 group-hover:to-[#cf1b4e] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800`,
      btnSpan: `relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[99%]`,
    }
    // const filteredDataBasedOnUser = allPostData?.AllData.filter(
    //   (val: PostsComponentCardType) => _id === val.userID,
    // )
    const { about } = description
    return (
      <div className={style.mainDiv}>
        <div className={style.profileDiv}>
          {' '}
          {/* <button onClick={LogOutHandler}>LOG OUT</button> */}
          {/* <h1 onClick={() => console.log(user)}>LOG</h1> */}
          {/* <h1 onClick={() => dispatch(getCookies())}>LOG</h1> */}
          {/* <h1>{_id}</h1> */}
          <div className="flex w-[100%] justify-around max_smm:items-center max_md2:flex-col gap-2">
            <div className={style.imgEditDiv}>
              <img className={style.img} src={htmlImg ? htmlImg : avatar} />
              <button
                className={style.btn}
                onClick={() => navigate(`/edit-user/${_id}`)}
              >
                <span className={style.btnSpan}>Edit</span>
              </button>
            </div>
            <div className={style.profileInfo}>
              <h1 className="text-[#cf1b4e] flex  gap-1">
                Email: <span className="text-white"> {email}</span>
              </h1>
              <h1 className="text-[#cf1b4e] flex  gap-1">
                Registration Date:{' '}
                <span className="text-white">
                  {' '}
                  {user.user.date.slice(0, 10)}
                </span>
              </h1>
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
                Posts:
                <span
                  onClick={() => navigate(`/user/${_id}`)}
                  className="text-white hover:text-blue-300 hover:underline cursor-pointer"
                >
                  {postLength}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col  w-[100%]  items-start max_smm:px-5 px-20">
            <h1 className="text-white text-[1.2rem] ">About me </h1>
            <p className="text-white ">{about}</p>
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
