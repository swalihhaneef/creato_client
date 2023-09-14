import React from 'react'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import { useLocation } from 'react-router-dom'
import UserProfiles from '../../components/admin/profile/UserProfiles'

const Users_profile = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')
    console.log(id);
    return (
        <>
            <div className='flex'>

                <div className=''>
                    <A_Sidebar />
                </div>
                <div className='flex justify-center w-10/12'>
                    <div>

                        <A_header heading={'Reported Users'} />
                        <UserProfiles userId={id}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users_profile
