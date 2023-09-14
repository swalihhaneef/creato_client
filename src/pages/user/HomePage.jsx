import React, { useState } from 'react'
import Home from '../../components/user/home/Home'


import Sidebar from '../../components/user/side bar/Sidebar'

const HomePage = () => {
  const [followStatus, setFollowStatus] = useState(false)
  const trigger = () => {
    setFollowStatus(prevState => !prevState)
    console.log('trigger');
  }
  return (
    <div id="wrapper">

      <Sidebar />
      <Home />

    </div>
  )
}

export default HomePage
