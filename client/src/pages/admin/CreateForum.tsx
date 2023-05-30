import React, { useEffect, useState } from 'react'
import InputDiv from '../../components/auth-components/InputDiv'
import { TiPointOfInterest } from 'react-icons/ti'
import { MdForum } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { CreateThreadThunk } from '../../redux/features/async-thunk/CreateForumThunk'
import ImgUpload from '../user-components/make-post-components/ImgUpload'
import { FireBasePhotoThunk } from '../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import {
  getName,
  getAvatar,
  getDescription,
  getForumID,
} from '../../redux/features/slice/ForumSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useMainContext } from '../../context'
import { SketchPicker } from 'react-color'
import DefaultUser from '../../assets/default-user.webp'
const CreateForum = () => {
  const { htmlImg, image } = useMainContext()
  const [color1, setColor1] = useState<string>('')
  const [color2, setColor2] = useState<string>('')
  const user = useSelector((state: any) => state.LoginReducer.data)
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { name, avatar, description, forumID, adminID } = useSelector(
    (state: any) => state.ThreadReducer,
  )
  const handleColor = (color: any) => {
    setColor1(color.hex)
  }
  const handleColor2 = (color: any) => {
    setColor2(color.hex)
  }
  const createThread = async () => {
    if (image && description && forumID && name) {
      await dispatch(FireBasePhotoThunk({ image, dispatch }))
    } else {
      setErr('Please fill all inputs')
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }
  const [err, setErr] = useState<string>('')
  useEffect(() => {
    if (url && description && forumID && name) {
      const val = {
        name,
        avatar: url,
        description,
        forumID,
        adminID: user.user._id,
        color1,
        color2,
      }

      dispatch(CreateThreadThunk(val))
    } else {
      setErr('Please fill all inputs')
      setTimeout(() => {
        setErr('')
      }, 3000)
    }
  }, [url])
  const style = {
    mainDiv: `w-[100%]  h-[100%] gap-5 flex flex-col py-60 max_sm8:pt-80 items-center justify-center  `,
    m: `bg-[#2e2d2d]  max_sm8:w-[90%]  w-[50%] h-[300px] rounded-[5px]  `,
    t: `bg-[#2e2d2d] text-[#ec2b58] w-[100%]   max_sm8:h-[300px]  h-[100%] outline outline-[1px] outline-[#ec2b58] boxshaddow rounded-[5px] p-2 `,
    btn: `text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
    nav: `w-[50%]  max_smm1:w-[90%] h-[250px]  flex  items-center  justify-center  gap-5`,
    header: `text-[2rem] font-bold text-red-500`,
    avatar: `w-[100px] rounded-[50%]`,
  }

  if (user && user.user && user.user.role) {
    return (
      <div className={style.mainDiv}>
        <div className="flex  max_sm8:flex-col  max_sm8:gap-0 gap-40 boxshaddow p-5 rounded-[20px] ">
          <InputDiv
            error={err}
            errorType={`Please fill all inputs`}
            type="text"
            holder="thread name"
            fun={getName}
            Icon={AiOutlineAppstoreAdd}
          />
          <InputDiv
            error={err}
            errorType={`Please fill all inputs`}
            type="text"
            holder="forum name"
            fun={getForumID}
            Icon={MdForum}
          />
        </div>
        <div className={style.m}>
          <textarea
            onChange={(e) => dispatch(getDescription(e.target.value))}
            placeholder="Thread description"
            className={style.t}
          ></textarea>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-white text-[1.2rem]">Upload thread avatar</h1>
          <ImgUpload htmlImg={htmlImg} />
        </div>
        <div className="flex flex-col items-center  gap-2">
          <h1 className="text-white text-[1.2rem]">Pick Thread Colors</h1>
          <div className="    flex gap-2">
            <SketchPicker color={color1} onChangeComplete={handleColor} />
            <SketchPicker color={color2} onChangeComplete={handleColor2} />
          </div>
        </div>
        <nav style={{ backgroundColor: `${color1}` }} className={style.nav}>
          <img className={style.avatar} src={avatar ? avatar : DefaultUser} />
          <h1 style={{ color: `${color2}` }} className={style.header}>
            {name ? name : 'Thread Name'}
          </h1>
        </nav>
        {htmlImg && <img className="w-[200px] h-[200px]" src={htmlImg} />}

        <button className={style.btn} onClick={createThread}>
          Create Thread
        </button>
        {err && (
          <p className="text-center text-[#ec2b58] border-2 py-2 px-2 rounded-[6px] border-[#ec2b58]">
            {err}!!!
          </p>
        )}
      </div>
    )
  } else {
    return <div>Restircted Area Premission Denied</div>
  }
}

export default CreateForum
