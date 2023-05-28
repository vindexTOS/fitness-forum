import React, { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import { GiPaperClip } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { FireBasePhotoThunk } from '../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const MakePostComponent = () => {
  const style = {
    mainDiv: `w-[100%] h-[60px]  bg-[#262525] outline-[1px] outline outline-gray-600 rounded-[4px] flex   items-center justify-around `,
    input: `bg-transparent outline-[1px] outline outline-gray-700 rounded-[4px]  max_smm:w-[55%] w-[80%]  max_smm:h-[2rem] h-[2.5rem] px-5 hover:outline-gray-500`,
    icon: `text-gray-400 text-[1.5rem] hover:bg-gray-500 rounded-[5px] hover:text-gray-700 cursor-pointer`,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0]
  //     if (file) {
  //       dispatch(getPhoto(file))
  //     }
  //   }
  const user = useSelector((state: any) => state.LoginReducer.data)

  // const img = useSelector((state: any) => state.FireBasePhotoReducer.image)
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/create-post`)} className={style.mainDiv}>
      <img
        className="w-[45px] h-[45px]    rounded-[50%]"
        src={
          user?.user?.avatar
            ? user?.user?.avatar
            : `https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png`
        }
      />
      <input placeholder="Create Post" className={style.input} />
      <TbPhotoPlus className={style.icon} />
      <GiPaperClip className={style.icon} />
    </div>
  )
}

export default MakePostComponent
