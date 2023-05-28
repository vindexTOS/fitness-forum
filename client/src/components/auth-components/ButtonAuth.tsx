import React, { FC } from 'react'
type ButtonPropType = {
  title: string
  func: () => void
  styles: string
}
const ButtonAuth: FC<ButtonPropType> = ({ title, func, styles }) => {
  const style = {
    btn: ` max_md2:w-[20%] max_smm:w-[118%]  bg-[#ec2b58] hover:bg-[#f51b51] rounded-[6px] text-[#2e2d2d] font-bold ${styles}`,
  }
  return (
    <button className={style.btn} onClick={() => func()}>
      {title}
    </button>
  )
}

export default ButtonAuth
