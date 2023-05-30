import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard, { NotificationCardType } from './NotificationCard'

const NotificationsPage = () => {
  const notification = useSelector(
    (state: any) => state.NotificationReducer.notificationData,
  )
  const style = {
    mainDiv: `  flex flex-col  pt-20 px-20 max_md:px-0  gap-2 element-without-scrollbar w-[100%]  h-[100%]     overflow-y-scroll  bg-[#232323]      rounded-[2px]`,
  }
  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  if (notification.length > 0 && userLogin.user) {
    const { _id } = userLogin.user

    return (
      <div className={style.mainDiv}>
        <div>
          <h1 className="text-[3rem] text-gray-200 text-center">
            Your Notifications
          </h1>
        </div>
        {notification
          .filter((val: any) => val.authorsID !== String(_id))
          .map((data: NotificationCardType, index: number) => (
            <NotificationCard key={index} {...data} />
          ))}
      </div>
    )
  } else {
    return (
      <div className="w-[100%] h-[100vh]   flex items-center justify-center">
        <div className={`${style.mainDiv} items-center justify-center`}>
          <h1 className="text-white ">You have no notifications</h1>
        </div>
      </div>
    )
  }
}

export default NotificationsPage
