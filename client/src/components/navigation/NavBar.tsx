import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom'

const NavBar = () => {
  const style = {
    color: `#232323`,
    color2: `#ec2b58`,
    nav: `w-[100vw] h-[90px] bg-[#232323] border-b-[1px] border-[#ec2b58] boxshaddow flex items-center justify-end px-10`,
    auth: `border-2 p-1 rounded-[20px] text-[#ec2b58] border-[#ec2b58] flex items-center justify-around  w-[10rem] cursor-pointer hover:border-[#e64369]  text-[#e64369] `,
  }
  const navigate = useNavigate()
  return (
    <nav className={style.nav}>
      <Link to="/create-thread">Create</Link>
      <div>
        <div className={style.auth} onClick={() => navigate('/login')}>
          <BsFillPersonFill /> <h1>{`Authorization`}</h1>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
