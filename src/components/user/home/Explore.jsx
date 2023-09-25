import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../Axios/UserAxios'
import { useSelector } from 'react-redux'
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import { SlOptionsVertical } from 'react-icons/sl';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
const Explore = () => {
    const { Token, id } = useSelector((state) => state.Client)
    const [post, Setpost] = useState([])
    const [showModalXL, setShowModalXL] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [post_id, setPostId] = useState('')
    const navigate = useNavigate(null)
    const userAxios = axiosInstance()
    useEffect(() => {
        userAxios.get('/explore').then((res) => {
            Setpost(res.data.filteredPosts)
        })
    }, [])
    const toggleDropdown = () => {
        console.log('her');
        setDropdownOpen(prevState => !prevState);
    };
    return (
        <div>
            <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">

                {/* <!-- explore --> */}
                <div class="main__inner">







                    <div class="gallery " uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100">
                        {post.map((item) => {
                            return (
                                <>
                                    <div class="gallery__card" onClick={() => { setShowModal(true), setPostId(item._id) }}>
                                        <a  >
                                            <div class="card__image">
                                                <img src={item.post} alt="" />
                                            </div>
                                        </a>
                                    </div>
                                  
                                    {showModal ? (
                                        <>
                                            <div
                                                className="justify-center items-center flex  overflow-y-auto fixed z-50 outline-none focus:outline-none"
                                            >
                                                <button className='absolute top-2 right-2 text-2xl border rounded-full py-2 px-3 bg-slate-300'
                                                    onClick={() => setShowModal(false)}>X</button>
                                                <div className=" w-auto my-6 mx-auto">

                                                    {/*content*/}
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        {/*header*/}

                                                        {/* <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">
                                                                Modal Title
                                                            </h3>
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                    ×
                                                                </span>
                                                            </button>
                                                        </div> */}
                                                        {/*body*/}
                                                        {post_id == item._id ?
                                                            <div class="lg:h-full  w-full h-96 flex justify-center items-center  ">

                                                                <div class="  w-full h-full">
                                                                    <img src={item.post} alt="" class="w-full h-full object-cover " />
                                                                </div>

                                                                <div class="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">

                                                                    <div class="p-5 pb-0">
                                                                        {/* <!-- story heading --> */}
                                                                        <div class="flex gap-3 text-sm font-medium">
                                                                            {item.userId.profilePic ?
                                                                                <img src={item.userId.profilePic} alt=""
                                                                                    onClick={() => navigate(`/profile?Id=${item.userId._id}`)} class="w-9 h-9 rounded-full" />
                                                                                :
                                                                                <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }}
                                                                                    onClick={() => navigate(`/profile?Id=${item.userId._id}`)} />
                                                                            }
                                                                            <div class="flex-1">
                                                                                <h4 class="text-black font-medium dark:text-white"
                                                                                    onClick={() => navigate(`/profile?Id=${item.userId._id}`)}> {item.userId.username} </h4>
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
                                                                                    <a href="#">{item.like.length}</a>
                                                                                </div>
                                                                                <div class="flex items-center gap-3">
                                                                                    <button type="button" class="button__ico bg-slate-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                                                                                    <span>{item.comment.length}</span>
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
                                                        {/*footer*/}
                                                        {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Close
                                                            </button>
                                                            <button
                                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                      
                                        </>

                                    ) : null}
                                    <TEModal show={showModalXL} setShow={setShowModalXL}>
                                        <TEModalDialog size="xl">
                                            <TEModalContent>
                                                <TEModalHeader>
                                                    <button
                                                        type="button"
                                                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                        // onClick={() => setShowModalXL(false)}
                                                        aria-label="Close"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </TEModalHeader>
                                                {/* <!--Modal body--> */}
                                                <TEModalBody>
                                                    {post_id == item._id ?
                                                        <div className=" relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">



                                                            <div class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">

                                                                <div class="relative z-10 w-full h-full">
                                                                    <img src={item.post} alt="" class="w-full h-full object-cover absolute" />
                                                                </div>


                                                                <button type="button" class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>

                                                            </div>
                                                            <div class="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">

                                                                <div class="p-5 pb-0">
                                                                    {/* <!-- story heading --> */}
                                                                    <div class="flex gap-3 text-sm font-medium">
                                                                        {item.userId.profilePic ?
                                                                            <img src={item.userId.profilePic} alt=""
                                                                                onClick={() => navigate(`/profile?Id=${item.userId._id}`)} class="w-9 h-9 rounded-full" />
                                                                            :
                                                                            <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }}
                                                                                onClick={() => navigate(`/profile?Id=${item.userId._id}`)} />
                                                                        }
                                                                        <div class="flex-1">
                                                                            <h4 class="text-black font-medium dark:text-white"
                                                                                onClick={() => navigate(`/profile?Id=${item.userId._id}`)}> {item.userId.username} </h4>
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
                                                                                <a href="#">{item.like.length}</a>
                                                                            </div>
                                                                            <div class="flex items-center gap-3">
                                                                                <button type="button" class="button__ico bg-slate-100 dark:bg-slate-700"> <ion-icon class="text-lg" name="chatbubble-ellipses"></ion-icon> </button>
                                                                                <span>{item.comment.length}</span>
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
                        })}

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Explore
