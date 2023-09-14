import React from 'react'

import Profile from '../../components/user/profile/profile'

import { useLocation } from 'react-router-dom'

const ViewProfile = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')
    console.log(userId);
  return (
    <div>
   
      <Profile userId={userId}/>
     
    </div>
  )
}

export default ViewProfile
