import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../Axios/adminAxios'
// import {profilePic} from '../../../Constants/datas'
import { useNavigate } from 'react-router-dom'

import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, } from "tw-elements-react";

const UserProfiles = ({ userId }) => {
    const [user, SetUser] = useState([])
    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')
    const [post, setpost] = useState([])
    const [reports, setReported] = useState([])
    const [showModalSm, setShowModalSm] = useState(false);

    const navigate = useNavigate(null)

    useEffect(() => {
        AdminAxios.get(`/userDetails?id=${userId}`).then((res) => {
            SetUser(res.data.user)
            setReported(res.data.reportCount)
            setFollowers(res.data.followers)
            setFollowings(res.data.followings)
            setpost(res.data.post)
        })
    }, [])
    console.log(user);
    const handleRestriction = (id) => {
        AdminAxios.patch('/restrictUser', { id }).then((res) => {
            if (res.data.success) {
                navigate('/admin/reportedUser')
            }
        })
    }
    return (
        <>
            <div>
                <div className='w-full flex justify-center mt-16'>
                    <div className="w-[700px] h-auto  mt-20 left-[230px] top-[60px] bg-neutral-300">


                        <div>
                            <div className='grid grid-cols-2 mt-5'>

                                <div>

                                    <img src={user.profilePic} className="w-[120px] h-[120px] rounded-full" alt="" />
                                </div>
                                <div className=" ml-10 mt-10 text-black text-[26px] tex font-normal">
                                    <p>{user.username}</p>
                                </div>
                            </div>
                            <div className='flex w-full justify-center py-10'>

                                <div>

                                    <p>{reports.length}</p>
                                    <p>reported him</p>
                                </div>

                                <button
                                    type="button"
                                    className="ml-3 px-8 border text-[16px] text-black rounded-full bg-white hover:bg-blue-900 hover:text-white"
                                    onClick={() => setShowModalSm(true)}
                                >
                                    Reasons
                                </button>

                                <button className="ml-3 px-8 border text-[16px] text-black rounded-full bg-white hover:bg-blue-900 hover:text-white"
                                    onClick={() => handleRestriction(userId)}> restrict</button>
                                <TEModal show={showModalSm} setShow={setShowModalSm}>
                                    <TEModalDialog size="sm">
                                        <TEModalContent>
                                            <TEModalHeader>
                                                {/* <!--Modal title--> */}
                                                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">

                                                </h5>
                                                {/* <!--Close button--> */}
                                                <button
                                                    type="button"
                                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                    onClick={() => { setShowModalSm(false), SetreportContents(false) }}
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

                                            <TEModalBody>
                                                {reports.map((item) => {
                                                    return (
                                                        <div className='flex text-center'>
                                                            <img className="w-[70px] h-[70px] mt-5   rounded-full" src={item.userId.profilePic} />
                                                            <div className='mt-5 ml-4'>
                                                                <h3>{item.userId.username}</h3>
                                                                <h2 key={item.userId} className='text-red-600'>"{item.reason}"</h2>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </TEModalBody>
                                        </TEModalContent>
                                    </TEModalDialog>
                                </TEModal>




                            </div>
                            <div className='grid grid-cols-3 mt-16 text-center'>
                                <div className=" text-black text-[16px] font-normal text-center">
                                    <p>{followers}</p>
                                    <p>FOLLOWERS</p>
                                </div>
                                <div className=" text-black text-center text-[16px] font-normal">
                                    <p>{followings}</p>
                                    <p>FOLLOWING</p>
                                </div>
                                <div className=" text-black text-[16px] text-center font-normal">
                                    <p>{post.length}</p>
                                    <p>POSTS</p>
                                </div>
                            </div>
                        </div>

                        {post ?
                            <div className='grid grid-cols-2 mt-6 gap-3 '>
                                <div>
                                    <div className=' h-[500px] border grid grid-cols-3 grid-rows-5 '>
                                        {post.map((item) => {
                                            return (
                                                item.post && (
                                                    <img className="w- h-[100px] border-2 border-white  " src={item.post} width={566} />

                                                ))
                                        })}
                                    </div>
                                </div>

                                <div className='overflow-x-auto'>
                                    {post.map((item) => {
                                        console.log();
                                        return (
                                            item.post ?
                                                <>
                                                    <div className=" h-auto  bg-white flex justify-center mb-2">
                                                        <div>
                                                            <div className='flex'>
                                                                <img className="w-[70px] h-[70px] mt-5   rounded-full" src={item.profilePic} />
                                                                <div className='grid grid-rows-3 mt-5 ml-7 text-start'>
                                                                    <div className=" text-stone-950 text-sm font-medium">{item.username}</div>
                                                                    <div className=" text-stone-950 text-sm font-normal">{item.time}</div>
                                                                    <div className="left-[179px] top-[79px]   text-neutral-950 text-sm font-normal">kannur,kerala,india</div>
                                                                </div>



                                                            </div>
                                                            <div >
                                                                <div className="ml-3 mt-3 text-black text-[16px] font-normal">
                                                                    <p>{item.description}</p>
                                                                </div>
                                                                <div className="  top-[101px]  ">
                                                                    <img src={item.post} width={566} alt="" />
                                                                </div>
                                                                <div className="w-[px] h-[20px]  bg-white grid grid-cols-4">
                                                                    <button className='text-center text-neutral-900 text-[14px] font-normal'>Like</button>
                                                                    <button className=" text-center text-stone-950 text-[14px] font-normal">SHARE</button>
                                                                    <button className=" text-center text-neutral-900 text-[14px] font-normal">COMMENT</button>
                                                                    <button className=" text-center text-neutral-950 text-[14px] font-normal">SAVE</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> :
                                                <div className=' flex items-center justify-center mb-2'>
                                                    <div className=" h-auto w-full  bg-white ">
                                                        <div className='flex'>
                                                            <img className="w-[70px] h-[70px] mt-5 ml-4  rounded-full" src={item.profilePic} />
                                                            <div className='grid grid-rows-3 mt-5 ml-7 text-start'>
                                                                <div className=" text-stone-950 text-sm font-medium">{item.username}</div>
                                                                <div className=" text-stone-950 text-sm font-normal">{item.time}</div>
                                                                <div className="left-[179px] top-[79px]   text-neutral-950 text-sm font-normal">kannur,kerala,india</div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3 mt-3 text-black text-[16px] font-normal">
                                                            <p>{item.description}</p>
                                                        </div>
                                                        <div className=" h-[20px] mt-2 border-t border-t-orange-50  bg-white grid grid-cols-4">
                                                            <button className='text-center text-neutral-900 text-[14px] font-normal'>Like</button>
                                                            <button className=" text-center text-stone-950 text-[14px] font-normal">SHARE</button>
                                                            <button className=" text-center text-neutral-900 text-[14px] font-normal">COMMENT</button>
                                                            <button className=" text-center text-neutral-950 text-[14px] font-normal">SAVE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                    })
                                    }

                                </div>
                            </div> : ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfiles
