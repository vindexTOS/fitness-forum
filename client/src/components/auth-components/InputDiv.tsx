import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
type inputDivProps = {
  type: string
  fun: (e: string) => AnyAction
}
const InputDiv: FC<inputDivProps> = ({ type, fun }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <input
        onChange={(e) => dispatch(fun(String(e.target.value)))}
        type={type}
        name={type}
        id={type}
        placeholder={type.toUpperCase()}
      />
    </div>
  )
}

export default InputDiv
