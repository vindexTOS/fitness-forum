import React, { FC } from 'react'
type ErrorProp = {
  error: string
}
const ErrorComponent: FC<ErrorProp> = ({ error }) => {
  return (
    <p
      className={`${
        error === 'Enter Title' ? '' : 'hidden'
      } absolute text-[3rem] text-red-500 left-[45%] bottom-60`}
    >
      {error}!
    </p>
  )
}

export default ErrorComponent
