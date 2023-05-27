import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// components
import PostsComponentCard from '../../post-component/Post-Card/PostsComponentCard'
import LoadingComponent from './LoadingComponent'
import ErrorComponent from './ErrorComponent'
import TitleInputComponent from './TitleInputComponent'
import ImgUpload from './ImgUpload'
import Textarea from '../../../components/general-components/Textarea'
import ButtonAuth from '../../../components/auth-components/ButtonAuth'
import ChoseThreadComponent from './ChoseThreadComponent'
//redux
import { useDispatch } from 'react-redux'
import { CreatePostThunk } from '../../../redux/features/async-thunk/CreatePostThunk'
import {
  getTitle,
  getPost,
  getPhoto,
} from '../../../redux/features/slice/PostSlice'
import { getPhotoUrl } from '../../../redux/features/slice/FireBaseSlices/ProfilePhotoSlice'
import { FireBasePhotoThunk } from '../../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { GetForumThunk } from '../../../redux/features/async-thunk/GetForumThunk'

import { useMainContext } from '../../../context'
const PostData = () => {
  const { htmlImg, image, setHtmlImg } = useMainContext()
  // getting forum data so we can use thread ID to selecet with post should go with thread
  const { forumData } = useSelector((state: any) => state.GeneralReducer)
  // getting loged in usser info
  const user = useSelector((state: any) => state.LoginReducer.data)
  // getting title and post strings so we can send it to server
  const { title, post } = useSelector((state: any) => state.PostReducer)
  //getting img url from friebase to send it to server
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  // error and loading handler
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  // getting speficife threads to send it to server as thread ID and also redirect user to that thread after uploading post
  const [threads, setThreads] = useState<string>('bodybuilding')

  const navigate = useNavigate()
  // data object is used in component to dynamicly see our post
  const dataObj = {
    title,
    post,
    photo: htmlImg,
    forumID: threads,
  }
  // switcher is used to make sure useEffet does not trigger unessasary
  const [switcher, setSwitcher] = useState<boolean>(false)
  //post function
  const hanndlePost = async () => {
    // if title not exist we dont send post
    if (title) {
      setLoading(true)
      if (htmlImg) {
        // if img is uploaded to JSX input file we upload photo to firebase and get URL
        await dispatch(FireBasePhotoThunk({ dispatch, image }))
      } else {
        // if we are not uploading img we invock useEffect to upload only post
        console.log('best')
        setSwitcher(!switcher)
      }
    } else {
      setError('Enter Title')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }
  useEffect(() => {
    if (title) {
      // if url excists we upload post with photo

      if (url) {
        dispatch(
          CreatePostThunk({
            title,
            post,
            photo: url,
            userID: user.user._id,
            forumID: threads,
          }),
        )
        //resetting post
        dispatch(getTitle(''))
        dispatch(getPost(''))
        dispatch(getPhoto(''))
        dispatch(getPhotoUrl(''))
      } else if (post) {
        console.log('no photo')
        dispatch(
          CreatePostThunk({
            title,
            post,
            photo: 'No Photo',
            userID: user.user._id,
            forumID: threads,
          }),
        )
        //resetting post
        dispatch(getTitle(''))
        dispatch(getPost(''))
        dispatch(getPhoto(''))
      }

      setLoading(false)
      // redireting user to thread with post was made
      navigate(`/threads/${threads}/page/1`)
      setHtmlImg(null)
    }
  }, [url, switcher])
  useEffect(() => {
    // getting thread speficit data from db
    dispatch(GetForumThunk({ dispatch }))
  }, [])
  const style = {
    mainDiv: `w-[100%]  h-[100vh] flex flex-col items-center justify-center gap-5 pt-40`,
    textDiv: `bg-[#2e2d2d] rounded-[5px] flex flex-col p-5 gap-3 w-[900px]`,
    header: `text-gray-400 font-medium text-[1.4rem]`,
  }
  if (user && user.user) {
    return (
      <div className={style.mainDiv}>
        <div className={style.textDiv}>
          <div className="flex justify-between">
            <h1 className={style.header} onClick={() => console.log(forumData)}>
              Create a post
            </h1>
            <ChoseThreadComponent
              threads={threads}
              forumData={forumData}
              setThreads={setThreads}
            />
          </div>
          <LoadingComponent loading={loading} />
          <ErrorComponent error={error} />
          <TitleInputComponent title={title} error={error} />
          <Textarea fun={getPost} />
          <div className="flex justify-between">
            <ImgUpload htmlImg={htmlImg} />
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
