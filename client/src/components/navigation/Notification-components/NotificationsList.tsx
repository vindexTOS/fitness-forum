import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard, { NotificationCardType } from './NotificationCard'

const NotificationsList = () => {
  const notification = useSelector(
    (state: any) => state.NotificationReducer.notificationData,
  )
  const style = {
    mainDiv: ` flex   flex-col  gap-1 w-[400px] max_smm:w-[300px]  element-without-scrollbar  h-[350px]  max-h-[550px] overflow-y-scroll  bg-[#232323] border-[#ec2b58] border-b-[1px] border-l-[1px] absolute right-[7rem] top-[3.2rem] max_smm:right-2  boxshaddow rounded-[2px]`,
  }
  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  const { _id } = userLogin.user
  if (notification.length > 0) {
    return (
      <div className={style.mainDiv}>
        {notification
          .filter((val: any) => val.authorsID !== String(_id))
          .map((data: NotificationCardType) => (
            <NotificationCard {...data} />
          ))}
      </div>
    )
  } else {
    return (
      <div className={`${style.mainDiv} items-center justify-center`}>
        <h1 className="text-white ">You have no notifications</h1>
      </div>
    )
  }
}

export default NotificationsList
