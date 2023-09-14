import React from 'react'
import Profile from '../../components/user/profile/profile'

import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/user/side bar/Sidebar'

const ProfilePage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('Id')
  console.log(userId);

  return (
    <div>
     
      <Sidebar/>
      <Profile userId={userId}/>
     
    </div>
  )
}

export default ProfilePage
