import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
type DropProp = {
  title: string
  link: string
  Icon: IconType
}
const HomeDropThreadDiv: FC<DropProp> = ({ title, Icon, link }) => {
  const navigate = useNavigate()
  return (
    <h1
      onClick={() => navigate(link)}
      className="flex items-center gap-2 text-[#ec2b58] cursor-pointer "
    >
      <Icon />
      {title}
    </h1>
  )
}

export default HomeDropThreadDiv
