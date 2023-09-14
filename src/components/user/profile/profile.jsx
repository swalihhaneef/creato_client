import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../Axios/UserAxios'

import { SlOptionsVertical } from 'react-icons/sl'
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import { clientLogout } from '../../../redux/client'
import { useNavigate } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'
const Profile = ({ userId }) => {

    const { Token, username, profilepic, id } = useSelector((state) => state.Client)
    const [followers, setFollowers] = useState(null)
    const [following, setFollowings] = useState(null)
    const [posts, setPosts] = useState([])
    const [showModalXL, setShowModalXL] = useState(false);
    const [settingsDropdown, setsettingsDropdown] = useState(false)
    const [state, setState] = useState('posts')
    const dispatch = useDispatch()
    const [user, setUser] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [post_id, setPostId] = useState('')
    const navigate = useNavigate(null)
    const userAxios = axiosInstance()
    useEffect(() => {
        if (Token) {
            userAxios.get(`/profile?id=${userId}`).then((res) => {
                if (res.data.success) {
                    console.log(res.data);
                    setFollowers(res.data.followers)
                    setFollowings(res.data.followings)
                    setPosts(res.data.post)


                    setUser(res.data.user)


                    const postImages = posts.map((item) => {
                        return (
                            item.post != undefined
                        )
                    })
                    console.log(postImages);


                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])
    const createChat = () => {
        userAxios.get(`/getSingleChat?id=${userId}`).then((res) => {
            if (res.data.success) {
                console.log(res.data.chatId);
                navigate(`/messages?id=${res.data.chatId}`)
            }
        })
    }
    const toggleDropdown = () => {
        console.log('her');
        setDropdownOpen(prevState => !prevState);
    };
    const handleOptionClick = (option) => {
        console.log(option);
        // Implement the actions for each menu item here
        if (option === 'signout') {
            dispatch(clientLogout())
            navigate('/login')
        } else if (option === 'editProfile') {
            navigate('/editprofile')
        }
    };
    const setReportUser = (id, reason) => {
        console.log(id);
        userAxios.patch('/reportUser', { id, reason })
    }
    return (
        <>
            <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">

                <div className="main__inner">


                    <div className="py-6 relative">

                        <div className="flex md:gap-16 gap-4 max-md:flex-col">
                            <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                                <div className="relative w-40 h-40  rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                                    {user.profilePic ? 
                                    <img src={user.profilePic} alt="" className="w-full h-full absolute object-cover" />:
                                    <RxAvatar className='w-full h-full rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                }
                                </div>
                                <button type="button" className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"> <ion-icon name="camera" className="text-2xl"></ion-icon></button>
                            </div>
                            <div className="max-w-2x flex-1">
                                <h3 className="md:text-xl text-base font-semibold text-black dark:text-white"> {user.username}</h3>

                                <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">@{user.username}</p>

                                {/* <p className="text-sm mt-2 md:font-normal font-light"> I love beauty and emotion. 🥰 I’m passionate about photography and learning. 📚 I explore genres and styles. 🌈 I think photography is storytelling. 📖 I hope you like and feel my photos. 😊</p> */}

                                <p className="mt-2 space-x-2 text-gray-500 text-sm hidden" >
                                    <a href="#" className="inline-block">Travel</a>
                                    <a href="#" className="inline-block">Business</a>
                                    <a href="#" className="inline-block">Technolgy</a>
                                </p>

                                <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
                                    <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                                        <div>
                                            <p>Posts</p>
                                            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{posts.length}</h3>
                                        </div>
                                        <div>
                                            <p>Following</p>
                                            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{followers}</h3>
                                        </div>
                                        <div>
                                            <p>Followers</p>
                                            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">{following}</h3>
                                        </div>
                                    </div>
                                    {userId != id ?
                                        <div className="flex items-center gap-3 text-sm">
                                            <button className="button text-gray-600 bg-slate-200 hidden">Follow</button>
                                            <button type="button" className="button bg-pink-100 text-pink-600 border border-pink-200">Unfallow</button>
                                            <button onClick={createChat} className="button bg-pink-600 text-white">Message</button>
                                            <div>
                                                <button type="submit" className="rounded-lg bg-slate-200/60 flex px-2 py-1.5 dark:bg-dark2"> <ion-icon className="text-xl" name="ellipsis-horizontal"></ion-icon></button>
                                                {/* <div className="w-[240px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10">
                                                    <nav>
                                                        <a href="#"> <ion-icon className="text-xl" name="pricetags-outline"></ion-icon> Unfollow </a>
                                                        <a href="#"> <ion-icon className="text-xl" name="time-outline"></ion-icon>  Mute story </a>
                                                        <a href="#"> <ion-icon className="text-xl" name="flag-outline"></ion-icon>  Report </a>
                                                        <a href="#"> <ion-icon className="text-xl" name="share-outline"></ion-icon> Share profile </a>
                                                        <hr />
                                                        <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl" name="stop-circle-outline"></ion-icon>  Block </a>
                                                    </nav>
                                                </div> */}
                                            </div>
                                        </div> :
                                        <div className='flex'>
                                            <button type="button" className="button bg-pink-100 text-pink-600 border border-pink-200"
                                            onClick={() => handleOptionClick('editProfile')}>Edit profile</button>
                                           
                                            <div>
                                                <button className="button__ico w-8 h-8" onClick={() => setsettingsDropdown(prevState => !prevState)}><SlOptionsVertical /></button>
                                                {settingsDropdown && (
                                                    <div className=" absolute z-10 w-max bg-slate-200" role="none">
                                                        
                                                       
                                                       
                                                        <button
                                                            type="button"
                                                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-slate-300"
                                                            role="menuitem"
                                                            onClick={() => handleOptionClick('signout')}
                                                        >Logout
                                                        </button>
                                                    </div>
                                                )}


                                            </div>
                                        </div>}
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="mt-10">



                        <div uk-sticky="cls-active: bg-slate-100/60 z-30 backdrop-blur-lg px-4 dark:bg-slate-800/60; start: 500; animation: uk-animation-slide-top">

                            <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
                                <ul className="flex gap-2 justify-center border-t dark:border-slate-700"
                                    uk-switcher="connect: #story_tab ; animation: uk-animation-fade, uk-animation-slide-left-medium">

                                    <li>
                                        <button onClick={() => setState('posts')} className="flex items-center p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white">
                                            Posts
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setState('saved')} className="flex items-center p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white">
                                            saved
                                        </button>
                                    </li>

                                </ul>
                            </nav>

                        </div>

                        <div id="story_tab" className="uk-switche">
                            <div>
                                {/* <div className="mt-8">
                                    <div className="flex items-center justify-between py-3">
                                        <h1 className="text-xl font-bold text-black dark:text-white">Highths</h1>

                                        <button type="button" className="lg:hidden">
                                            <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="relative mt-5" uk-slider="autoplay: true;finite: true">

                                        <div className="overflow-hidden uk-slider-container py-10">

                                            <ul className="-ml-2 uk-slider-items w-[calc(100%+0.875rem)]" uk-scrollspy="target: > li; cls: uk-animation-slide-right-small; delay: 50" uk-lightbox="">
                                                <li className="lg:w-1/5 sm:w-1/4 w-1/3 pr-3.5 max-lg:hidden" uk-scrollspy-className="uk-animation-fade">
                                                    <div className="flex flex-col items-center justify-center rounded-lg h-64 border-2 border-dashed border-teal-600">
                                                        <ion-icon name="add-circle" className="text-4xl text-teal-900"></ion-icon>
                                                        <div className="mt-1 font-semibold">Add New</div>
                                                    </div>
                                                </li>
                                                <li className="lg:w-1/5 sm:w-1/4 w-1/3 pr-3.5">
                                                    <a href="assets/images/avatars/avatar-lg-1.jpg" data-caption="Caption">
                                                        <div className=" lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
                                                            <div className="w-full lg:h-64 aspect-[2.5/4] realtive">
                                                                <img src="../../../../public/images/wallpaper.jpg" className="rounded-lg w-full h-full object-cover inset-0" alt="" />
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>



                                                <li className="lg:w-1/5 sm:w-1/4 w-1/3 pr-3.5">
                                                    <div className="w-full lg:h-64 aspect-[2.5/4] bg-slate-200/60 rounded-lg animate-pulse"></div>
                                                </li>
                                            </ul>

                                        </div>

                                        <button type="button" className="absolute -translate-y-1/2 bg-white rounded-full top-1/2 -left-4 grid w-9 h-9 place-items-center shadow  dark:bg-dark3" uk-slider-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon></button>
                                        <button type="button" className="absolute -right-4 -translate-y-1/2 bg-white rounded-full top-1/2 grid w-9 h-9 place-items-center shadow  dark:bg-dark3" uk-slider-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon></button>

                                    </div>

                                </div> */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between py-3">
                                        <h1 className="text-xl font-bold text-black dark:text-white">Posts</h1>

                                    </div>
                                    {state == 'posts' ?
                                        posts ?
                                            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-6">
                                                {posts.map((item) => {
                                                    return (
                                                        item.post && (
                                                            <>
                                                                <div onClick={() => { setShowModalXL(true), setPostId(item._id) }}>
                                                                    <div className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
                                                                        <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
                                                                            <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                                                                                <img src={item.post} alt="" className="object-cover w-full h-full" />
                                                                            </div>
                                                                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm uk-transition-fade">
                                                                                <div className="flex items-center justify-center gap-4 text-white w-full h-full">
                                                                                    <div className="flex items-center gap-2"> <ion-icon className="text-2xl" name="heart-circle"></ion-icon> {item.like.length}</div>
                                                                                    <div className="flex items-center gap-2"> <ion-icon className="text-2xl" name="chatbubble-ellipses"></ion-icon> {item.comment.length}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* modal */}
                                                                <TEModal show={showModalXL} setShow={setShowModalXL}>
                                                                    <TEModalDialog size="xl">
                                                                        <TEModalContent>

                                                                            {/* <!--Modal body--> */}
                                                                            <TEModalBody>
                                                                                {post_id == item._id ?
                                                                                    <div className=" relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">



                                                                                        <div class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">

                                                                                            <div class="relative z-10 w-full h-full">
                                                                                                <img src={item.post} alt="" class="w-full h-full object-cover absolute" />
                                                                                            </div>


                                                                                            <button type="button" onClick={() => setShowModalXL(false)} class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                                                </svg>
                                                                                            </button>

                                                                                        </div>
                                                                                        <div class="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">

                                                                                            <div class="p-5 pb-0">
                                                                                                {/* <!-- story heading --> */}
                                                                                                <div class="flex gap-3 text-sm font-medium">
                                                                                                    <img src={user.profilePic} alt="" class="w-9 h-9 rounded-full" />
                                                                                                    <div class="flex-1">
                                                                                                        <h4 class="text-black font-medium dark:text-white"> {user.username} </h4>
                                                                                                        <div class="text-gray-500 text-xs dark:text-white/80"> {item.time}</div>
                                                                                                    </div>

                                                                                                    {/* <!-- dropdown --> */}
                                                                                                    <div class="-m-1">
                                                                                                        <button className="button__ico w-8 h-8" onClick={toggleDropdown}><SlOptionsVertical /></button>
                                                                                                        {dropdownOpen && (
                                                                                                            <div class="w-[253px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true">
                                                                                                                <nav>
                                                                                                                    <a href="#"> <ion-icon class="text-xl shrink-0" name="bookmark-outline"></ion-icon>  Add to favorites </a>
                                                                                                                    <a href="#"> <ion-icon class="text-xl shrink-0" name="notifications-off-outline"></ion-icon> Mute Notification </a>
                                                                                                                    <a href="#"> <ion-icon class="text-xl shrink-0" name="flag-outline"></ion-icon>  Report this post </a>
                                                                                                                    <a href="#"> <ion-icon class="text-xl shrink-0" name="share-outline"></ion-icon>  Share your profile </a>
                                                                                                                    <hr />
                                                                                                                    <a href="#" class="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon class="text-xl shrink-0" name="stop-circle-outline"></ion-icon>  Unfollow </a>
                                                                                                                </nav>
                                                                                                            </div>)}
                                                                                                    </div>
                                                                                                </div>

                                                                                                <p class="font-normal text-sm leading-6 mt-4">{item.discription} </p>

                                                                                                <div class="shadow relative -mx-5 px-5 py-3 mt-3">
                                                                                                    <div class="flex items-center gap-4 text-xs font-semibold">
                                                                                                        <div class="flex items-center gap-2.5">
                                                                                                            <button type="button" class="button__ico text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="heart"></ion-icon> </button>
                                                                                                            <a href="#">1,300</a>
                                                                                                        </div>
                                                                                                        <div class="flex items-center gap-3">
                                                                                                            <button type="button" class="button__ico bg-slate-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                                                                                                            <span>260</span>
                                                                                                        </div>
                                                                                                        <button type="button" class="button__ico ml-auto"> <ion-icon class="text-xl" name="share-outline"></ion-icon> </button>
                                                                                                        <button type="button" class="button__ico"> <ion-icon class="text-xl" name="bookmark-outline"></ion-icon> </button>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>

                                                                                            <div class="p-5 h-full overflow-y-auto flex-1">

                                                                                                {/* <!-- comment list --> */}
                                                                                                {item.comment.map((item) => {
                                                                                                    return (
                                                                                                        <div class="relative text-sm font-medium space-y-5">

                                                                                                            <div class="flex items-start gap-3 relative">
                                                                                                                <img src={item.userId.profilePic} alt="" class="w-6 h-6 mt-1 rounded-full" />
                                                                                                                <div class="flex-1">
                                                                                                                    <a href="#" class="text-black font-medium inline-block dark:text-white"> {item.userId.username} </a>
                                                                                                                    <p class="mt-0.5">{item.comment} </p>
                                                                                                                </div>
                                                                                                            </div>


                                                                                                        </div>
                                                                                                    )
                                                                                                })}


                                                                                            </div>

                                                                                            <div class="bg-white p-3 text-sm font-medium flex items-center gap-2">

                                                                                                <img src="assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full" />

                                                                                                <div class="flex-1 relative overflow-hidden ">
                                                                                                    <textarea placeholder="Add Comment...." rows="1" class="w-full resize-  px-4 py-2 focus:!border-transparent focus:!ring-transparent resize-y"></textarea>

                                                                                                    <div class="flex items-center gap-2 absolute bottom-0.5 right-0 m-3">
                                                                                                        <ion-icon class="text-xl flex text-blue-700" name="image"></ion-icon>
                                                                                                        <ion-icon class="text-xl flex text-yellow-500" name="happy"></ion-icon>
                                                                                                    </div>

                                                                                                </div>

                                                                                                <button type="submit" class="hidden text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Replay</button>

                                                                                            </div>

                                                                                        </div>
                                                                                    </div> : ''}
                                                                            </TEModalBody>
                                                                        </TEModalContent>
                                                                    </TEModalDialog>
                                                                </TEModal>


                                                            </>


                                                        )
                                                    )
                                                })}
                                            </div> :
                                            <h1>you dont have any post</h1>

                                        : state == 'saved' ?
                                            user.saved_post.length > 0 ?
                                                <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-6">
                                                    {user.saved_post.map((item) => {
                                                        return (
                                                            item.post && (
                                                                <>
                                                                    <div onClick={() => { setShowModalXL(true), setPostId(item._id) }}>
                                                                        <div className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
                                                                            <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
                                                                                <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                                                                                    <img src={item.post} alt="" className="object-cover w-full h-full" />
                                                                                </div>
                                                                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm uk-transition-fade">
                                                                                    <div className="flex items-center justify-center gap-4 text-white w-full h-full">
                                                                                        <div className="flex items-center gap-2"> <ion-icon className="text-2xl" name="heart-circle"></ion-icon> {item.like.length}</div>
                                                                                        <div className="flex items-center gap-2"> <ion-icon className="text-2xl" name="chatbubble-ellipses"></ion-icon> {item.comment.length}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* modal */}
                                                                    <TEModal show={showModalXL} setShow={setShowModalXL}>
                                                                        <TEModalDialog size="xl">
                                                                            <TEModalContent>

                                                                                {/* <!--Modal body--> */}
                                                                                <TEModalBody>
                                                                                    {post_id == item._id ?
                                                                                        <div className=" relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">



                                                                                            <div class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">

                                                                                                <div class="relative z-10 w-full h-full">
                                                                                                    <img src={item.post} alt="" class="w-full h-full object-cover absolute" />
                                                                                                </div>


                                                                                                <button type="button" onClick={() => setShowModalXL(false)} class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                                                    </svg>
                                                                                                </button>

                                                                                            </div>
                                                                                            <div class="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">

                                                                                                <div class="p-5 pb-0">
                                                                                                    {/* <!-- story heading --> */}
                                                                                                    <div class="flex gap-3 text-sm font-medium">
                                                                                                        <img src={user.profilePic} alt="" class="w-9 h-9 rounded-full" />
                                                                                                        <div class="flex-1">
                                                                                                            <h4 class="text-black font-medium dark:text-white"> {user.username} </h4>
                                                                                                            <div class="text-gray-500 text-xs dark:text-white/80"> {item.time}</div>
                                                                                                        </div>

                                                                                                        {/* <!-- dropdown --> */}
                                                                                                        <div class="-m-1">
                                                                                                            <button className="button__ico w-8 h-8" onClick={toggleDropdown}><SlOptionsVertical /></button>
                                                                                                            {dropdownOpen && (
                                                                                                                <div class="w-[253px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true">
                                                                                                                    <nav>
                                                                                                                        <a href="#"> <ion-icon class="text-xl shrink-0" name="bookmark-outline"></ion-icon>  Add to favorites </a>
                                                                                                                        <a href="#"> <ion-icon class="text-xl shrink-0" name="notifications-off-outline"></ion-icon> Mute Notification </a>
                                                                                                                        <a href="#"> <ion-icon class="text-xl shrink-0" name="flag-outline"></ion-icon>  Report this post </a>
                                                                                                                        <a href="#"> <ion-icon class="text-xl shrink-0" name="share-outline"></ion-icon>  Share your profile </a>
                                                                                                                        <hr />
                                                                                                                        <a href="#" class="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon class="text-xl shrink-0" name="stop-circle-outline"></ion-icon>  Unfollow </a>
                                                                                                                    </nav>
                                                                                                                </div>)}
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <p class="font-normal text-sm leading-6 mt-4">{item.discription} </p>

                                                                                                    <div class="shadow relative -mx-5 px-5 py-3 mt-3">
                                                                                                        <div class="flex items-center gap-4 text-xs font-semibold">
                                                                                                            <div class="flex items-center gap-2.5">
                                                                                                                <button type="button" class="button__ico text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="heart"></ion-icon> </button>
                                                                                                                <a href="#">
                                                                                                                    {item.like.length > 0 ? item.like.length : ''} like
                                                                                                                </a>
                                                                                                            </div>
                                                                                                            <div class="flex items-center gap-3">
                                                                                                                <button type="button" class="button__ico bg-slate-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                                                                                                                <span>{item.comment.length > 0 ? item.comment.length : ''} comment</span>
                                                                                                            </div>
                                                                                                            <button type="button" class="button__ico ml-auto"> <ion-icon class="text-xl" name="share-outline"></ion-icon> </button>
                                                                                                            <button type="button" class="button__ico"> <ion-icon class="text-xl" name="bookmark-outline"></ion-icon> </button>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>

                                                                                                <div class="p-5 h-full overflow-y-auto flex-1">

                                                                                                    {/* <!-- comment list --> */}
                                                                                                    {item.comment.map((item) => {
                                                                                                        return (
                                                                                                            <div class="relative text-sm font-medium space-y-5">

                                                                                                                <div class="flex items-start gap-3 relative">
                                                                                                                    <img src={item.userId.profilePic ? item.userId.profilePic : ''} alt="" class="w-6 h-6 mt-1 rounded-full" />
                                                                                                                    <div class="flex-1">
                                                                                                                        <a href="#" class="text-black font-medium inline-block dark:text-white"> {item.userId.username} </a>
                                                                                                                        <p class="mt-0.5">{item.comment} </p>
                                                                                                                    </div>
                                                                                                                </div>


                                                                                                            </div>
                                                                                                        )
                                                                                                    })}


                                                                                                </div>

                                                                                                <div class="bg-white p-3 text-sm font-medium flex items-center gap-2">

                                                                                                    <img src="assets/images/avatars/avatar-2.jpg" alt="" class="w-6 h-6 rounded-full" />

                                                                                                    <div class="flex-1 relative overflow-hidden ">
                                                                                                        <textarea placeholder="Add Comment...." rows="1" class="w-full resize-  px-4 py-2 focus:!border-transparent focus:!ring-transparent resize-y"></textarea>

                                                                                                        <div class="flex items-center gap-2 absolute bottom-0.5 right-0 m-3">
                                                                                                            <ion-icon class="text-xl flex text-blue-700" name="image"></ion-icon>
                                                                                                            <ion-icon class="text-xl flex text-yellow-500" name="happy"></ion-icon>
                                                                                                        </div>

                                                                                                    </div>

                                                                                                    <button type="submit" class="hidden text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Replay</button>

                                                                                                </div>

                                                                                            </div>
                                                                                        </div> : ''}
                                                                                </TEModalBody>
                                                                            </TEModalContent>
                                                                        </TEModalDialog>
                                                                    </TEModal>


                                                                </>


                                                            )
                                                        )
                                                    })}
                                                </div> :
                                                <h1>you dont have any post</h1>
                                            : ''}



                                </div>


                                <div className="flex justify-center my-6">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
     
    )
}

export default Profile
