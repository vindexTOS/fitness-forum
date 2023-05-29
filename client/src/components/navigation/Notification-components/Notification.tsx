import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(
    (state: any) => state.NotificationReducer.notificationData,
  )
  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  const style = {
    mainDiv: `w-[20px]  h-[20px] rounded-[50%] bg-green-400 text-white flex items-center justify-center`,
  }

  if (notification.length > 0) {
    const { _id } = userLogin.user
    const notificationLength = notification.filter(
      (val: any) => val.isRead && val.authorsID !== String(_id),
    )

    return <div className={style.mainDiv}>{notificationLength.length}</div>
  } else {
    return (
      <div className={`${notification.length > 0 ? 'hidden' : 'hidden'}`}>
        0
      </div>
    )
  }
}
export default Notification
