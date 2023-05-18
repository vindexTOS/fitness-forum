import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostsComponentCard, {
  PostsComponentCardType,
} from './PostsComponentCard'
import { GetAllPostsThunk } from '../redux/features/async-thunk/GetAllPostsThunk'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import MakePostComponent from '../components/MakePostComponent'
const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)

  useEffect(() => {
    dispatch(GetAllPostsThunk({ dispatch }))
  }, [dispatch])
  const style = {
    section: `w-[100%] h-[100%] flex items-center justify-center`,
    cardMapDiv: `flex flex-col gap-5 items-center justify-center py-10 w-[800px]`,
  }
  if (allPostData) {
    return (
      <section className={style.section}>
        <div className={style.cardMapDiv}>
          <MakePostComponent />
          {allPostData.map((val: PostsComponentCardType) => (
            <PostsComponentCard key={val._id} data={val} />
          ))}
        </div>
      </section>
    )
  }
}

export default Home
