import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../Axios/adminAxios'
import { useSelector } from 'react-redux'

const A_home = () => {
  const { Token } = useSelector((state) => state.Admin)
  // useEffect(()=>{
  // AdminAxios.get('/verify',{
  //     headers:{
  //         Authorization:Token
  //     }
  // }).then((res)=>{
  //     if(res.data.success == false){
  //         console.log('then');
  //     }
  // }).catch((res)=>{
  //     if(res.data.success == false){
  //         console.log('catch');
  //     }
  // })
  // })

  return (
    <div>
      <div className=" bg-neutral-600 w-full h-full flex justify-center items-center">
        <h1>Hello Admin</h1>
      </div>
    </div>
  )
}

export default A_home
