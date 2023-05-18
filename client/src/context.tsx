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

type postState = {
  name: string

  faction: string
  stats: number
  photo: string
  weight: number
  height: number
}
type postAction = {
  type: string
  payload: any
}

type Cell = {
  image: any
  htmlImg: String | null
  getThread: () => void
  imgUploadDrag: (e: React.DragEvent<HTMLLabelElement>) => void
  removeImgFromHtml: () => void

  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.RegisterReducer.data)
  // gettomg jwt cookies from local cookies
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')
  useEffect(() => {
    //checking if user has a token if token exist we get user data from cookies
    // token must be checked or app will crash
    if (token) {
      dispatch(getCookies())
    }
  }, [data])

  const { forumID } = useParams()
  const [postData, setPostData] = useState<any>()
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

  const [image, setImage] = useState<any>(null)
  const [htmlImg, setHtmlImg] = useState<String | null>(null)

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

  return (
    <context.Provider
      value={{
        getThread,
        removeImgFromHtml,
        imgUploadDrag,
        imgUpload,
        image,
        htmlImg,
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
