import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostsComponentCard, {
  PostsComponentCardType,
} from './PostsComponentCard'
import { GetAllPostsThunk } from '../redux/features/async-thunk/GetAllPostsThunk'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'

const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)

  useEffect(() => {
    dispatch(GetAllPostsThunk({ dispatch }))
  }, [dispatch])
  //  useEffect(()=>{
  //   console.log(allPostData)
  //  },[allPostData])
  if (allPostData) {
    return (
      <div>
        {allPostData.map((val: PostsComponentCardType) => (
          <PostsComponentCard key={val._id} data={val} />
        ))}
      </div>
    )
  }
}

export default Home
