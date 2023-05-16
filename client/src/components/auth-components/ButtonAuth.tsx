import React, { FC } from 'react'
type ButtonPropType = {
  title: string
  func: () => void
}
const ButtonAuth: FC<ButtonPropType> = ({ title, func }) => {
  const style = {
    btn: `w-[20rem] h-[3rem] bg-[#ec2b58] hover:bg-[#f51b51] rounded-[6px] text-[#2e2d2d] font-bold`,
  }
  return (
    <button className={style.btn} onClick={() => func()}>
      {title}
    </button>
  )
}

export default ButtonAuth
