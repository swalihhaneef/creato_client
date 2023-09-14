import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../Axios/UserAxios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const EditProfile = () => {
    const { Token, id, username } = useSelector((state) => state.Client)
    const navigate = useNavigate(null)
    const [proPic, setPropic] = useState(null)
    const [coverPhot, setCoverPhoto] = useState(null)
    const [Newusername, setusername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [newProPic, setNewPropic] = useState('')
    
    const [user, setUser] = useState()
    const userAxios = axiosInstance()
    useEffect(() => {
        userAxios.get('/getDetails').then((res) => {
            setUser(res.data.user)
            setusername(res.data.user.username)
            setMobile(res.data.user.mobile)
            setEmail(res.data.user.email)
            setPropic(res.data.user.profilePic)
        })

    }, [])
    const imgConverter = (img) => {
        console.log(img);
        return new Promise((resolve, reject) => {
            const render = new FileReader();

            render.onload = () => {
                resolve(render.result);
            };

            render.onerror = (error) => {
                reject(error);
            };

            render.readAsDataURL(img);
        });
    };

    const EditProfile = async () => {
        try {
            
            if (newProPic) {
                let convertedImage = await imgConverter(newProPic);
                setPropic(convertedImage); // Ensure that the photo is correctly set here
            }
            if (coverPhot) {
                let convertedCoverPhoto = await imgConverter(coverPhot);
                console.log(convertedCoverPhoto);
                setCoverPhoto(convertedCoverPhoto);
            }

            userAxios.patch('editProfile', { Newusername, email, mobile, proPic, coverPhot }).then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    navigate(`/profile?Id=${id}`)
                }

            }).catch((error) => {
                toast.error(res.data.message)
            })


        } catch (error) {
            console.error('Error adding profile:', error);
        }
    }

    

    return (
        <>
            <div>
                <div className='w-full flex justify-center '>
                    <div className="w-[700px] h-auto  mt-10 py-10 bg-neutral-300">
                        <div className='w-full flex justify-between'>
                            <button className='m-3 px-3 py-2 border border-neutral-400 rounded-full bg-neutral-300 text-gray-700 shadow-md hover:shadow-lg transition duration-300'
                            onClick={()=>navigate('/')}>
                                Cancel
                            </button>
                            <button className='m-3 px-3 py-2 border border-neutral-400 rounded-full bg-neutral-300 text-gray-700 shadow-md hover:shadow-lg transition duration-300'
                                onClick={EditProfile}>
                                Save
                            </button>
                        </div>


                        <div className='flex items-center justify-center mt-3'>
                          
                        </div>

                        <div>
                            <div className='items-center  flex justify-center mt-5'>

                                <div className='relative group'>
                                    <label className="group-hover:opacity-50 transition-opacity duration-300">
                                        {newProPic ?
                                            <img className="w-[80px] h-[80px] rounded-full" src={URL.createObjectURL(newProPic)} alt="Profile" /> :
                                            <img className="w-[80px] h-[80px] rounded-full" src={proPic ? proPic : ''} alt="Profile" />}

                                        <input type="file" hidden onChange={(e) => setNewPropic(e.target.files[0])} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center mt-3'>


                            <form className='w-max border border-black px-4'>
                                <div className='mt-2  grid grid-cols-2'>
                                    <p>username : </p>
                                    <input type="text" onChange={(e) => setusername(e.target.value)} value={Newusername} />
                                </div>
                                <div className='mt-2 grid grid-cols-2'>
                                    <p>email : </p>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className='mt-2 grid grid-cols-2'>
                                    <p>mobile number : </p>
                                    <input type="text" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile
