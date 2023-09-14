import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../Axios/adminAxios'
import { useSelector } from 'react-redux'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import PostList from '../../components/admin/table/PostList'

const RestrictedPost = () => {
    const {Token} = useSelector((state)=> state.Admin)
    const [restricted,setRestricted] = useState([])
    useEffect(()=>{
        AdminAxios.get('/getRestrictedPost',{
            headers:{
                Authorization:Token
            }
        }).then((res)=>{
            setRestricted(res.data.restrictedPost)
        })
    },[])
    console.log(restricted);
    return (
        <div className='flex'>

            <div>
                <A_Sidebar />
            </div>
            <div className='flex justify-center w-10/12'>
                <div>

                    <A_header heading={'Restricted Posts'} />
                    <PostList props={restricted} />
                </div>
            </div>
        </div>
    )
}

export default RestrictedPost
