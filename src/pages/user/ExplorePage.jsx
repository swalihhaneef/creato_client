import React, { useState } from 'react'

import Explore from '../../components/user/home/Explore'
import Sidebar from '../../components/user/side bar/Sidebar'

const ExplorePage = () => {
    const [followStatus, setFollowStatus] = useState(false)
    const trigger = () => {
        setFollowStatus(prevState => !prevState)
        console.log('trigger');
    }
    return (
        <div id="wrapper">
            <Sidebar />
            <Explore />
        </div>
    )
}

export default ExplorePage
