import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../Axios/UserAxios'
import { useNavigate } from 'react-router-dom'

import {  commentIcon } from '../../../assets/icons/icons'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'


import { SlOptionsVertical } from 'react-icons/sl'
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, } from "tw-elements-react";
import { RxAvatar } from 'react-icons/rx'
import { toast } from 'react-toastify'


const Home = () => {
    const { Token, id, user } = useSelector((state) => state.Client)
    const navigate = useNavigate(null)
    const [post, setPost] = useState([])
    const [state, setState] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [success, setSuccess] = useState()
    const [products, setProducts] = useState([])
   
    const [moreComments, setMorecomments] = useState(false)
    const [comment, setComment] = useState('')
    const [openCommentId, setOpenCommentId] = useState(null);
    const [showReplies, setReplies] = useState(null)
    const [reply, setReply] = useState('')
    const [sugg, Setsugg] = useState([])
    const [follow, setFollow] = useState(false)
    const [showModalSm, setShowModalSm] = useState(false);
   
    console.log(user, 'aksdbfuoasgfuo');
  

    const textareaRef = useRef(null);
    const userAxios = axiosInstance()
    const handleCommentButtonClick = () => {
        if (textareaRef.current) {
            textareaRef.current.scrollIntoView({ behavior: 'smooth' });
            textareaRef.current.focus();
        }
    };

    useEffect(() => {

        if (Token) {

            userAxios.get('/').then((res) => {
                if (res.data.success) {
                    Setsugg(res.data.suggessions)
                    let posts = res.data.filteredPosts
                    console.log(posts);
                    setPost(posts)
                    let pros = res.data.products
                    setProducts(pros)
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            navigate('/login')
        }
    }, [state])

    const handleLike = (postId, userId) => {

        console.log(postId)
        userAxios.post('/like', { postId, userId }).then((res) => {
            if (res.data.success) {
                if (res.data.like) {
                    setState(res.data.like)
                } else if (res.data.dislike) {
                    setState(res.data.dislike)
                }
            }
        })
    }
    const handleComment = (postId) => {

        userAxios.post('/comment', { postId, comment }).then((res) => {
            if (res.data.success) {
                if (res.data.commented) {
                    setState(res.data.commented)
                    setComment('')
                }
            }
        })
    }
    const reportPost = (postId, reason) => {
        console.log(postId);
        userAxios.post('/reportPost', { postId, reason }).then((res) => {
            if (res.data.success) {
                console.log('done');
                toast.success('reported succesfull')
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleFollow = ((id) => {
        userAxios.patch('/follow', { id }).then((res) => {
            if (res.data.success) {
                setSuccess(id)
                trigger()
            }
        })
    })
    const handleReplyComment = (commentId, comment, userId) => {
        userAxios.patch('/reply', { commentId, comment, userId }).then((res) => {
            if (res.data.success) {
                setState(res.data.replied)
                setOpenCommentId('')
            }
        })
    }
    const handleCommentLike = async (commentId, userId) => {
        try {
            const response = await userAxios.patch('/likeComment', { commentId, userId })
            if (response.data.success) {
                setState(response.data.liked)
            }
        } catch (error) {
            return false;
        }

    }
    const savePost = async (postid) => {
        try {
            const response = await userAxios.patch('/savePost', { postid, id })
            if (response.data.success) {
                console.log(response.data.saved);
                seState(response.data.saved)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    // const handleStatus = async() => {
    //     const convertedImage = await imgConverter(statusImage)
    //      userAxios.post('/addStatus',{id,convertedImage}).then((res)=>{
    //         if(res.data.success){
    //             console.log('done');
    //             showModalStatus(prevState => !prevState)
    //         }
    //      })
      
    // }
    return (
        <>
            <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">

                <div className="main__inner">


                    {/*Stories*/ 
                    /* <div>

                        <h3 className="font-extrabold text-2xl  text-black dark:text-white"> Stories</h3>

                        <div className="relative" tabindex="-1" uk-slider="autoplay: true;finite: true">

                            <div className="py-5 uk-slider-container">

                                <ul className="uk-slider-items w-[calc(100%+14px)]" uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true">
                                    <li className="md:pr-3" uk-scrollspy-className="uk-animation-fade">
                                        <ion-icon name="camera" className="text-2xl"></ion-icon>
                                    </li>
                                    <li className="md:pr-2.5 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                                        <a href="assets/images/avatars/avatar-lg-1.jpg" data-caption="Caption 1">
                                            <div className="md:w-20 md:h-20 w-12 h-12 relative md:border-4 border-2 shadow border-red-600 rounded-full overflow-hidden dark:border-slate-700">
                                                {user.profilePic ?
                                                    <img src={user.profilePic} alt="" className="absolute w-full h-full object-cover" /> :
                                                    <img src="assets/images/avatars/avatar-2.jpg" alt="" className="absolute w-full h-full object-cover" />}

                                            </div>
                                        </a>
                                    </li>
                                    <li className="md:pr-2.5 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300">
                                        <a href="assets/images/avatars/avatar-lg-2.jpg" data-caption="Caption 1">
                                            <div className="md:w-20 md:h-20 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                                <img src="assets/images/avatars/avatar-3.jpg" alt="" className="absolute w-full h-full object-cover" />
                                            </div>
                                        </a>
                                    </li>
                               
                                    <li className="md:pr-2.5 pr-2">
                                        <div className="md:w-20 md:h-20 w-12 h-12 bg-slate-200/60 rounded-full dark:bg-dark2 animate-pulse"></div>
                                    </li>
                                </ul>

                            </div>

                            <div className="max-md:hidden">

                                <button type="button" className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="previous"> <ion-icon name="chevron-back" className="text-2xl"></ion-icon></button>
                                <button type="button" className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3" uk-slider-item="next"> <ion-icon name="chevron-forward" className="text-2xl"></ion-icon> </button>

                            </div>


                        </div>

                    </div> */}

                    <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10" id="js-oversized">



                        <div className="md:max-w-[510px] mx-auto flex-1 xl:space-y-6 space-y-3">



                          

                            {post.map((item) => {
                                return (
                                    <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">


                                        <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                            <a onClick={() => navigate(`/profile?Id=${item.userId._id}`)}>
                                                {item.userId.profilePic ?
                                                    <img src={item.userId.profilePic} alt="" className="w-9 h-9 rounded-full" />
                                                    : <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                                }

                                            </a>
                                            <div className="flex-1">
                                                <a href="profile.html"> <h4 className="text-black dark:text-white"> {item.userId.username} </h4> </a>
                                                <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                                            </div>

                                            <div className="-mr-1 relative">
                                                <button type="button" className="button__ico w-8 h-8" onClick={() => setIsModalOpen(prevState => !prevState)}>

                                                    <SlOptionsVertical />
                                                </button>
                                                {isModalOpen &&
                                                    <div className="w-[245px] absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg py-2 z-10">
                                                        <nav>


                                                            <button className="text-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setShowModalSm(true), console.log('true'); }}>


                                                                Report this post

                                                            </button>
                                                            <button className="text-center w-full py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                onClick={() => savePost(item._id)}>

                                                                save
                                                            </button>
                                                            <button className="text-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-50 hover:text-red-600" >

                                                                Unfollow
                                                            </button>

                                                            {showModalSm &&
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
                                                                                    onClick={() => { setShowModalSm(false) }}
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

                                                                                <div>

                                                                                    <p className='flex justify-center py-3 border-b-2'>
                                                                                        <button onClick={() => reportPost(item._id, 'sexual content')}>sexual content</button>
                                                                                    </p>
                                                                                    <p className='flex justify-center py-3 border-b-2'>
                                                                                        <button onClick={() => reportPost(item._id, "it's spam")}>it's spam</button>
                                                                                    </p>
                                                                                    <p className='flex justify-center py-3 border-b-2'>
                                                                                        <button onClick={() => reportPost(item._id, 'false information')}>false information</button>
                                                                                    </p>
                                                                                    <p className='flex justify-center py-3 border-b-2'>
                                                                                        <button onClick={() => reportPost(item._id, 'bulliying or harrasement')}>bulliying or harrasement</button>
                                                                                    </p>
                                                                                    <p className='flex justify-center py-3 border-b-2'>
                                                                                        <button onClick={() => reportPost(item._id, 'Violence or dangerouse')}>Violence or dangerouse</button>
                                                                                    </p>


                                                                                </div>
                                                                            </TEModalBody>
                                                                        </TEModalContent>
                                                                    </TEModalDialog>
                                                                </TEModal>
                                                            }



                                                        </nav>
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="relative w-full lg:h-72 h-full sm:px-4">
                                            <img src={item.post} alt="" className="sm:rounded-lg w-full h-full object-cover" />
                                        </div>

                                        <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                            <div className="flex items-center gap-2.5">
                                                {item.like.includes(id) ?
                                                    <button className='text-center text-neutral-900 text-[14px] font-normal' onClick={() => { handleLike(item._id, item.userId) }}><FcLike size={26} /></button> :
                                                    <button className='text-center text-neutral-900 text-[14px] font-normal  ' onClick={() => { handleLike(item._id, item.userId) }}><FcLikePlaceholder size={26} /></button>

                                                }
                                                {item.like ? item.like.length > 0 ? <p>{item.like.length}</p> : <div></div> : ''}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button className="text-center text-neutral-900 text-[10px] font-normal" type="button"
                                                    onClick={handleCommentButtonClick} >{commentIcon} </button>
                                                <span>{item.comment.length > 0 ? item.comment.length : ''}</span>
                                            </div>

                                        </div>


                                        <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                                            {item.comment ? (
                                                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40 max-h-[200px] overflow-auto">
                                                    {item.comment.slice(0,1).map((commentItem, index) => (
                                                        <div key={index} className="flex items-start gap-3 relative  rounded-xl">
                                                            <a onClick={() => navigate(`/profile?Id=${commentItem.userId._id}`)}>
                                                                <img src={commentItem.userId.profilePic} alt="" className="w-10 h-10 mt-1 rounded-full" />
                                                            </a>
                                                            <div className="flex-">
                                                                <a   onClick={() => navigate(`/profile?Id=${commentItem.userId._id}`)} className="text-black font-semibold inline-block dark:text-white">
                                                                    {commentItem.userId.username}
                                                                </a>
                                                                <p className="mt-0.5">{commentItem.comment}</p>
                                                             
                                                                <div className=' mt-3'>
                                                                    <div className='flex'>


                                                                        <div>

                                                                            {commentItem.like.length > 0 ? <span >{commentItem.like.length}</span> : <span></span>}
                                                                            <button className='ml-1' onClick={async () => {
                                                                                const success = await handleCommentLike(commentItem, id)
                                                                                if (success) {
                                                                                    stateChange(openCommentId)
                                                                                }
                                                                            }}  >like</button>
                                                                        </div>
                                                                        <div className='ml-2'>
                                                                            {commentItem.reply.length > 0 ? <span>{commentItem.reply.length}</span> : ''}
                                                                            <button className='ml-1' onClick={() => setOpenCommentId(commentItem._id)}>Reply</button>
                                                                        </div>
                                                                    </div>
                                                                    {openCommentId === commentItem._id && (
                                                                        <div className='mt-2' >
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Write a reply..."
                                                                                onChange={(e) => setReply(e.target.value)}
                                                                            // Handle the input value and submission here
                                                                            />
                                                                            {reply != '' ?
                                                                                <button className='ml-4 border border-black px-2'
                                                                                    onClick={() => { handleReplyComment(openCommentId, reply, id), stateChange(openCommentId) }}>send</button>
                                                                                :
                                                                                <button className='ml-4 border border-black px-2' onClick={() => toast.error('sorry')}>send</button>
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {commentItem.reply.length > 0 ?

                                                                        showReplies == commentItem._id ?
                                                                            <button className='flex-end ml-7' onClick={() => setReplies('')}>hide replies</button>
                                                                            : <button className='flex-end ml-7' onClick={() => setReplies(commentItem._id)}>show replies</button>
                                                                        : ''}

                                                                </div>
                                                                {showReplies == commentItem._id ?
                                                                    commentItem.reply.map((reply) => {
                                                                        return (
                                                                            <div  onClick={() => navigate(`/profile?Id=${reply.userId._id}`)}
                                                                            className='flex mt-3 border w-max px-7 py-4 rounded-2xl bg-gray-100'>
                                                                                <img src={reply.userId.profilePic} className="w-6 h-6 mt-1 rounded-full mr-5" />
                                                                                <div>
                                                                                    <p className="text-black font-bold inline-block dark:text-white">{reply.userId.username}</p>
                                                                                    <p className="mt-0.5">{reply.content}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }) : ''}

                                                            </div>
                                                        </div>
                                                    ))}
                                                     {moreComments && item.comment.slice(1).map((commentItem, index) => (
                                                        <div key={index} className="flex items-start gap-3 relative  rounded-xl">
                                                            <a onClick={() => navigate(`/profile?Id=${commentItem.userId._id}`)}>
                                                                <img src={commentItem.userId.profilePic} alt="" className="w-10 h-10 mt-1 rounded-full" />
                                                            </a>
                                                            <div className="flex-">
                                                                <a href="profile.html" className="text-black font-semibold inline-block dark:text-white">
                                                                    {commentItem.userId.username}
                                                                </a>
                                                                <p className="mt-0.5">{commentItem.comment}</p>
                                                        

                                                                <div className=' mt-3'>
                                                                    <div className='flex'>


                                                                        <div>

                                                                            {commentItem.like.length > 0 ? <span >{commentItem.like.length}</span> : <span></span>}
                                                                            <button className='ml-1' onClick={async () => {
                                                                                const success = await handleCommentLike(commentItem, id)
                                                                                if (success) {
                                                                                    stateChange(openCommentId)
                                                                                }
                                                                            }}  >like</button>
                                                                        </div>
                                                                        <div className='ml-2'>
                                                                            {commentItem.reply.length > 0 ? <span>{commentItem.reply.length}</span> : ''}
                                                                            <button className='ml-1' onClick={() => setOpenCommentId(commentItem._id)}>Reply</button>
                                                                        </div>
                                                                    </div>
                                                                    {openCommentId === commentItem._id && (
                                                                        <div className='mt-2' >
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Write a reply..."
                                                                                onChange={(e) => setReply(e.target.value)}
                                                                            // Handle the input value and submission here
                                                                            />
                                                                            {reply != '' ?
                                                                                <button className='ml-4 border border-black px-2'
                                                                                    onClick={() => { handleReplyComment(openCommentId, reply, id), stateChange(openCommentId) }}>send</button>
                                                                                :
                                                                                <button className='ml-4 border border-black px-2' onClick={() => toast.error('sorry')}>send</button>
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {commentItem.reply.length > 0 ?

                                                                        showReplies == commentItem._id ?
                                                                            <button className='flex-end ml-7' onClick={() => setReplies('')}>hide replies</button>
                                                                            : <button className='flex-end ml-7' onClick={() => setReplies(commentItem._id)}>show replies</button>
                                                                        : ''}

                                                                </div>
                                                                {showReplies == commentItem._id ?
                                                                    commentItem.reply.map((reply) => {
                                                                        return (
                                                                            <div className='flex mt-3 border w-max px-7 py-4 rounded-2xl bg-gray-100'>
                                                                                <img src={reply.userId.profilePic} className="w-6 h-6 mt-1 rounded-full mr-5" />
                                                                                <div>
                                                                                    <p className="text-black font-bold inline-block dark:text-white">{reply.userId.username}</p>
                                                                                    <p className="mt-0.5">{reply.content}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }) : ''}

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : <button type="button" onClick={handleCommentButtonClick} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2">

                                                be the first to add a comment
                                            </button>}



                                            {item.comment ? 
                                            item.comment.length > 1 ? (
                                                moreComments == true ?
                                                <button type="button" onClick={() => setMorecomments(false)} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2">
                                                    <ion-icon name="chevron-down-outline" className="ml-auto duration-200 group-aria-expanded:rotate-180"></ion-icon>
                                                    less Comment
                                                </button> :
                                                <button type="button" onClick={() => setMorecomments(true)} className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2">
                                                    <ion-icon name="chevron-down-outline" className="ml-auto duration-200 group-aria-expanded:rotate-180"></ion-icon>
                                                    More Comment
                                                </button>
                                            ) : ''
                                                : ''}


                                        </div>


                                        <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                        {user.profilePic ?
                                                    <img src={user.profilePic} alt="" className="w-6 h-6 rounded-full" />
                                                    : <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                                }

                                           

                                            <div className="flex-1 relative overflow-hidden h-10">
                                                <textarea placeholder="Add Comment...."
                                                    ref={textareaRef}
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    rows="1" className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent">
                                                </textarea>


                                            </div>
                                            <button type="submit" onClick={() => handleComment(item._id)} className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                                        </div>

                                    </div>
                                )
                            })}




                        </div>



                        <div className="lg:max-w-[370px] md:max-w-[510px] mx-auto">

                            <div className="xl:space-y-6 space-y-3 md:pb-12" uk-sticky="end: #js-oversized; offset: 50; media:992">


                                <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">

                                    <div className="flex justify-between text-black dark:text-white">
                                        <h3 className="font-bold text-base"> Peaple You might know </h3>

                                    </div>

                                    <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
                                        {sugg.map((item) => {
                                            return (
                                                <div className="flex items-center gap-3">
                                                    {item.profilePic ?
                                                    <img src={item.profilePic} alt="" className="w-9 h-9 rounded-full" />
                                                    : <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />
                                                }
                                                    <div className="flex-1">
                                                        <h4 onClick={() => navigate(`/profile?Id=${item._id}`)} className="font-semibold text-sm text-black dark:text-white"> {item.username}</h4>
                                                        <div className="mt-0.5"> Suggested For You </div>
                                                    </div>
                                                    {success == item._id ?
                                                        <button className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery" onClick={() => { setFollow(false), handleFollow(item._id) }}>UnFollow</button>
                                                        : <button className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery" onClick={() => {
                                                            setFollow(true);
                                                            handleFollow(item._id);
                                                        }}>Follow</button>
                                                    }
                                                </div>
                                            )
                                        })}





                                    </div>

                                </div>



                                <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">

                                    <div className="flex justify-between text-black dark:text-white">
                                        <h3 className="font-bold text-base"> Premium Photos </h3>
                                        <button type="button"> <ion-icon name="sync-outline" className="text-xl"></ion-icon> </button>
                                    </div>

                                    <div className="relative capitalize font-medium text-sm text-center mt-4 mb-2" tabindex="-1" uk-slider="autoplay: true;finite: true">

                                        <div className="overflow-hidden uk-slider-container">

                                            <ul className="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">

                                                {products.map((item) => {
                                                    return (
                                                        <li className="w-1/2 pr-2">

                                                            <a href="#">
                                                                <div className="relative overflow-hidden rounded-lg">
                                                                    <div className="relative w-full md:h-40 h-full">
                                                                        <img src={item.post} alt="" className="object-cover w-full h-full inset-0" />
                                                                    </div>
                                                                    <div className="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60"> {item.price} </div>
                                                                </div>
                                                                <div className="mt-3 w-full"> {item.title} </div>
                                                            </a>

                                                        </li>
                                                    )
                                                })}



                                            </ul>

                                        

                                        </div>

                                    </div>


                                </div>












                            </div>

                        </div>


                    </div>

                </div>

            </main>
        </>


    )
}

export default Home