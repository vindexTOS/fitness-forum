import React, { FC } from 'react'
import { LogOut } from '../../redux/features/slice/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdCreateNewFolder } from 'react-icons/md'
import { IoIosAddCircleOutline } from 'react-icons/io'
import DefaultUser from '../../assets/default-user.webp'
type ProfileDropProps = {
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
  dropDown: boolean
}

const ProfileDropDown: FC<ProfileDropProps> = ({ dropDown, setDropDown }) => {
  const style = {
    mainDiv: ` flex flex-col   py-5  items-center justify-between  bg-[#2e2d2d]  border-[#ec2b58] border-b-[1px] border-l-[1px] boxshaddow h-[300px] w-[300px] absolute top-[3rem] right-1`,
    btn: `flex  items-center justify-around bg-[#ec2b58]/90 hover:bg-[#f51b51]/80 rounded-[12px] boxshaddow text-[#2e2d2d] font-bold w-[240px] h-[3rem] hover:text-gray-300`,
    img: `w-[2rem] h-[2rem]  rounded-[50%]`,
    icon: `text-[#2e2d2d]  text-[2rem] w-[5rem] cursor-pointer`,
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state: any) => state.LoginReducer.data)

  const { _id, name, email, role, avatar } = userLogin.user || {}

  const logOutHanndler = () => {
    dispatch(LogOut())
    setDropDown(!dropDown)
  }
  return (
    <div className={style.mainDiv}>
      <button className={style.btn} onClick={() => navigate(`/home`)}>
        <img className={style.img} src={avatar ? avatar : DefaultUser} />
        <p className="text-white w-[6rem]">Your Profile</p>
      </button>
      {userLogin && userLogin?.user && userLogin?.user?.role === 'admin' && (
        <button
          className={style.btn}
          onClick={() => navigate('/create-thread')}
        >
          <MdCreateNewFolder className={style.icon} />
          <p className="text-white w-[9rem]">Create Threads</p>
        </button>
      )}
      {userLogin && userLogin?.user && (
        <button className={style.btn} onClick={() => navigate('/create-post')}>
          <IoIosAddCircleOutline className={style.icon} />
          <p className="text-white w-[9rem]">Create Post</p>
        </button>
      )}
      <button className={style.btn} onClick={() => logOutHanndler()}>
        Log out
      </button>
    </div>
  )
}

export default ProfileDropDown
