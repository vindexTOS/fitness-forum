import React, { useEffect, useState } from 'react'
import { TbPhotoUp, TbPhotoX } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { CreatePostThunk } from '../../redux/features/async-thunk/CreatePostThunk'
import PostsComponentCard from '../PostsComponentCard'
import {
  getTitle,
  getPost,
  getPhoto,
} from '../../redux/features/slice/PostSlice'
import { FireBasePhotoThunk } from '../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import Textarea from '../../components/general-components/Textarea'
import { useMainContext } from '../../context'
import ButtonAuth from '../../components/auth-components/ButtonAuth'
const PostData = () => {
  const {
    htmlImg,
    imgUploadDrag,
    imgUpload,
    image,

    setHtmlImg,
    removeImgFromHtml,
  } = useMainContext()
  const hard = 'powerlifting'
  const user = useSelector((state: any) => state.LoginReducer.data)
  const { title, post, photo } = useSelector((state: any) => state.PostReducer)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const dataObj = {
    title,
    post,
    photo: htmlImg,

    forumID: hard,
  }
  const hanndlePost = async () => {
    if (title) {
      await dispatch(FireBasePhotoThunk({ dispatch, image }))
    } else {
      setError('Enter Title')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }
  useEffect(() => {
    if (title) {
      if (url) {
        console.log(url)
        dispatch(
          CreatePostThunk({
            title,
            post,
            photo: url,
            userID: user.user._id,
            forumID: hard,
          }),
        )
        dispatch(getTitle(''))
        dispatch(getPost(''))
        dispatch(getPhoto(''))
        setHtmlImg(null)
      } else if (post) {
        console.log('no photo')
        dispatch(
          CreatePostThunk({
            title,
            post,
            photo,
            userID: user.user._id,
            forumID: hard,
          }),
        )
        dispatch(getTitle(''))
        dispatch(getPost(''))
        dispatch(getPhoto(''))
      }
      navigate('/')
    }
  }, [url])
  const style = {
    mainDiv: `w-[100%]  h-[100vh] flex flex-col items-center justify-center gap-5 pt-40`,
    textDiv: `bg-[#2e2d2d] rounded-[5px] flex flex-col p-5 gap-3 w-[900px]`,
    header: `text-gray-400 font-medium text-[1.4rem]`,
    input: `bg-[#2e2d2d]  w-[90%] text-[#ec2b58]  placeholder-[#ec2b58] px-4   outline-none `,
    inputDiv: `flex w-[100%] outline outline-[1px] outline-[#ec2b58] ${
      error === 'Enter Title' && 'outline-[2px] outline-red-600'
    } boxshaddow items-center rounded-[4px] h-[2.1rem]  justify-around`,
  }
  if (user && user.user) {
    return (
      <div className={style.mainDiv}>
        <div className={style.textDiv}>
          <h1 className={style.header} onClick={() => console.log(url)}>
            Create a post
          </h1>
          <p
            className={`${
              error === 'Enter Title' ? '' : 'hidden'
            } absolute text-[3rem] text-red-500 left-[45%] bottom-60`}
          >
            {' '}
            {error}!
          </p>
          <m.div
            animate={{
              x: error === 'Enter Title' ? [20, 0, -20, 0, 20, 0, -20, 0] : [],
            }}
            transition={{
              duration: 0.2,
            }}
            className={style.inputDiv}
          >
            <input
              maxLength={300}
              type="text"
              className={style.input}
              placeholder={'Title'}
              onChange={(e) => dispatch(getTitle(e.target.value))}
            />
            <p
              className={`text-[12px] text-gray-400 ${
                title.length >= 300 && 'text-red-600'
              }`}
            >
              {title.length}/300
            </p>
          </m.div>
          <Textarea fun={getPost} />
          <div className="flex justify-between">
            <label
              onDrop={(e) => imgUploadDrag(e)}
              className="text-[2rem] h-[2.2rem]    items-center justify-center text-gray-400   cursor-pointer w-[20rem] rounded-[6px] flex "
              htmlFor="photo"
            >
              <input
                onChange={(e) => imgUpload(e)}
                id="photo"
                className=" block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
              />
              {htmlImg && <TbPhotoX onClick={() => removeImgFromHtml()} />}
            </label>
            <ButtonAuth
              title="Post"
              func={hanndlePost}
              styles="w-[20rem] h-[2.3rem]"
            />
          </div>
        </div>
        <div className={`w-[900px]`}>
          <PostsComponentCard data={dataObj} />
        </div>{' '}
      </div>
    )
  } else {
    return <div>Register or Sign In if you want to post </div>
  }
}

export default PostData
