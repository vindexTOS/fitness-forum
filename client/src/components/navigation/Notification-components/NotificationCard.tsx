import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NotificationRead } from '../../../redux/features/async-thunk/NotificationThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
export type NotificationCardType = {
  _id: string
  isRead: boolean
  postID: string
  receiverID: string
  reply: string
  authorsID: string
}

const NotificationCard = (data: NotificationCardType) => {
  const { reply, postID, authorsID, receiverID, isRead, _id } = data
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  const author = userData.find((val: any) => val._id === authorsID)
  const style = {
    mainDiv: `bg-[#2e2d2d] p-2 flex justify-around  hover:bg-[#403e3e] cursor-pointer`,
    img: `w-[30px] h-[30px] rounded-[2px]`,
    p: `text-gray-200 w-[90%]`,
  }

  const checkNotification = () => {
    dispatch(NotificationRead({ isRead: false, notificationID: _id }))
    navigate(`/${postID}/1`)
  }
  return (
    <div
      style={{ backgroundColor: `${isRead ? 'green' : '#2e2d2d'}` }}
      className={style.mainDiv}
      onClick={() => checkNotification()}
    >
      <img className={style.img} src={author.avatar} />

      <p className={style.p}>{reply}</p>
    </div>
  )
}

export default NotificationCard
