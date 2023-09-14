import React, { useEffect, useState } from 'react'
import A_header from '../../components/admin/header/A_header'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_list from '../../components/admin/table/A_list'
import { AdminAxios } from '../../Axios/adminAxios'
import { useSelector } from 'react-redux'

const UserList = () => {
    const {Token} = useSelector((state)=>state.Admin)
    const [users,setUsers] = useState([])
    
    useEffect(()=>{
        AdminAxios.get('/getUserList',{
            headers:{
                Authorization:Token
            }
        }).then((res)=>{
            if(res.data.success){
                const user = res.data.users
              setUsers(user)
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <>
        <div className='flex w-full'>
                <A_Sidebar/>
            <main className='flex justify-center w-10/12'>
                <div className=' '>
              
                <A_header heading='USER LIST'/>
                <A_list users={users}/>
                
                </div>
            </main>
        </div>
    </>
  )
}

export default UserList
