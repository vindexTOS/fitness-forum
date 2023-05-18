import React, { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import { GiPaperClip } from 'react-icons/gi'
import { getPhoto } from '../redux/features/slice/FireBaseSlices/ProfilePhotoSlice'
import { useDispatch } from 'react-redux'
import { FireBasePhotoThunk } from '../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
const MakePostComponent = () => {
  const style = {
    mainDiv: `w-[100%] h-[60px] bg-[#262525] outline-[1px] outline outline-gray-600 rounded-[4px] flex   items-center justify-around `,
    input: `bg-transparent outline-[1px] outline outline-gray-700 rounded-[4px] w-[80%] h-[2.5rem] px-5 hover:outline-gray-500`,
    icon: `text-gray-400 text-[1.5rem] hover:bg-gray-500 rounded-[5px] hover:text-gray-700 cursor-pointer`,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0]
  //     if (file) {
  //       dispatch(getPhoto(file))
  //     }
  //   }
  const [image, setImage] = useState<File | null>(null)
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) {
      //   let newHtmlImg = htmlImg
      if (e.target.files && e.target.files[0]) {
        let newImg = e.target.files[0]
        // newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        // setHtmlImg(newHtmlImg)
      }
    }
  }

  const img = useSelector((state: any) => state.FireBasePhotoReducer.image)
  const UploadToStore = () => {
    dispatch(FireBasePhotoThunk({ image, subFolder: 'profile' }))
  }
  return (
    <div className={style.mainDiv}>
      {/* <label htmlFor="photo"> upload here</label> */}
      <input id="photo" onChange={(e) => imgUpload(e)} type="file" />

      <button onClick={() => UploadToStore()}>ON CLIC</button>
      <img
        className="w-[50px] rounded-[50%]"
        src={`https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png`}
      />
      <input placeholder="Create Post" className={style.input} />
      <TbPhotoPlus className={style.icon} />
      <GiPaperClip className={style.icon} />
    </div>
  )
}

export default MakePostComponent
