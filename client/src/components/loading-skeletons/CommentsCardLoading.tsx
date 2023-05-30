import React from 'react'

const CommentsCardLoading = () => {
  const style = {
    commentDiv: `bg-[#363434] py-5 animate-pulse  flex flex-col p-4 rounded-[5px] gap-2      relative`,
    nameDiv: `flex max_smm:flex-col items-start h-[150px]  gap-5 py-5  max_smm:px-10 bg-[#262525] px-5 max_smm:px-0  rounded-[8px]`,
    img: `w-[50px] h-[50px] rounded-[10%]`,
  }
  return (
    <div className={style.commentDiv}>
      <div className="w-[100%] flex items-end justify-end"></div>

      <div className={style.nameDiv}>
        <div className="flex flex-col items-center w-[70px] h-[70px] bg-[#363434] rounded-[9px]  gap-2"></div>

        <div className="w-[100%] flex  gap-2 max_smm:items-center justify-center flex-col">
          <p className="text-[10px] w-[80%] h-[1.2rem] bg-[#363434] rounded-[20px]"></p>
          <p className="text-[10px] w-[60%] h-[1.2rem] bg-[#363434] rounded-[20px]"></p>
          <p className="text-[10px] w-[70%] h-[1.2rem] bg-[#363434] rounded-[20px]"></p>
        </div>
      </div>
    </div>
  )
}

export default CommentsCardLoading
