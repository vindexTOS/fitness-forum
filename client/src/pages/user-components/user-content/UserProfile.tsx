import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetAllPostsThunk } from '../../../redux/features/async-thunk/GetAllPostsThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import UserContent from './UserContent'
import UserNav from './UserNav'
import { UserDataThunk } from '../../../redux/features/async-thunk/UserDataThunk'
import PostsComponentCard, {
  PostsComponentCardType,
} from '../../post-component/PostsComponentCard'
import { DeletePost } from '../../../redux/features/async-thunk/DeleteAndUpdatePostThunk'
import { getCookies } from '../../../redux/features/slice/LoginSlice'
const UserProfile = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const allPostData = useSelector((state: any) => state.GetAllPostReducer.data)
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  const { userID } = useParams()
  useEffect(() => {
    dispatch(GetAllPostsThunk({ dispatch, pages: '1' }))
    dispatch(UserDataThunk({ dispatch }))
  }, [])
  if (allPostData && allPostData.AllData && userData) {
    const user = userData.find((val: any) => userID === val._id)

    const style = {
      section: ` w-[100%] h-[100%] flex gap-40   justify-center py-40 `,
      contentDiv: `w-[40%]`,
    }
    const filteredDataBasedOnUser = allPostData?.AllData.filter(
      (val: PostsComponentCardType) => userID === val.userID,
    )
    const userDataLength = filteredDataBasedOnUser.length

    return (
      <section onClick={() => console.log()} className={style.section}>
        <div className={style.contentDiv}>
          {filteredDataBasedOnUser.map((val: PostsComponentCardType) => (
            <PostsComponentCard data={val} key={val._id} />
          ))}
        </div>
        <UserNav user={user} userDataLength={userDataLength} />
      </section>
    )
  } else {
    return <div>loading</div>
  }
}

export default UserProfile
