import React, { useEffect, useState } from 'react'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import PostList from '../../components/admin/table/PostList'
import { useSelector } from 'react-redux'
import {AdminAxios} from '../../Axios/adminAxios'

const ReportedPost = () => {
    const {Token} = useSelector((state)=> state.Admin)
    const [reprotedPost,setReportedPost] = useState([])
    useEffect(()=>{
        if(Token){
            AdminAxios.get('/reportedPosts',{
                headers:{
                    Authorization:Token
                }
                
            }).then((res)=>{
               
                setReportedPost(res.data.reportedPost)
            })
        }
    },[])
    return (
        <>
            <div className='flex'>

                <div>
                    <A_Sidebar />
                </div>
                <div className='flex justify-center w-10/12'>
                    <div>

                    <A_header heading={'reported Posts'} />
                    <PostList props={reprotedPost}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportedPost
