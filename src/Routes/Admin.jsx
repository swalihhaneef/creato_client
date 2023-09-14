import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/admin/AdminHome'
import Login from '../pages/admin/Login'
import UserList from '../pages/admin/UserList'
import ReportedPost from '../pages/admin/ReportedPost'
import IndividualView from '../pages/admin/IndividualView'
import RestrictedPost from '../pages/admin/RestrictedPost'
import ReportedUsers from '../pages/admin/ReportedUsers'
import Users_profile from '../pages/admin/Users_profile'
import RestrictedUser from '../pages/admin/RestrictedUser'

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminHome/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='userList' element={<UserList/>}/>
        <Route path='/reportedUser' element={<ReportedUsers/>}/>
        <Route path='/restrictedUser' element={<RestrictedUser/>}/>
        <Route path='/reportedPost' element={<ReportedPost/>}/>
        <Route path='/view' element={<IndividualView/>}/>
        <Route path='/restrictedPost' element={<RestrictedPost/>}/>
        <Route path='/userProfile' element={<Users_profile/>}/>
      </Routes>
    </div>
  )
}

export default Admin
