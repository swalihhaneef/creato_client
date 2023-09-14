import React, { useEffect, useState } from 'react'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import A_list from '../../components/admin/table/A_list'
import { AdminAxios } from '../../Axios/adminAxios'
import { useSelector } from 'react-redux'

const ReportedUsers = () => {
    const {Token} = useSelector((state)=> state.Admin)
    const [user,setUser] = useState([])
    useEffect(()=>{
        AdminAxios.get('/getUserList',{
            headers:{
                Authorization:Token
            }
        }).then((res)=>{
            console.log(res.data.users);

            setUser (res.data.users)
           

        })
    },[])
    const reports = user.filter((item) => item.is_reported.length > 0).filter((item)=>item.is_restricted != true)
    console.log(reports);
  return (
    <>
       <div className='flex w-full'>
                <A_Sidebar/>
            <main className='flex justify-center w-10/12'>
                <div className=' '>
              
                <A_header heading='Reported User List'/>
                <A_list users={reports}/>
                
                </div>
            </main>
        </div>
    </>
  )
}

export default ReportedUsers
