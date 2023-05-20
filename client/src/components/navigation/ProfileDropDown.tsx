import React from 'react'
import { LogOut } from '../../redux/features/slice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ProfileDropDown = () => {
  const style = {
    mainDiv: ` flex flex-col   py-5  items-center justify-between  bg-[#2e2d2d]  border-[#ec2b58] border-b-[1px] border-l-[1px] boxshaddow h-[300px] w-[300px] absolute top-[3rem] right-1`,
    btn: `flex  items-center justify-around bg-[#ec2b58] hover:bg-[#f51b51] rounded-[6px] text-[#2e2d2d] font-bold w-[200px] h-[2.4rem] hover:text-gray-300`,
    img: `w-[20px] rounded-[50%]`,
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  const { _id, name, email, adminStatus, avatar } = userLogin.user || {}
  return (
    <div className={style.mainDiv}>
      <button className={style.btn} onClick={() => navigate(`/home`)}>
        <img className={style.img} src={avatar} />
        <p className="text-white mr-10">Your Profile</p>
      </button>
      <button className={style.btn} onClick={() => dispatch(LogOut())}>
        Log out
      </button>
    </div>
  )
}

export default ProfileDropDown
