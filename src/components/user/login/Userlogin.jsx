import React, { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { decodeJwt } from 'jose'
import axiosInstance from '../../../Axios/UserAxios'
import { useDispatch, useSelector } from 'react-redux'
import { clientLogin } from '../../../redux/client'
import { toast,ToastContainer } from 'react-toastify'
const Userlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { Token } = useSelector((state) => state.Client)
    const dispatch = useDispatch()
    const userAxios = axiosInstance()
    const handleLogin = (e) => {
        e.preventDefault()
        console.log(email,password);
        userAxios.post('/login', { email, password }).then((res) => {
            console.log(res.data);
            if (res.data.success) {
                    dispatch(clientLogin({ Token: res.data.token, user: res.data.user, id: res.data.id }))
                navigate('/')
            }else{
                toast.error(res.data.message)
            }
        }).catch((err)=>{
            toast.error(err.message)
        })
    }
    useEffect(() => {
        if (Token) {
            if (Token) {
                navigate('/')
            }
        }
    }, [])
    const navigate = useNavigate(null)
    const backgroundImage = {
        backgroundImage: "url(../../../../public/images//wallpaper.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const googleLogin = (payload) => {
        const email = payload.email
        const username = payload.name
        userAxios.post('/googleLogin', { email, username }).then((res) => {
            if (res.data.success) {
                console.log(res.data.token);
                dispatch(clientLogin({ Token: res.data.token, username: res.data.username }))
                navigate('/')
            }
        })
    }
    return (
        <>
            <div className="w-screen h-screen flex items-center p-8" style={backgroundImage}>
                <div>
               

                    <form onSubmit={handleLogin}>
                        <p className="text-black  text-[34px] font-normal mb-8">Login</p>
                        <p className="mb-2 text-black text-2xl font-normal">EMAIL</p>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="w-[300px] h-8 text-white mt-1 bg-stone-800" />
                        <p className="mb-2 text-black text-2xl font-normal mt-3">PASSWORD</p>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-[300px] h-8 text-white mt-1 bg-stone-800" />
                        <div className='flex justify-center mt-3' >
                            <button type="submit" className="w-[100px] h-[35px] bg-stone-600 rounded-[100px] text-black border border-black hover:bg-black hover:text-white font-normal mt-3">Login</button>
                        </div>
                        <div className="mt-4 text-black text-lg font-normal">Don't  have an account? Just <span onClick={() => navigate('/signup')} className="text-decoration-line:underline">Sign up</span>
                        </div>
                    </form>
                    <div className='mt-5 flex justify-center'>
                        <GoogleLogin onSuccess={credentialResponse => {
                            const { credential } = credentialResponse
                            const payload = credential ? decodeJwt(credential) : undefined
                            if (payload) {
                                googleLogin(payload);
                            }
                        }}
                            onError={error => {
                                console.log(error);
                            }}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userlogin
