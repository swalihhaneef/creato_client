import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Signup from '../pages/user/Signup'
import LoginPage from '../pages/user/login'
import HomePage from '../pages/user/HomePage'
import ProfilePage from '../pages/user/ProfilePage'
import EditprofilePage from '../pages/user/EditprofilePage'
import ViewProfile from '../pages/user/ViewProfile'

import ExplorePage from '../pages/user/ExplorePage'
import ShopPage from '../pages/user/ShopPage'
import MessagePage from '../pages/user/MessagePage'
import VedioCallpage from '../pages/user/VedioCallpage'
const user = () => {
  return (
   <>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      
        <Route path='/editprofile' element={<EditprofilePage/>} />
        <Route path='/viewProfile' element={<ViewProfile/>} />
        <Route path='/explorePage' element={<ExplorePage/>} />
       
        <Route path='/shop' element={<ShopPage/>}/>
        <Route path='/messages' element={<MessagePage/>}/>

        <Route path='/joinVedioCall' element={<VedioCallpage/>}/>
    </Routes>
   </>
  )
}

export default user
