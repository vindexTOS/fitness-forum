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
  // Register: (e: React.FormEvent<HTMLFormElement>) => void
  // Login: (e: React.FormEvent<HTMLFormElement>) => void
  // PostWrestler: (e: React.FormEvent<HTMLFormElement>) => void
  // setPassword: React.Dispatch<React.SetStateAction<string>>
  // setEmail: React.Dispatch<React.SetStateAction<string>>
  // setName: React.Dispatch<React.SetStateAction<string>>
  // err: any
  // user: any
  // postDispatch: React.Dispatch<postAction>
  getThread: () => void
}

const context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // const [authRoute, setAuthRoute] = useState<string>('')
  // const location = useLocation()
  // const navigate = useNavigate()

  // const [name, setName] = useState<string>('')
  // const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  // const [err, setErr] = useState<any>()
  // const [user, setUser] = useState<any>()
  // const Register = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const apiUrl = `http://localhost:3000/register`
  //   if (name && email && password) {
  //     try {
  //       await axios
  //         .post(apiUrl, { password, email, name })
  //         .catch((err) => setErr(err))
  //       console.log('request sent')
  //     } catch (error) {
  //       console.log(error)
  //       console.log(err)
  //     }
  //   }
  // }
  // const Login = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const apiUrl = `http://localhost:3000/login`
  //   if (email && password) {
  //     try {
  //       await axios
  //         .post(apiUrl, { email, password })
  //         .then((res) => setUser(res.data.user))
  //         .catch((err) => setErr(err))
  //       navigate('/home')
  //     } catch (error) {
  //       console.log(error)
  //       setErr(error)
  //     }
  //   }
  // }

  // const postReducer = (state: postState, action: postAction) => {
  //   switch (action.type) {
  //     case 'name':
  //       return { ...state, name: state.name = action.payload }
  //     case 'faction':
  //       return { ...state, faction: state.faction = action.payload }
  //     case 'stats':
  //       return { ...state, stats: state.stats = action.payload }
  //     case 'photo':
  //       return { ...state, photo: state.photo = action.payload }
  //     case 'weight':
  //       return { ...state, weight: state.weight = action.payload }
  //     case 'height':
  //       return { ...state, height: state.height = action.payload }
  //     default:
  //       return state
  //   }
  // }

  // const [postState, postDispatch] = useReducer(postReducer, {
  //   name: '',

  //   faction: '',
  //   stats: 0,
  //   photo: '',
  //   weight: 0,
  //   height: 0,
  // })
  // useEffect(() => {
  //   console.log(postState.faction)
  // }, [postState.faction])
  // const PostWrestler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   const apiUrl = `http://localhost:3000/api/v1/wrestler`
  //   if (user._id && postState.name) {
  //     let obj = {
  //       name: postState.name,
  //       faction: postState.faction,
  //       stats: postState.stats,
  //       photo: postState.photo,
  //       weight: postState.weight,
  //       height: postState.height,
  //       userID: user._id,
  //     }
  //     try {
  //       await axios
  //         .post(apiUrl, obj)
  //         .then((res) => console.log(res))
  //         .catch((err) => console.log(err))
  //       console.log('data sent')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

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
  // useEffect(() => {
  //   setTimeout(() => {
  //     getThread()
  //     // console.log(forumID)
  //   }, 1000)
  // }, [forumID])
  // useEffect(() => {
  //   console.log(postData)
  // }, [postData])
  return (
    <context.Provider
      value={{
        // Register,
        // Login,
        // setPassword,
        // setEmail,
        // setName,
        // err,
        // user,
        // postDispatch,
        // PostWrestler,

        getThread,
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
