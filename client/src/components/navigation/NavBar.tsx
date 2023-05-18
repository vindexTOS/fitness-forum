import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdCreateNewFolder } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineFitnessCenter } from 'react-icons/md'
import ProfileDropDown from './ProfileDropDown'
const NavBar = () => {
  const style = {
    color: `#232323`,
    color2: `#ec2b58`,
    nav: `w-[100vw] relative gap-5 h-[50px] bg-[#232323] border-b-[1px] border-[#ec2b58] boxshaddow flex items-center justify-end px-20`,
    auth: `border-2 p-1 rounded-[20px] text-[#ec2b58] border-[#ec2b58] flex items-center justify-around  w-[10rem] cursor-pointer hover:border-[#e64369]  text-[#e64369] `,
    icon: `text-[#ec2b58] text-[2rem] cursor-pointer`,
  }
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.LoginReducer.data)
  const [dropDown, setDropDown] = useState<boolean>(false)
  return (
    <nav className={style.nav}>
      <MdOutlineFitnessCenter
        className={style.icon}
        onClick={() => navigate('/')}
      />
      {user && user.user && user.user.adminStatus && (
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
      {dropDown && <ProfileDropDown />}
    </nav>
  )
}

export default NavBar
