import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getForumIDparams } from '../redux/features/slice/ForumSlice'
import { GetThreadThunk } from '../redux/features/async-thunk/GetThreadsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import PostsComponentCard, {
  PostsComponentCardType,
} from './PostsComponentCard'
import MakePostComponent from '../components/MakePostComponent'
const Thread = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { forumID, threadpage } = useParams()
  const pages = threadpage
  //this returns object of two values  posts:arrays  and forumData:object
  // thread specifice posts and thread spefici info
  const PostsAndThreadData = useSelector(
    (state: any) => state.ThreadGetReducer.data,
  )
  useEffect(() => {
    dispatch(GetThreadThunk({ forumID: forumID || 'general', dispatch, pages }))
  }, [forumID, pages])
  const navigate = useNavigate()
  const style = {
    section: `w-[100%] h-[100%] flex flex-col items-center justify-center `,
    nav: `w-[100%] h-[250px]  flex  items-center  justify-center  gap-5`,
    avatar: `w-[100px] rounded-[50%]`,
    header: `text-[2rem] font-bold text-red-500`,
    cardMapDiv: `flex flex-col gap-5 items-center justify-center py-10 w-[800px] `,
  }

  if (PostsAndThreadData && PostsAndThreadData.forumData) {
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
          ))}
      </section>
    )
  } else {
    return <div>Loading</div>
  }
}

export default Thread
