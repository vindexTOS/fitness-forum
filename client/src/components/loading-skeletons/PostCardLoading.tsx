import React from 'react'

const PostCardLoading = () => {
  const style = {
    mainDiv: `w-[100%] relative rounded-[5px] bg-[#212121] h-[400px] animate-pulse  outline outline-[1px] outline-gray-600 hover:outline-[#ec2b58] max-h-[600px]  max_smm:max-h-[1200px] flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%]  max_smm:gap-10    px-10 p-6 `,
    img: `h-[400px] max-w-[80%] `,

    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
    subInfo: ``,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px] flex flex-col items-center py-2`,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.raiting}>
        <div className={style.btn}></div>
      </div>
      {/*  */}
      <section className={style.mainContent}>
        <div className={style.headerDiv}>
          <div className="flex items-center justify-center gap-2 max_smm:text-[12px]">
            <p>
              <span className="text-blue-300 hover:underline hover:text-blue-500">
                LOADING...
              </span>
            </p>
            <div className="text-gray-400 flex   max_smm:text-[9px] max_smm:w-[5rem] gap-1">
              <p>LOADING... </p>
              <span className="text-pink-600 hover:underline hoveR:text-pink-700"></span>
            </div>
            <p className="text-gray-500 max_smm:text-[9px] max_smm:w-[4rem] text-[12px]"></p>
          </div>
          <h1 className="text-[1.2rem] font-bold text-gray-300">LOADING....</h1>
        </div>
        {/*  */}
        <div className="   w-[100%] flex items-center justify-center">
          <div className="w-[100%] h-[300px]  break-words text-start flex  flex-col gap-3">
            <p className="w-[90%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[70%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[80%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[50%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[80%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[50%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[40%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[70%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[80%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
            <p className="w-[90%] h-[1.2rem] bg-gray-600 rounded-[20px]"></p>
          </div>
        </div>
        {/*  */}
      </section>
    </div>
  )
}

export default PostCardLoading
