import React from 'react'
import { useLocation } from 'react-router-dom'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import A_home from '../../components/admin/adminhome/A_home'
import ProfileView from '../../components/admin/profile/ProfileView'

const IndividualView = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')
    console.log(id);
    return (
        <>
            <div className='flex'>

                <div className=''>
                    <A_Sidebar  />
                </div>
                <div className='flex justify-center w-10/12'>
                    <div>

                        <A_header heading={'reported Posts'} />
                        <ProfileView  postId={id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndividualView
