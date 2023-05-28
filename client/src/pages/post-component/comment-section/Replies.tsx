import React, { FC } from 'react'
import { useSelector } from 'react-redux'

type ReplyType = {
  replyData: any
}

const Replies: FC<ReplyType> = ({ replyData }) => {
  const { comment, date, userID } = replyData
  const usersData = useSelector((state: any) => state.GeneralReducer.userData)

  const replyUser = usersData.find((val: any) => val._id === userID)
  const { name, avatar } = replyUser
  return (
    <div className="ml-10  m  gap-2 p-2     bg-[#262525] rounded-[10px] flex flex-col">
      <div className="flex justify-between   px-1">
        <div className="flex items-center  gap-2 ">
          <img src={avatar} className="w-[40px] h-[40px] rounded-[10px]" />
          <h1 className="text-[12px] w-[9rem]">{name}</h1>
        </div>
        <p className="text-[12px]">Reply Date {date.slice(0, 10)}</p>
      </div>
      <div className="w-[100%] bg-[#363434] p-2 break-words  rounded-[10px]">
        {comment}
      </div>
    </div>
  )
}

export default Replies
