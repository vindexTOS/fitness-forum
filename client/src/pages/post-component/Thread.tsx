import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useScrollToDiv from '../../Hooks/useScrollToDiv'
import { GetThreadThunk } from '../../redux/features/async-thunk/GetThreadsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import PostsComponentCard, {
  PostsComponentCardType,
} from './Post-Card/PostsComponentCard'
import MakePostComponent from '../../components/MakePostComponent'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import useScrollHandler from '../../Hooks/useScrollHandler'
import PostCardLoading from '../../components/loading-skeletons/PostCardLoading'
const Thread = () => {
  const { forumID, threadpage } = useParams()
  const pages = threadpage
  //this returns object of two values  posts:arrays  and forumData:object
  // thread specifice posts and thread spefici info
  const PostsAndThreadData = useSelector(
    (state: any) => state.ThreadGetReducer.data,
  )
  useParams
  useEffect(() => {
    dispatch(GetThreadThunk({ forumID: forumID || 'general', dispatch, pages }))
  }, [forumID, pages])
  const navigate = useNavigate()

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { scrollRef, handleScroll } = useScrollHandler()
  const pageRef = useScrollToDiv(pages)
  const pageSlider = (direction: string) => {
    if (direction === 'right') {
      handleScroll('right')
      if (Math.ceil(PostsAndThreadData.postsCount / 10) > Number(pages)) {
        navigate(`/threads/${forumID}/page/${String(Number(pages) + 1)}`)
      } else {
        navigate(`/threads/${forumID}/page/1`)
      }
    } else if (direction === 'left') {
      handleScroll('left')
      if (Number(pages) <= 1) {
        navigate(`/threads/${forumID}/page/1`)
      } else {
        navigate(`/threads/${forumID}/page/${String(Number(pages) - 1)}`)
      }
    }
  }
  const style = {
    section: `w-[100%] h-[100%] flex flex-col items-center justify-center `,
    nav: `w-[100%] h-[250px]  flex  items-center  justify-center  gap-5`,
    avatar: `w-[100px] rounded-[50%]`,
    header: `text-[2rem] font-bold text-red-500`,
    cardMapDiv: `flex flex-col gap-5 items-center justify-center py-10 w-[800px] max_sm8:w-[95%] `,
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])
  if (PostsAndThreadData && PostsAndThreadData.forumData && loading) {
    const data = PostsAndThreadData
    const {
      avatar,
      description,
      forumID,
      name,
      color1,
      color2,
    } = data.forumData

    return (
      <section className={style.section}>
        <nav
          ref={pageRef}
          style={{ backgroundColor: `${color1}` }}
          className={style.nav}
          onClick={() => console.log(PostsAndThreadData)}
        >
          <img className={style.avatar} src={avatar} />
          <h1 style={{ color: `${color2}` }} className={style.header}>
            {name}
          </h1>
        </nav>

        <div className={style.cardMapDiv}>
          <MakePostComponent />
          {data?.posts.map((val: PostsComponentCardType) => (
            <PostsComponentCard key={val._id} data={val} />
          ))}
        </div>
        <div
          ref={scrollRef}
          className={`flex gap-5  h-[4rem] items-start justify-center  `}
        >
          <RxDoubleArrowLeft
            onClick={() => pageSlider('left')}
            className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
          />
          {new Array(Math.ceil(PostsAndThreadData.postsCount / 10))
            .fill('')
            .map((val: string, index: number) => (
              <p
                onClick={() => {
                  navigate(`/threads/${forumID}/page/${index + 1}`)
                }}
                className={` text-[1.3rem]  cursor-pointer ${
                  Number(pages) === index + 1 ? 'text-blue-400' : `text-white`
                } `}
                key={index}
              >
                {index + 1}
              </p>
            ))}{' '}
          <RxDoubleArrowRight
            onClick={() => pageSlider('right')}
            className="text-[2rem] text-pink-600 hoer:text-pink-500 cursor-pointer"
          />
        </div>
      </section>
    )
  } else {
    return (
      <section className={style.section}>
        <div ref={pageRef} className={style.cardMapDiv}>
          {new Array(5).fill('').map((val: string, index: number) => (
            <PostCardLoading key={index} />
          ))}
        </div>
      </section>
    )
  }
}

export default Thread
