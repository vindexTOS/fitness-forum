import React, { FC } from 'react'
import { motion as m } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { getTitle } from '../../../redux/features/slice/PostSlice'
type TitleProps = {
  error: string
  title: string
}

const TitleInputComponent: FC<TitleProps> = ({ error, title }) => {
  const dispatch = useDispatch()

  const style = {
    input: `bg-[#2e2d2d]  w-[90%] text-[#ec2b58]  placeholder-[#ec2b58] px-4   outline-none `,
    inputDiv: `flex w-[100%] outline outline-[1px] outline-[#ec2b58] ${
      error === 'Enter Title' && 'outline-[2px] outline-red-600'
    } boxshaddow items-center rounded-[4px] h-[2.1rem]  justify-around`,
  }

  return (
    <m.div
      animate={{
        x: error === 'Enter Title' ? [20, 0, -20, 0, 20, 0, -20, 0] : [],
      }}
      transition={{
        duration: 0.2,
      }}
      className={style.inputDiv}
    >
      <input
        maxLength={300}
        type="text"
        className={style.input}
        placeholder={'Title'}
        onChange={(e) => dispatch(getTitle(e.target.value))}
      />
      <p
        className={`text-[12px] text-gray-400 ${
          title.length >= 300 && 'text-red-600'
        }`}
      >
        {title.length}/300
      </p>
    </m.div>
  )
}

export default TitleInputComponent
