import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdCreateNewFolder } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineFitnessCenter } from 'react-icons/md'
import ProfileDropDown from './ProfileDropDown'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import HomeDropDown from './HomeDropDown'
const NavBar = () => {
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [homeDrop, setHomeDrop] = useState<boolean>(false)
  const style = {
    color: `#232323`,
    color2: `#ec2b58`,
    nav: `w-[100vw] fixed gap-5 h-[50px] bg-[#232323] border-b-[1px] border-[#ec2b58] boxshaddow flex items-center justify-between px-20 z-40`,
    subDiv: `flex items-center justify-center gap-5 noSelection`,
    home: `flex  items-center justify-around  px-5 py-[2px]   hover:outline outline-[#ec2b58] outline-[1px]  w-[16rem] rounded-[30px] cursor-pointer  `,
    homeP: `text-[#ec2b58] text-[1.2rem] font-medium`,
    auth: `border-2 p-1 rounded-[20px] text-[#ec2b58] border-[#ec2b58] flex items-center justify-around  w-[10rem] cursor-pointer hover:border-[#e64369]  text-[#e64369] `,
    icon: `text-[#ec2b58] text-[2rem] cursor-pointer`,
  }
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.LoginReducer.data)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handleOutclick = (e: { target: any }) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setHomeDrop(false)
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleOutclick)
    return () => {
      document.removeEventListener('mousedown', handleOutclick)
    }
  }, [dropDownRef])
  return (
    <nav ref={dropDownRef} className={style.nav}>
      <div className={style.subDiv}>
        <MdOutlineFitnessCenter
          className={style.icon}
          onClick={() => navigate('/')}
        />
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
      </div>
      <div className={style.subDiv}>
        {user && user.user && user.user.role && (
          <Link to="/create-thread">
            <MdCreateNewFolder className={style.icon} />
          </Link>
        )}
        {user && user.user && (
          <Link to="/create-post">
            <IoIosAddCircleOutline className={style.icon} />{' '}
          </Link>
        )}
        <div>
          {user && user.user ? (
            <FaRegUserCircle
              className={style.icon}
              onClick={() => setDropDown(!dropDown)}
            />
          ) : (
            <div className={style.auth} onClick={() => navigate('/login')}>
              <BsFillPersonFill /> <h1>{`Authorization`}</h1>
            </div>
          )}
        </div>
      </div>
      {dropDown && <ProfileDropDown />}
    </nav>
  )
}

export default NavBar
