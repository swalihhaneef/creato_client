import React, { useEffect, useState } from 'react';
import { AdminAxios } from '../../../Axios/adminAxios';
import { useNavigate } from 'react-router-dom';

const ProfileView = ({ postId }) => {
    let x
    const [post, setPost] = useState('')
    const [user, Setuser] = useState('')
    const [followers, Setfollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [reports, setReports] = useState([])
    const navigate = useNavigate(null)
    useEffect(() => {
        AdminAxios.get(`/getPostDetails?postId=${postId}`).then((res) => {
            if (res.data.success) {
                setPost(res.data.post)
                Setuser(res.data.user)
                console.log(res.data.user);
                console.log(user, 'dhdh')
                Setfollowers(res.data.followers)
                setFollowing(res.data.following)
                setReports(res.data.reports)
                console.log(reports);

            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])





    const handleRestriction = (postID) => {
        AdminAxios.patch('/restrictPost', { postID }).then((res) => {
            if (res.data.success) {
                navigate('/admin/reportedPost')
            }
        })
    }


    return (
        <div>
            <div className='w-full flex justify-center mt-16'>
                <div className="w-[700px] h-auto  mt-16 left-[230px] top-[60px] bg-neutral-300">


                    <div>
                        <div className='grid grid-cols-2 mt-5'>

                            <div className='items-center   ml-10 flex justify-start '>
                                {user.profilePic ? <img className="w-[120px] h-[120px] rounded-full" src={user.profilePic} />
                                    : <img className="w-max h-[120px] rounded-full" src="https://via.placeholder.com/273x271" />}



                            </div>
                            <div className=" ml-10 mt-10 text-black text-[26px] tex font-normal">



                                <p>{user.username}</p>

                            </div>
                        </div>
                        <div className='grid grid-cols-3 mt-16 text-center'>
                            <div className=" text-black text-[20px] font-normal text-center">
                                <p>{followers.length}</p>
                                <p>FOLLOWERS</p>
                            </div>
                            <div className=" text-black text-center text-[20px] font-normal">
                                <p>{following.length}</p>
                                <p>FOLLOWING</p>
                            </div>
                            <div className=" text-black text-[20px] text-center font-normal">
                                <p></p>
                                <p>POSTS</p>
                            </div>
                        </div>
                    </div>
                    {
                        post.post ?
                            <>
                                <div className='grid grid-cols-2 mt-6 gap-3 '>
                                    <div className='overflow-x-auto'>
                                        <div className=" h-auto  bg-white flex justify-center mb-2">
                                            <div>
                                                <div className='flex'>
                                                    <img className="w-[70px] h-[70px] mt-5   rounded-full" src={post.userId.profilePic} />
                                                    <div className='grid grid-rows-3 mt-5 ml-7 text-start'>
                                                        <div className=" text-stone-950 text-sm font-medium">{post.userId.username}</div>
                                                        <div className=" text-stone-950 text-sm font-normal">{post.time}</div>
                                                        <div className="left-[179px] top-[79px]   text-neutral-950 text-sm font-normal">kannur,kerala,india</div>
                                                    </div>
                                                    <div className='w-full flex justify-end'>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className="ml-3 mt-3 text-black text-[16px] font-normal">
                                                        <p>{post.description}</p>
                                                    </div>
                                                    <div className="  top-[101px]  ">
                                                        <img src={post.post} width={566} alt="" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-[18px] text-center '>
                                            <h1>Reason for reporting</h1>
                                        </div>
                                        <div>
                                            {post.is_reported.map((item) => {
                                                return (
                                                    <div className='flex text-center'>
                                                        <img className="w-[70px] h-[70px] mt-5   rounded-full" src={item.userId.profilePic} />
                                                        <div className='mt-5 ml-4'>
                                                            <h3>{item.userId.username}</h3>
                                                            <h2 key={item.userId} className='text-red-600'>"{item.reason}"</h2>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className='w-full flex justify-center items-end '>
                                            <button className=' border-2 border-red-500 rounded-full px-3 mt-4 text-red-400 hover:bg-black  ' onClick={() => handleRestriction(post._id)}>Restict user</button>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <div className='grid grid-cols-2 mt-6 gap-3 '>
                                <div className='overflow-x-auto'>
                                    <div className=" h-auto  bg-white flex justify-center mb-2">
                                        <div>
                                            <div className='flex'>
                                                <img className="w-[70px] h-[70px] mt-5   rounded-full" src={user.profilePic} />
                                                <div className='grid grid-rows-3 mt-5 ml-7 text-start'>
                                                    <div className=" text-stone-950 text-sm font-medium">{user.username}</div>
                                                    <div className=" text-stone-950 text-sm font-normal">{post.time}</div>
                                                    <div className="left-[179px] top-[79px]   text-neutral-950 text-sm font-normal">kannur,kerala,india</div>
                                                </div>
                                                <div className='w-full flex justify-end'>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="  mt-6  ">
                                                    <h1>{post.discription}</h1>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[18px] text-center '>
                                        <h1>Reason for reporting</h1>
                                    </div>
                                    <div>
                                        {reports.map((item) => {
                                            return (
                                                <div className='flex text-center'>
                                                    <img className="w-[70px] h-[70px] mt-5   rounded-full" src={item.userId.profilePic} />
                                                    <div className='mt-5 ml-4'>
                                                        <h1>{item.userId.username}</h1>
                                                        <h1 key={item.userId} className='text-red-600'>"{item.reason}"</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='w-full flex justify-center items-end '>

                                        <button className=' border-2 border-red-500 rounded-full px-3 mt-4 ' onClick={() => handleRestriction(post._id)}>Restict post</button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileView;
