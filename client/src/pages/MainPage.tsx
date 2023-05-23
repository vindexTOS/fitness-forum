import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PostsComponentCard, {
  PostsComponentCardType,
} from './post-component/PostsComponentCard'
import { GetAllPostsThunk } from '../redux/features/async-thunk/GetAllPostsThunk'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MakePostComponent from '../components/MakePostComponent'
import { navigatePage } from '../redux/features/slice/GeneralSlice'
import { useNavigate } from 'react-router-dom'
import { UserDataThunk } from '../redux/features/async-thunk/UserDataThunk'

const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  const userData = useSelector((state: any) => state.GeneralReducer.userData)

  const navigation = useNavigate()
  const { pages } = useParams()
  useEffect(() => {
    dispatch(GetAllPostsThunk({ dispatch, pages }))
    dispatch(UserDataThunk({ dispatch }))
  }, [dispatch, pages])

  const pageRef = useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const scrollEvent = (pageRef.current as unknown) as HTMLDivElement
    if (scrollEvent) {
      scrollEvent.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [pages])
  const style = {
    section: `w-[100%] h-[100%] flex flex-col items-center justify-center py-10`,
    cardMapDiv: `flex flex-col gap-5 items-center justify-center py-10 w-[800px]`,
  }

  useEffect(() => {
    dispatch(navigatePage(pages))
  }, [pages])
  if (allPostData && userData) {
    // const location = useLocation()
    const reversedArray = allPostData.posts

    return (
      <section className={style.section}>
        {/* <h1 onClick={() => console.log(user)}> CICK ME TO LOG</h1> */}
        <div ref={pageRef} className={style.cardMapDiv}>
          <MakePostComponent />
          {reversedArray?.map((val: PostsComponentCardType) => (
            <PostsComponentCard key={val._id} data={val} />
          ))}
        </div>
        <div className="h-[2rem] gap-3 items-center justify-center flex w-[600px] outline ">
          {new Array(allPostData.totalPages)
            .fill('')
            .map((val: string, index: number) => (
              <p
                onClick={() => {
                  navigation(`/posts/page/${index + 1}`)
                }}
                className={` text-[1.3rem]  cursor-pointer ${
                  Number(pages) === index + 1 ? 'text-blue-400' : `text-white`
                } `}
                key={index}
              >
                {index + 1}
              </p>
            ))}
        </div>
      </section>
    )
  } else {
    return <div>loading</div>
  }
}

export default Home
