import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, } from "tw-elements-react";
import axiosInstance from '../../../Axios/UserAxios'
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'
import { RxAvatar } from 'react-icons/rx';

const Sidebar = () => {
    const { Token, id } = useSelector((state) => state.Client)
    const [newPost, setNewPost] = useState(false)
    const [description, setDescription] = useState('')
    const [post, setPost] = useState(null)
    const [icon, setIcon] = useState(false)
    const [socket, setSocket] = useState('')
    const [showNotification, setShowNotification] = useState(false)
    const [notification, setNotification] = useState([])
    const [emptyNotification, setEmptyNotification] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [Query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const navigate = useNavigate(null)
    const userAxios = axiosInstance()
    useEffect(() => {
        userAxios.get('/notifications').then((res) => {
            if (res.data.notification == 'empty') {
                setEmptyNotification(true)
            } else {

                setNotification(res.data.notification);
                console.log(res.data)
            }
        })
    }, [])


    const imgConverter = (post) => {
        return new Promise((resolve, reject) => {
            const render = new FileReader();

            render.onload = () => {
                resolve(render.result);
            };

            render.onerror = (error) => {
                reject(error);
            };

            render.readAsDataURL(post);
        });
    };
    const handlePOst = async () => {
        const date = new Date().toDateString()


        const convertedImage = await imgConverter(post);
        console.log(convertedImage);
        userAxios.post('/addpost', { convertedImage, description, date }).then((res) => {
            if (res.data.success) {
                toast.success('uploaded successfully')
                setNewPost(false)
                navigate('/')
            }
        })

    }
    let debouncingTimeout
    const handleInput = (e) => {
        let value = e.target.value
        setQuery(value)
        clearTimeout(debouncingTimeout)
        debouncingTimeout = setTimeout(() => {
            performSearch(value)
        }, 2000)
    }
    const performSearch = (value) => {
        userAxios.get(`/search?value=${value}`).then((res) => {
            setResult(res.data.result)
        })
    }

    return (
        <div>
            <div class="fixed top-0 left-0   max-md:top-auto max-md:bottom-0">
                <div id="sidebar__inner" class=" sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500 bg-white shadow dark:bg-dark2 2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t max-md:dark:border-slate-700">


                    <div className=" h-20 px-2 flex items-center  max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-slate-900/80 backdrop-blur-xl">
                        <div className='flex w-full'>

                            <div className="w-full flex items-center justify-center ">

                                <img src="/images/logo.png" alt="" className="w-max  h-6 ml-1  dark:!hidden" />
                            </div>
                           
                        </div>
                    </div>



                    <nav class=" md:justify-around  sm:flex-1  sm:block hidden md:block   md:space-y-2">


                        <a onClick={() => navigate('/')} class="active">
                            {icon == true ?
                                <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="hidden">
                                    <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                                </svg>
                                :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="hidden">
                                        <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="max-xl:hidden"> Home </span>
                                </>
                            }

                        </a>
                        <a onClick={() => { setShowSearch(prevState => !prevState), setIcon(prevState => !prevState) }}>
                            {icon == true ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    <span class="max-xl:hidden"> Search </span>
                                </>}

                        </a>


                        <a onClick={() => navigate('/explorePage')}>
                            {icon == true ?
                                <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-compass " viewBox="0 0 16 16">
                                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                                </svg>
                                :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                                        <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                        <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="hidden">
                                        <path fill-rule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="max-xl:hidden"> Explore </span>
                                </>}

                        </a>
                        <a onClick={() => navigate('/messages')} class="max-md:!fixed max-md:top-2 max-md:right-2">
                            {icon == true ?
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                               
                                :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden">
                                        <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="max-md:hidden"> Messages </span>
                                </>}

                        </a>
                        <a onClick={() => { setShowNotification(prevState => !prevState), setIcon(prevState => !prevState) }} class="max-md:!fixed max-md:top-2 max-md:right-14 relative">
                            {icon == true ?
                                <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg> :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                    <span class="max-xl:hidden"> Notifications </span>
                                    <div class="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-2.5"></div>
                                </>
                            }

                        </a>
                        {showNotification &&
                            <div class="sm:w-[397px] w- absolute top-0  bg-white shadow-lg md:!left-[73px] z-50  dark:bg-dark2 dark:border1 max-md:bottom-[57px]" >
                                <div className="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">


                                    <div className="flex items-center justify-between px-5 py-4 mt-3">
                                        <h3 className="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">Notification</h3>

                                        {/* <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div> */}
                                    </div>
                                    <div class="px-2 -mt-2 text-sm font-normal">

                                        {/* <div class="px-5 py-3 -mx-2">
                                            <h4 class="font-semibold">New</h4>
                                        </div> */}

                                        {notification.map((item) => {
                                            return (
                                                item.content == 'follow' ?
                                                    <a href="#" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery bg-teal-500/5">
                                                        <div class="relative w-12 h-12 shrink-0">
                                                            {item.userId.profilePic? 
                                                            <img src={item.userId.profilePic} alt="" class="object-cover w-full h-full rounded-full" />
                                                        :
                                                            <RxAvatar className='w-14 h-14 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                                        }
                                                        </div>
                                                        <div class="flex-1 ">
                                                            <p> <b class="font-bold mr-1"> {item.userId.username}</b> started following you.  </p>
                                                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80"> 4 hours ago </div>
                                                            <div class="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                                                        </div>
                                                    </a> : item.content == 'like' ?
                                                        <a href="#" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery bg-teal-500/5">
                                                            <div class="relative w-12 h-12 shrink-0">
                                                            {item.userId.profilePic? 
                                                            <img src={item.userId.profilePic} alt="" class="object-cover w-full h-full rounded-full" />
                                                        :
                                                            <RxAvatar className='w-14 h-14 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                                        }
                                                            </div>
                                                            <div class="flex-1 ">


                                                                <p> <b class="font-bold mr-1"> {item.userId.username}</b> Liked your photo.  </p>


                                                                <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80"> 4 hours ago </div>
                                                                <div class=" absolute right-3 top-4">
                                                                    <img src={item.postId.post} className='w-[50px] h-[50px] flex justify-end' alt="" />
                                                                </div>
                                                            </div>
                                                        </a> : ""
                                            )
                                        })}




                                        {/* <div class="border-t px-5 py-3 -mx-2 mt-4 dark:border-slate-700/40">
                                            <h4 class="font-semibold">This Week</h4>
                                        </div> */}





                                    </div>
                                </div>
                            </div>
                        }
                        <a onClick={() => navigate('/shop')}>
                            {icon == true ?
                                <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden">
                                        <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="max-xl:hidden"> Shop </span>
                                </>}

                        </a>
                        <a onClick={() => setNewPost(true)}>
                            {icon == true ?
                                <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                :
                                <>
                                    <button class="flex items-center gap-3 w-full">
                                        <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="hidden">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="max-xl:hidden"> Create </span></button>
                                </>}

                        </a>
                        {newPost &&
                            <TEModal show={newPost} setShow={setNewPost}>
                                <TEModalDialog size="lg">
                                    <TEModalContent>
                                        <TEModalHeader>
                                            <ul className=" text-center text-sm font-semibold text-black dark:text-white dark:border-slate-700">

                                                <li>
                                                    <div> Upload Photo</div>
                                                    {post ?
                                                        <button onClick={handlePOst} class="absolute top-0 m-3 right-1 text-blue-600" > share</button> :
                                                        <button class="absolute top-0 m-3 right-1 text-slate-400" > share</button>
                                                    }

                                                </li>



                                            </ul>
                                        </TEModalHeader>
                                        {/* <!--Modal body--> */}
                                        <TEModalBody>
                                            <div >

                                                <div>





                                                    <div class="flex">

                                                        <div class="lg:w-[600px] w-full">

                                                            <div class="w-full lg:h-[600px] h-80 relative overflow-hidden flex justify-center items-center">



                                                                {post ?
                                                                    <img src={URL.createObjectURL(post)} alt="Uploaded Image" class="w-full h-full absolute object-cover fff" />
                                                                    : <div class="space-y-4 absolute flex flex-col justify-center" >
                                                                        <label for='img' class="w-full h-full absolute inset-0 z-10 hover: cursor-pointer">


                                                                            <div>
                                                                                <svg class="mx-auto text-gray-600 dark:text-white" height="77" role="img" viewBox="0 0 97.6 77.3"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                                                            </div>
                                                                            <div class=" mx-auto" >
                                                                                <button type="button" class="text-white bg-blue-600 rounded-lg py-1.5 px-4 text-sm dark:bg-white/5"> Select forom the Computer</button>
                                                                            </div>

                                                                            <input id='img' type="file" class="hidden" onChange={(e) => setPost(e.target.files[0])} />
                                                                        </label>
                                                                    </div>
                                                                }



                                                            </div>


                                                        </div>


                                                        <div class="relative w-auto border-l dark:border-slate-700">



                                                            <div class="lg:w-[300px] lg:max-h-[600px] overflow-y-auto uk-animation-fade">

                                                                <textarea onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="What is going on.." class="w-full !p-4 !rounded-none"></textarea>

                                                                <ul class="divide-y divide-gray-100 dark:divide-slate-700" uk-nav="multiple: true">

                                                                    <li>

                                                                        <div class="flex items-center justify-between py-2 px-3.5">
                                                                            <input type="text" placeholder="Add locations" class="font-medium text-sm w-full !bg-transparent !px-0 focus:!border-transparent focus:!ring-transparent" />
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                                            </svg>
                                                                        </div>

                                                                    </li>





                                                                </ul>

                                                            </div>



                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        </TEModalBody>
                                    </TEModalContent>
                                </TEModalDialog>
                            </TEModal>}
                        <a onClick={() => navigate(`/profile?Id=${id}`)} class="max-md:!hidden">
                            {icon == true ?
                                <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg> :
                                <>
                                    <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="max-xl:hidden"> Profile </span>
                                </>}


                        </a>
                    </nav>

                    {showSearch == true ?
                        <div class=" sm:w-full w-full bg-white shadow-lg md:!left-[73px] absolute top-0 !left-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px]">
                            <div class="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">


                                <div class="px-5 py-4 space-y-5 border-b border-gray-100 dark:border-slate-700">
                                    <h3 class="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">Search</h3>

                                    <div class="relative -mx-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 absolute left-3 bottom-1/2 translate-y-1/2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                        <input type="text" placeholder="Search"
                                            onChange={handleInput}
                                            value={Query} class="bg-transparen w-full !pl-10 !py-2 !rounded-lg" />
                                    </div>

                                </div>


                                <div class="p-2 space-y-2 dark:text-white">


                                    {Query.length == 0 ? '' :
                                        result.length == 0 ?
                                            <div>
                                                <p>no account found</p>
                                            </div> :
                                            (result.map((item) => {
                                                return (
                                                    <a onClick={() => navigate(`/profile?Id=${item._id}`)} className="flex items-center gap-3"
                                                        class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery">
                                                        {item.profilePic ?
                                                            <img src={item.profilePic} alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                                            : <RxAvatar className='w-10  h-10 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />}
                                                        <div class="fldex-1 min-w-0">
                                                            <h4 class="font-medium text-sm text-black dark:text-white">  {item.username} </h4>
                                                            <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">  </div>
                                                        </div>
                                                    </a>
                                                )
                                            }))}




                                </div>

                            </div>
                        </div> : ''}
                    {newPost &&
                        <TEModal show={newPost} setShow={setNewPost}>
                            <TEModalDialog size="lg">
                                <TEModalContent>
                                    <TEModalHeader>
                                        <ul className=" text-center text-sm font-semibold text-black dark:text-white dark:border-slate-700">

                                            <li>
                                                <div> <button onClick={() => setNewPost(false)}>
                                                    cancel</button></div>
                                                {post ?
                                                    <button onClick={handlePOst} class="absolute top-0 m-3 right-1 text-blue-600" > share</button> :
                                                    <button class="absolute top-0 m-3 right-1 text-slate-400" > share</button>
                                                }

                                            </li>



                                        </ul>
                                    </TEModalHeader>
                                    {/* <!--Modal body--> */}
                                    <TEModalBody>
                                        <div >

                                            <div>





                                                <div class="flex">

                                                    <div class="lg:w-[600px] w-full">

                                                        <div class="w-full lg:h-[600px] h-80 relative  flex justify-center items-center">



                                                            {post ?
                                                                <img src={URL.createObjectURL(post)} alt="Uploaded Image" class="w-full h-full absolute object-cover fff" />
                                                                : <div class="space-y-4 absolute flex flex-col justify-center" >
                                                                    <label for='img' class="w-full h-full absolute inset-0 z-10 hover: cursor-pointer">


                                                                        <div>
                                                                            <svg class="mx-auto text-gray-600 dark:text-white" height="77" role="img" viewBox="0 0 97.6 77.3"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                                                        </div>
                                                                        <div class=" mx-auto" >
                                                                            <button type="button" class="text-white bg-blue-600 rounded-lg py-1.5 px-4 text-sm dark:bg-white/5"> Select forom the Computer</button>
                                                                        </div>

                                                                        <input id='img' type="file" class="hidden" onChange={(e) => setPost(e.target.files[0])} />
                                                                    </label>
                                                                </div>
                                                            }



                                                        </div>


                                                    </div>


                                                    <div class="relative w-auto border-l dark:border-slate-700">



                                                        <div class="lg:w-[300px] lg:max-h-[600px] overflow-y-auto uk-animation-fade">

                                                            <textarea onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="What is going on.." class="w-full !p-4 !rounded-none"></textarea>

                                                            <ul class="divide-y divide-gray-100 dark:divide-slate-700" uk-nav="multiple: true">

                                                                <li>

                                                                    <div class="flex items-center justify-between py-2 px-3.5">
                                                                        <input type="text" placeholder="Add locations" class="font-medium text-sm w-full !bg-transparent !px-0 focus:!border-transparent focus:!ring-transparent" />
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                                        </svg>
                                                                    </div>

                                                                </li>





                                                            </ul>

                                                        </div>



                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </TEModalBody>
                                </TEModalContent>
                            </TEModalDialog>
                        </TEModal>}
                    {/* <div >
                        <a id="profile-link" class="flex items-center gap-3 p-3 group">
                            <img src="assets/images/avatars/avatar-7.jpg" alt="" class="rounded-full md:w-7 md:h-7 w-5 h-5 shrink-0" />
                            <span class="font-semibold text-sm max-xl:hidden">  Monroe Parker </span>
                            <ion-icon name="chevron-forward-outline" class="text-xl ml-auto duration-200 group-aria-expanded:-rotate-90 max-xl:hidden"></ion-icon>
                        </a>
                        <div class="bg-white sm:w-64 2xl:w-[calc(100%-16px)] w-full shadow-lg border rounded-xl overflow-hidden max-md:!top-auto max-md:bottom-16 border2 dark:bg-dark2 hidden" uk-drop="animation:uk-animation-slide-bottom-medium ;animate-out: true">

                            <div class="w-full h-1.5 bg-gradient-to-r to-purple-500 via-red-500 from-pink-500"></div>

                            <div class="p-4 text-xs font-medium">
                                <a href="profile.html">
                                    <img src="assets/images/avatars/avatar-3.jpg" class="w-8 h-8 rounded-full" alt="" />
                                    <div class="mt-2 space-y-0.5">
                                        <div class="text-base font-semibold"> Monroe Parker </div>
                                        <div class="text-gray-400 dark:text-white/80"> @monroe </div>
                                    </div>
                                </a>
                                <div class="mt-3 flex gap-3.5">
                                    <div> <a href="profile.html"> <strong> 620K </strong> <span class="text-gray-400 dark:text-white/80 ml-1">Following </span> </a> </div>
                                    <div> <a href="profile.html"> <strong> 38k </strong> <span class="text-gray-400 dark:text-white/80 ml-1">Followers </span> </a>  </div>
                                </div>

                            </div>
                            <hr class="opacity-60" />
                            <ul class="text-sm font-semibold p-2">
                                <li> <a href="setting.html" class="flex gap-3 rounded-md p-2 hover:bg-secondery"> <ion-icon name="person-outline" class="text-lg"></ion-icon> Profile     </a></li>
                                <li> <a href="upgrade.html" class="flex gap-3 rounded-md p-2 hover:bg-secondery"> <ion-icon name="bookmark-outline" class="text-lg"></ion-icon> Upgrade </a></li>
                                <li> <a href="setting.html" class="flex gap-3 rounded-md p-2 hover:bg-secondery"> <ion-icon name="settings-outline" class="text-lg"></ion-icon> Acount Setting  </a></li>
                                <li> <a href="form-login.html" class="flex gap-3 rounded-md p-2 hover:bg-secondery"> <ion-icon name="log-out-outline" class="text-lg"></ion-icon> Log Out</a></li>
                            </ul>

                        </div>
                    </div> */}

                </div>
            </div>
            <div className='bg-white py-2 w-full z-20 fixed top-0 md:relative md:bg-transparent sm:hidden'>
                <div className='flex w-full'>

                    <div className="w-full flex items-center justify-center ">

                        <img src="../../../../public/images/logo.png" alt="" className="w-max  h-6 ml-1  dark:!hidden" />
                    </div>
                    <div className='flex w-full justify-end '>


                       <button className='px-2' onClick={() => navigate('/messages')}>
                         <svg id="icon__outline" className='w-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        </button>
                        <button className='px-2' onClick={() => { setShowNotification(prevState => !prevState)}}>
                        <svg id="icon__outline" className='w-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        </button>

                    </div>
                </div>
            </div>
            <nav className="bg-white py-2 w-full z-20 fixed bottom-0 md:relative md:bg-transparent sm:hidden">
                <div className='flex  justify-between mx-2'>
                    <button onClick={() => navigate('/')} className='w-8'>
                        <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div onClick={() => { setShowSearch(prevState => !prevState) }} className='w-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                     
                    </div>
                    <button onClick={() => navigate('/shop')} className='w-8'>
                        <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                            <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={() => navigate('/explorePage')} className='w-8'>
                        <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                            <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                            <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                        </svg>
                    </button>
                    <button onClick={() => setNewPost(true)} className='w-8'>
                        <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <button onClick={() => navigate(`/profile?Id=${id}`)} className='w-8'>
                        <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </nav>

        </div>
    )
}

export default Sidebar
