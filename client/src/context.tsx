import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { getCookies } from './redux/features/slice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { storage } from './firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { GetVotes } from './redux/features/async-thunk/UpVoteDownVoteThunks'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { NotificationData } from './redux/features/async-thunk/NotificationThunk'
type Cell = {
  image: any
  htmlImg: String | string | null
  getThread: () => void
  imgUploadDrag: (e: React.DragEvent<HTMLLabelElement>) => void
  removeImgFromHtml: () => void

  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadFileToFirebaseStorage: () => void
  imgUrl: string
  setHtmlImg: React.Dispatch<React.SetStateAction<String | null>>
}

const context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // dispatch
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const data = useSelector((state: any) => state.RegisterReducer.data)
  // gettomg jwt cookies from local cookies
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')
  useEffect(() => {
    //checking if user has a token if token exist we get user data from cookies
    // token must be checked or app will crash
    if (token) {
      dispatch(getCookies())

      // Set the default headers
    }
  }, [data, token])
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  }, [])

  const { forumID } = useParams()
  const getThread = async () => {
    console.log('clicked')

    try {
      let apiUrl = `http://localhost:3000/threads/${forumID}`
      await axios
        .get(apiUrl)
        .then((res) => {
          console.log(res)
          console.log('success')
        })
        .catch((err) => console.log(err))
      console.log(forumID)
    } catch (error) {
      console.log(error)
    }
  }
  const userLogin = useSelector((state: any) => state.LoginReducer.data)

  React.useEffect(() => {
    if (userLogin.user) {
      dispatch(GetVotes({ dispatch, userID: userLogin.user._id }))
      dispatch(NotificationData({ dispatch, userID: userLogin.user._id }))
    }
  }, [userLogin])
  const [image, setImage] = useState<any>(null)
  const [htmlImg, setHtmlImg] = useState<String | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }
  const imgUploadDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
  const uploadFileToFirebaseStorage = async () => {
    if (image) {
      const storageRef = ref(storage, 'forum/' + image.name)
      setLoading(true)
      setError('')
      try {
        const snapshot = await uploadBytesResumable(storageRef, image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        setImgUrl(downloadURL)
        setLoading(false)
        console.log('succsess')

        removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    } else {
      setError('Please Select The File!')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  return (
    <context.Provider
      value={{
        getThread,
        removeImgFromHtml,
        imgUploadDrag,
        imgUpload,
        image,
        htmlImg,
        uploadFileToFirebaseStorage,
        imgUrl,
        setHtmlImg,
      }}
    >
      {children}
    </context.Provider>
  )
}

export const useMainContext = () => {
  const usecontext = useContext(context)

  if (!usecontext) {
    throw new Error('Not Wrapped')
  }
  return usecontext
}
