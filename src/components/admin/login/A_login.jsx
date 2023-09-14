import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../Axios/adminAxios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdminLogin } from '../../../redux/admin'
import { toast } from 'react-toastify'

const A_login = () => {
    const { Token } = useSelector((state) => state.Admin)
    const navigate = useNavigate(null)
    const dispatch = useDispatch()

    if (Token) {
        useEffect(() => {
            navigate('/admin')
        })
    }
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const handleform = (e) => {
        e.preventDefault()
        AdminAxios.post('/login', { email, password }).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(AdminLogin({ Token: res.data.token }))
                navigate('/admin')
            }
        }).catch((err) => {
            toast.error(res.data.message)
        })
    }
    return (
        <div>
            <div className="w-screen h-screen flex justify-center items-center bg-neutral-600">
                <div>
                    <div className=" text-center text-black text-[32px] font-normal">
                        <p>Admin</p>
                    </div>
                    <form onSubmit={handleform} className="w-[402px] h-[381px]  flex  justify-center text-center border border-black">
                        <div>
                            <div className='mt-10'>
                                <p className=" text-xl text-black  font-bold">Email</p>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-[300px] text-center h-[30px] bg-stone-500 rounded-[18px]" />
                            </div>
                            <div className='mt-6'>
                                <p className="  text-black text-xl font-bold">password</p>
                                <input type="password" onChange={(e) => setpassword(e.target.value)} className="w-[300px] h-[30px] text-center bg-stone-500 rounded-[18px]" />
                            </div>
                            <div className='mt-6 flex justify-center'>
                                <button className="w-max h-max px-3   text-black   bg-stone-500 rounded-[30px]">LOGIN</button>
                            </div>
                            <div className='mt-6 text-center'>
                                <p className="w-[300px] border-t-2 border-black  text-black text-base font-light">forget password?</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default A_login
