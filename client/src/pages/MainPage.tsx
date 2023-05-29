import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import PostsComponentCard, {
  PostsComponentCardType,
} from './post-component/Post-Card/PostsComponentCard'
import { GetAllPostsThunk } from '../redux/features/async-thunk/GetAllPostsThunk'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MakePostComponent from '../components/MakePostComponent'
import { navigatePage } from '../redux/features/slice/GeneralSlice'
import { useNavigate } from 'react-router-dom'
import { UserDataThunk } from '../redux/features/async-thunk/UserDataThunk'
import useScrollHandler from '../Hooks/useScrollHandler'
import useScrollToDiv from '../Hooks/useScrollToDiv'
const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  /// gettings votes
  const userVotes = useSelector((state: any) => state.GeneralReducer.votesData)
  const navigation = useNavigate()
  const { pages } = useParams()
  useEffect(() => {
    dispatch(GetAllPostsThunk({ dispatch, pages, search: '' }))

    dispatch(UserDataThunk({ dispatch }))
    console.log('MainPage')
  }, [pages])

  const pageRef = useScrollToDiv(pages)

  const style = {
    section: `w-[100%] h-[100%]  flex flex-col items-center justify-center py-10`,
    cardMapDiv: `flex flex-col gap-5 items-center justify-center py-10 w-[800px] max_sm8:w-[95%]`,
  }

  useEffect(() => {
    dispatch(navigatePage(pages))
  }, [pages])

  const { scrollRef, handleScroll } = useScrollHandler()

  if (allPostData && userData) {
    // const location = useLocation()
    const reversedArray = allPostData.posts
    const pageSlider = (direction: string) => {
      if (direction === 'right') {
        handleScroll('right')
        if (allPostData.totalPages > Number(pages)) {
          navigation(`/posts/page/${String(Number(pages) + 1)}`)
        } else {
          navigation(`/posts/page/1`)
        }
      } else if (direction === 'left') {
        handleScroll('left')
        if (Number(pages) <= 1) {
          navigation(`/posts/page/1`)
        } else {
          navigation(`/posts/page/${String(Number(pages) - 1)}`)
        }
      }
    }

    return (
      <section className={style.section}>
        {/* <h1 onClick={() => console.log(allPostData.totalPages)}>
          {' '}
          CICK ME TO LOG
        </h1> */}
        <div ref={pageRef} className={style.cardMapDiv}>
          <MakePostComponent />
          {reversedArray?.map((val: PostsComponentCardType) => (
            <PostsComponentCard key={val._id} data={val} />
          ))}
        </div>
        <div className="flex gap-5  h-[4rem] items-start justify-center ">
          <RxDoubleArrowLeft
            onClick={() => pageSlider('left')}
            className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
          />
          <div
            ref={scrollRef}
            className="  gap-3   flex w-[100px] element-without-scrollbar   overflow-x-scroll "
          >
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
          <RxDoubleArrowRight
            onClick={() => pageSlider('right')}
            className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
          />{' '}
        </div>
      </section>
    )
  } else {
    return <div>loading</div>
  }
}

export default Home
