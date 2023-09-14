import React from 'react'

const A_header = ({ heading }) => {
  return (
    <>
      <div className=' flex  w-[800px] '>
        <div className=" w-[800px]  fixed top-0 h-max py-6 mt-  grid grid-cols-3 bg-stone-400 rounded-[23px]">
          <div className="   text-black text-20 font-bold"></div>
          <div className="  text-center mt-4 text-black text-[20px] font-bold">{heading}</div>
          <div className="  text-black text-20font-bold"></div>
        </div>
      </div>
    </>
  )
}

export default A_header
