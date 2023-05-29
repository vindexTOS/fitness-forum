import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOutClick from '../../Hooks/useOutClick'
import { MdOutlineFitnessCenter } from 'react-icons/md'
import ProfileDropDown from './ProfileDropDown'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import HomeDropDown from './HomeDropDown'
import { IoIosNotifications } from 'react-icons/io'
import Notification from './Notification-components/Notification'
import NotificationsList from './Notification-components/NotificationsList'
import SearchBar from './SearchBar'
const NavBar = () => {
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [homeDrop, setHomeDrop] = useState<boolean>(false)
  const [dropDownNotif, setDropDownNotif] = useState<boolean>(false)
  const style = {
    color: `#232323`,
    color2: `#ec2b58`,
    nav: `w-[100vw] fixed gap-5 h-[50px] bg-[#232323] border-b-[1px] border-[#ec2b58] boxshaddow flex items-center justify-between px-20 z-40 max_smm:px-3`,
    subDiv: `flex items-center justify-center gap-5 max_smm:justify-around max_smm:w-[100%] noSelection rounded-[50%] `,
    home: `flex   items-center justify-around  px-5 py-[2px]   hover:outline outline-[#ec2b58] outline-[1px] max_smm:w-[13rem] max_smm:m-0  w-[16rem] rounded-[30px] cursor-pointer  `,
    homeP: `text-[#ec2b58] text-[1.2rem] font-medium`,
    auth: `border-2 p-1 rounded-[20px] max_smm:w-[50px] text-[#ec2b58] border-[#ec2b58] flex items-center justify-around  w-[10rem] cursor-pointer hover:border-[#e64369]  text-[#e64369] `,
    icon: `text-[#ec2b58] text-[2rem] cursor-pointer`,
    avatar: `w-[2.3rem] h-[2.3rem] rounded-[50%] ourline outline-[1px] outline-[#2e2d2d] boxshaddow cursor-pointer`,
  }
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.LoginReducer.data)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const hanndleCloseDown = () => {
    setHomeDrop(false)
    setDropDown(false)
    setDropDownNotif(false)
  }
  useOutClick(dropDownRef, hanndleCloseDown)

  return (
    <nav ref={dropDownRef} className={style.nav}>
      <div className={style.subDiv}>
        <div
          onClick={() => navigate('/')}
          className="bg-[#ec2b58]   max_md2:hidden cursor-pointer w-[2.5rem] h-[2.5rem] rounded-[50%] flex items-center flex-col justify-center "
        >
          <MdOutlineFitnessCenter className={`w-[2rem] text-white`} />
          <h1 className="text-[10px] text-white">FitHub</h1>
        </div>
        <div
          onClick={() => {
            setHomeDrop(!homeDrop)
          }}
          className={style.home}
        >
          <div className="flex items-center gap-2">
            <AiFillHome className={style.icon} />
            <p className={style.homeP}>Home</p>{' '}
          </div>
          {homeDrop ? (
            <MdKeyboardArrowUp className={style.icon} />
          ) : (
            <MdKeyboardArrowDown className={style.icon} />
          )}
        </div>
        {homeDrop && <HomeDropDown />}
      </div>{' '}
      <SearchBar />
      <div className={style.subDiv}>
        <div>
          {user && user.user ? (
            <div className="flex items-center justify-center gap-4 relative">
              <IoIosNotifications
                className={style.icon}
                onClick={() => {
                  setDropDownNotif(!dropDownNotif), setDropDown(false)
                }}
              />
              <div className="absolute left-0 top-6 ">
                <Notification />
              </div>
              <img
                className={style.avatar}
                onClick={() => {
                  setDropDown(!dropDown), setDropDownNotif(false)
                }}
                src={user.user.avatar}
              />
            </div>
          ) : (
            <div className={style.auth} onClick={() => navigate('/login')}>
              <BsFillPersonFill />{' '}
              <h1 className="max_smm:hidden">{`Authorization`}</h1>
            </div>
          )}
        </div>
      </div>
      {dropDown && (
        <ProfileDropDown dropDown={dropDown} setDropDown={setDropDown} />
      )}
      {dropDownNotif && <NotificationsList />}
    </nav>
  )
}

export default NavBar
