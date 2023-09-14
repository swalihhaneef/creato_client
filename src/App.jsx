import { useState } from 'react'
import './App.css'
import './style.css'
import './tailwind.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './Routes/user'
import Admin from './Routes/Admin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<User />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </BrowserRouter>
    </>
  )
}

export default App
