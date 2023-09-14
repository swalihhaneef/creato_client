import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import userAxios from '../../../Axios/UserAxios'
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";
import { useNavigate } from 'react-router-dom'
import { photos } from '../../../assets/icons/icons'
import { toast } from 'react-toastify'
const NewPost = () => {
  const [description, setDescription] = useState('')
  const [post, setPost] = useState(null)
  const [isHovering, setIsHovering] = useState(false);
  const [showModalLg, setShowModalLg] = useState(false);
  const { Token, id, username, profilepic } = useSelector((state) => state.Client)
  const navigate = useNavigate(null)

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
    if (!post && !description) {
      toast.error('sorry nothing is there to upload')
    } else if (post) {

      const convertedImage = await imgConverter(post);
      console.log(convertedImage);
      userAxios.post('/addpost', { convertedImage, description, date }, {
        headers: {
          Authorization: Token
        }
      }).then((res) => {
        if (res.data.success) {
          navigate('/')
        }
      })
    } else {
      userAxios.post('/addpost', { description, date }, {
        headers: {
          Authorization: Token
        }
      }).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          navigate('/')
        }
      })
    }
  }
  return (
    <>
      <div className='w-full '>
        <div className='flex justify-center'>
          <div className="w-[566px] h-auto pb-8 top-[60px] absolute bg-white">
            <div className='flex justify-end'>
              <button className='mr-4 mt-3 border border-black rounded-xl text-sm px-2' onClick={() => navigate('/')}>Cancel</button>
            </div>
            <div className='w-full flex justify-center'>
              <textarea type="text" className='w-[500px] h-[200px] border-2 rounded-sm border-black mt-3' onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className=' ml-5 mt-3 flex'>
              <label>
                <p> {photos}</p>
                <input type="file" onChange={(e) => setPost(e.target.files[0])} hidden />
              </label>
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded ml-4 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setShowModalLg(true)}
                >
                  Jobs
                </button>
              </TERipple>
              <TEModal show={showModalLg} setShow={setShowModalLg}>
                <TEModalDialog size="lg">
                  <TEModalContent>
                    <TEModalHeader>
                      {/* <!--Modal title--> */}
                      <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                        Tell us who you're hiring
                      </h5>
                      {/* <!--Close button--> */}
                      <button
                        type="button"
                        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        onClick={() => setShowModalLg(false)}
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
                      <div class="w-full ">
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">
                           Job title
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Add the title you are hiring for" />
                          </div>
                          <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                              Password
                            </label>
                            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            <p class="text-red-500 text-xs italic">Please choose a password.</p>
                          </div>
                          <div class="flex items-center justify-between">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                              Sign In
                            </button>
                            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                              Forgot Password?
                            </a>
                          </div>
                        </form>
                        <p class="text-center text-gray-500 text-xs">
                          &copy;2020 Acme Corp. All rights reserved.
                        </p>
                      </div>

                    </TEModalBody>
                  </TEModalContent>
                </TEModalDialog>
              </TEModal>
              {post ?
                <div className='flex justify-center'>
                  <img
                    src={URL.createObjectURL(post)}
                    className='w-[200px] h-[200px] ' onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    alt='Image'
                  />
                  {isHovering && (
                    <button
                      className='absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] bg-red-500 text-white px-3 py-1 rounded-md'
                      onClick={() => { setPost(null) }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                :
                ""}
            </div>
            <button className='mt-4 ml-3 border-blue-400 border-2 rounded-full w-max py-1 px-2' onClick={handlePOst}>submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost
