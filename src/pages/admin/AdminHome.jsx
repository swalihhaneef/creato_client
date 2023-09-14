import React from 'react'
import A_home from '../../components/admin/adminhome/A_home'
import A_Sidebar from '../../components/admin/sidebar/A_Sidebar'
import A_header from '../../components/admin/header/A_header'
import A_list from '../../components/admin/table/A_list'

const AdminHome = () => {
  return (
    <>    
    <div className='flex'>
      <A_Sidebar />
      <div className='flex justify-center w-10/12'>
      <A_header heading='Home' />
       {/* <A_home/> */}
      </div>
    </div>
    
     

    </>
  )
}

export default AdminHome
