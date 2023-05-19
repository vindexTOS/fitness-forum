import React from 'react'
import { LogOut } from '../../redux/features/slice/LoginSlice'
import { useDispatch } from 'react-redux'
import ButtonAuth from '../auth-components/ButtonAuth'
const ProfileDropDown = () => {
  const style = {
    mainDiv: ` flex items-end py-5  justify-center bg-[#2e2d2d]  border-[#ec2b58] border-b-[1px] border-l-[1px] boxshaddow h-[300px] w-[300px] absolute top-[3rem] right-1`,
  }
  const dispatch = useDispatch()

  return (
    <div className={style.mainDiv}>
      <button onClick={() => dispatch(LogOut())}>
        <ButtonAuth
          styles={'w-[18rem]'}
          title="Log Out"
          func={dispatch(LogOut)}
        />
      </button>
    </div>
  )
}

export default ProfileDropDown
