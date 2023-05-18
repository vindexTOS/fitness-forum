import React from 'react'
import { AnyAction } from 'redux'
import { useMainContext } from '../../context'
import { useDispatch } from 'react-redux'
type TextAreaProps = {
  fun: (e: string) => AnyAction
}

const Textarea = (data: TextAreaProps) => {
  const { imgUploadDrag } = useMainContext()
  const s = {
    m: `bg-[#2e2d2d] w-[100%] h-[300px] rounded-[5px]  `,
    t: `bg-[#2e2d2d] text-[#ec2b58] w-[100%] h-[100%] outline outline-[1px] outline-[#ec2b58] boxshaddow rounded-[5px] p-2 `,
  }
  const dispatch = useDispatch()
  return (
    <div className={s.m}>
      <label onDrop={(e) => imgUploadDrag(e)} htmlFor="photo">
        <textarea
          onChange={(e) => dispatch(data.fun(e.target.value))}
          id="photo"
          placeholder="Text(optional)"
          className={s.t}
        ></textarea>
      </label>
    </div>
  )
}

export default Textarea
