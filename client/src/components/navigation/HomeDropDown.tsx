import React, { useEffect } from 'react'
import { AiFillHome, AiOutlinePlus, AiFillMessage } from 'react-icons/ai'
import { IoIosNotifications } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { GetForumThunk } from '../../redux/features/async-thunk/GetForumThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import HomeDropThreadDiv from './HomeDropThreadDiv'
import Notification from './Notification-components/Notification'
const HomeDropDown = () => {
  const { forumData } = useSelector((state: any) => state.GeneralReducer)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const notification = useSelector(
    (state: any) => state.NotificationReducer.notificationData,
  )
  const navigate = useNavigate()
  const style = {
    mainDiv: `h-[480px]  w-[15rem] bg-[#262525]  noSelection  border-[#ec2b58]  border-b-[1px] border-l-[1px] border-r-[1px] boxshaddow absolute top-[3rem] left-[8.7rem] z-20`,
    threadDiv: `flex flex-col p-5 gap-2`,
  }
  useEffect(() => {
    // getting thread speficit data from db
    dispatch(GetForumThunk({ dispatch }))
  }, [])
  const [search, setSearch] = React.useState<string>('')
  return (
    <div className={style.mainDiv} onClick={() => console.log(notification)}>
      <div className={style.threadDiv}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="bg-[#262525] border-[#ec2b58] text-white border-[1px] rounded-[5px] "
          placeholder=" Filter"
        />
        <p className="text-gray-500 text-[10px]">COMMUNITIES</p>
        <div className="flex flex-col gap-2 h-[100px]  overflow-y-scroll overflox-x-hidden element-without-scrollbar ">
          {forumData
            .filter((val: any) =>
              val.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((val: any) => {
              return (
                <div
                  onClick={() => navigate(`/threads/${val.forumID}/page/1`)}
                  key={val._id}
                  className="flex items-center hover:bg-black p-1 rounded-[5px] cursor-pointer "
                >
                  <img className="rounded-[50%] w-[30px]" src={val.avatar} />
                  <p className="text-gray-400">threads/{val.name}</p>
                </div>
              )
            })}
        </div>
      </div>
      <div className={style.threadDiv}>
        <p className="text-gray-500 text-[10px] ">FEED</p>
        <HomeDropThreadDiv title="Home" Icon={AiFillHome} link="/" />
      </div>
      <div className={style.threadDiv}>
        <p className="text-gray-500 text-[10px] ">Other</p>

        <HomeDropThreadDiv
          title="Create Post"
          Icon={AiOutlinePlus}
          link="/create-post"
        />
        <HomeDropThreadDiv
          title="Notifications"
          Icon={IoIosNotifications}
          link="/"
        />
        {notification.length > 0 && (
          <div className="absolute bottom-[6rem]">
            <Notification />
          </div>
        )}

        <HomeDropThreadDiv title="Messages" Icon={AiFillMessage} link="/" />
        <HomeDropThreadDiv title="User Settings" Icon={FaUser} link="/home" />
      </div>
      {/* <h1 onClick={() => console.log(forumData)}>cli</h1> */}
    </div>
  )
}

export default HomeDropDown
