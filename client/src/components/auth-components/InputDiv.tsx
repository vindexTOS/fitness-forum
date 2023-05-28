import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { IconType } from 'react-icons'
import { motion as m } from 'framer-motion'

type inputDivProps = {
  type: string
  fun: (e: string) => AnyAction
  Icon: IconType
  holder: string
  error?: string
  errorType?: string
}
const InputDiv: FC<inputDivProps> = ({
  type,
  fun,
  Icon,
  holder,
  error,
  errorType,
}) => {
  const dispatch = useDispatch()
  const style = {
    color: `#232323`,
    color2: `#ec2b58`,
    mainDiv: ` flex items-center bg-[#2e2d2d]  justify-around w-[20rem] h-[2.2rem] rounded-[5px] `,
    input: `bg-transparent outline-none text-[#ec2b58] placeholder-[#ec2b58] w-[80%] `,
    icon: `text-[#ec2b58] text-[1.2rem]`,
  }

  return (
    <m.div
      animate={{
        x: error === errorType ? [20, 0, -20, 0, 20, 0, -20, 0] : [],
        outline: error === errorType ? '2px solid red' : '',
      }}
      transition={{
        duration: 0.2,
      }}
      className={style.mainDiv}
    >
      <label htmlFor={type}>
        <Icon className={style.icon} />
      </label>
      <input
        className={style.input}
        onChange={(e) => dispatch(fun(String(e.target.value)))}
        type={type}
        name={type}
        id={type}
        placeholder={holder.toUpperCase()}
      />
    </m.div>
  )
}

export default InputDiv
