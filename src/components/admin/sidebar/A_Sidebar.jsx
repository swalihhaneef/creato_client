import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdminLogout } from '../../../redux/admin'

const A_Sidebar = () => {
    const [user,setUser] = useState()
    const [post,setPost] = useState()
    const navigate = useNavigate(null)
   const dispatch = useDispatch()
    const showUsers =()=>{
        if(user != true){
            setUser(true)
        }else if(user == true){
            setUser(false)
        }
    }
    const showPosts = ()=>{
        if(post != true){
            setPost(true)
        }else if(post == true){
            setPost(false)
        }
    }
  return (
    <div className='flex w-[200px] '>
        <div className='w-max fixed '>
            <div className="w-[200px] ml-5 h-screen  border-r border-black">
                <div className='  '>
                    <div className="h-max text-center pt-3">
                            <h1 className='text-black text-xl font-bold '>Admin</h1>
                    </div>
                    <div className="mt-10  ">
                        <button className='text-black text-base font-bold ' onClick={()=>navigate('/admin/')}>Home</button>
                    </div>
                    <div className=" font-bold mt-5">
                        <button className='text-black text-base font-bold' onClick={showUsers}>Users</button>
                            {user == true ? 
                                <div>
                                    <button className="ml-4 mt-2 text-black text-base font-bold" onClick={()=>navigate('/admin/userList')}>UserList</button>
                                    <button className="ml-4 mt-2 text-black text-base font-bold"  onClick={()=>navigate('/admin/reportedUser')}>Reported User</button>
                                    <button className="ml-4 mt-2 text-black text-base font-bold" onClick={()=>navigate('/admin/restrictedUser')}>Restricted User</button>
                                </div>
                            : ''}
                    </div>
                    <div className='mt-5' >
                        <button className="  text-black text-base font-bold" onClick={showPosts}>Posts</button>
                            {post == true ?
                                <div>
                                    <button className=" ml-4 mt-2 text-black text-base font-bold" onClick={()=> navigate('/admin/reportedPost')}>Reported Posts</button>
                                    <button className=" ml-4 mt-2 text-black text-base font-bold" onClick={()=> navigate('/admin/restrictedPost')}>Restricted Posts</button>
                                </div>
                            :''}
                    </div>
                    <div className="mt-5  text-black text-base font-bold">
                        <button className=" text-black text-base font-bold" onClick={()=>{dispatch(AdminLogout());navigate('login')}}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default A_Sidebar
