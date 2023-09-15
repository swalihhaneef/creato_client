import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Axios/UserAxios'
import { useSelector } from 'react-redux'
import { getSender, messageSender } from '../../functions/functions'
import io from 'socket.io-client'
import { RxAvatar } from 'react-icons/rx'
const Message = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const chatid = searchParams.get('id')
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()

    const [socket, setSocket] = useState(null);
    const [chatId, setChatID] = useState('')
    const navigate = useNavigate(null)
    const userAxios = axiosInstance()
    if (chatid && chatId == '') {
        setChatID(chatid)
    }

    useEffect(() => {
        const newSocket = io("https://api.creato.fun/");
        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, [chatId]);

    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", chatId);

            socket.on("messageResponse", (receivedchatid, message) => {

                // if (receivedchatid === chatId) {
                console.log(receivedchatid, message, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                setMessages((prevMessages) => [...prevMessages, message]);
                // }
            });
            socket.on("error", (err) => {
                console.log("error", err);
            });
        }
    }, [socket]);



    const [chat, setChat] = useState([])
    const [allChat, setAllchat] = useState([])
    // const [chatId, setChatID] = useState('')
    // const [socketConnection, setsocketConnection] = useState(false)
    // const [socketCon, setSocketCon] = useState(null)
    const { Token, id } = useSelector((state) => state.Client)
    // const EndPoint = 'http://localhost:3000'
    let selectedChat
    // if (chatid && chatId == '') {
    //     setChatID(chatid)
    // }
    // useEffect(() => {
    //     socket = io(EndPoint)
    //     socket.emit('setup', id)
    //     socket.on('connection', () => {setsocketConnection(true)
    //         setSocketCon(socket)
    //     })
    //     if (chatId) {
    //         console.log(chatId);
    //         socket.emit('join chat', chatId)
    //     }

    // }, [chatId])
    // useEffect(() => {
    //     if (socket) {
    //         socket.on('message recieved', (newMessageRecieved) => {
    //             setMessages([...messages, newMessageRecieved])
    //         })
    //     }
    // }, [socket])

    const fetchChat = async () => {
        if (!chatId) return
        try {

            userAxios.get(`/getMessages?chatId=${chatId}`).then((res) => {
                if (res.data.success) {

                    setChat(res.data.chat)

                    if (res.data.messages != 'empty') {
                        setMessages(res.data.messages)
                    }
                }


            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchChat()
        selectedChat = chatId
        userAxios.get('/getChats').then((res) => {
            if (res.data.message != 'empty') {
                setAllchat(res.data.chats);
            }
        })
    }, [chatId, messages])
    const handleNewMessage = async (event) => {
        if (event.key = 'Enter' && newMessage) {
            if (socket) {
                try {

                    let Message = {
                        sender: id,
                        content: newMessage,
                        chat: chatId
                    }
                    socket.emit('NewMessage', chatId, Message)

                    // console.log(res.data);

                } catch (error) {

                }
            }
            else {
                console.log('kkkkkkkkk')
            }
        }
    }

    const handleVedioCall = (users) => {
        const ids = users.map((item) => item._id)
        console.log(ids);
        navigate(`/joinVedioCall?ids=${ids}`)
    }

    return (
        <div>
            <main class="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">


                <div class="2xl:max-w-6xl mx-auto h-screen relative shadow-lg overflow-hidden border1 max-md:pt-14">

                    <div class="flex bg-white dark:bg-dark2">

                        <div class="md:w-[360px] relative border-r dark:border-slate-700">

                            <div id="side-chat" class="top-0 left-0 max-md:fixed max-md:w-5/6 max-md:h-screen bg-white z-50 max-md:shadow max-md:-translate-x-full dark:bg-dark2">

                                <div class="p-4 border-b dark:border-slate-700">

                                    <div class="flex mt-2 items-center justify-between">

                                        <h2 class="text-2xl font-bold text-black ml-1 dark:text-white"> Chats </h2>

                                        <div class="flex items-center gap-2.5">


                                            <button class="group">
                                                <ion-icon name="settings-outline" class="text-2xl flex group-aria-expanded:rotate-180"></ion-icon>
                                            </button>
                                            {/* <div class="md:w-[270px] w-full" uk-dropdown="pos: bottom-left; offset:10; animation: uk-animation-slide-bottom-small">
                                                <nav>
                                                    <a href="#"> <ion-icon class="text-2xl shrink-0 -ml-1" name="checkmark-outline"></ion-icon> Mark all as read </a>
                                                    <a href="#"> <ion-icon class="text-2xl shrink-0 -ml-1" name="notifications-outline"></ion-icon> notifications setting </a>
                                                    <a href="#"> <ion-icon class="text-xl shrink-0 -ml-1" name="volume-mute-outline"></ion-icon> Mute notifications </a>
                                                </nav>
                                            </div> */}

                                            <button class="">
                                                <ion-icon name="checkmark-circle-outline" class="text-2xl flex"></ion-icon>
                                            </button>

                                            <button type="button" class="md:hidden" uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full">
                                                <ion-icon name="chevron-down-outline"></ion-icon>
                                            </button>

                                        </div>

                                    </div>

                                    <div class="relative mt-4">
                                        <div class="absolute left-3 bottom-1/2 translate-y-1/2 flex"><ion-icon name="search" class="text-xl"></ion-icon></div>
                                        <input type="text" placeholder="Search" class="w-full !pl-10 !py-2 !rounded-lg" />
                                    </div>

                                </div>


                                <div class="space-y-2 p-2 overflow-y-auto h-[calc(100vh-127px)]">
                                    {allChat.length > 0 ? allChat.map((item) => {
                                        return (

                                            <a onClick={() => { setChatID(item._id), fetchChat() }} class="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery">
                                                <div class="relative w-14 h-14 shrink-0">
                                                    {getSender(id, item.users).profilePic ?
                                                        <img src={getSender(id, item.users).profilePic} alt="" class="object-cover w-full h-full rounded-full" />
                                                        :
                                                        <RxAvatar className='w-14 h-14 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />}
                                                    <div class="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800"></div>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <div class="flex items-center gap-2 mb-1.5">
                                                        <div class="mr-auto text-sm text-black dark:text-white font-medium">{getSender(id, item.users).username}</div>
                                                        <div class="text-xs font-light text-gray-500 dark:text-white/70">09:40AM</div>
                                                    </div>
                                                    {/* <div class="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">{item.latestMessage.content ?
                                                    item.latestMessage.content:'' }</div> */}
                                                </div>
                                            </a>
                                        )
                                    }) : ''}


                                </div>

                            </div>

                            <div id="side-chat" class="bg-slate-100/40 backdrop-blur w-full h-full dark:bg-slate-800/40 z-40 fixed inset-0 max-md:-translate-x-full md:hidden" uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full">

                            </div>

                        </div>

                        <div class="flex-1">
                            {chat.length == 0 ? 
                            <div className='w-full h-full flex items-center justify-center '>
                                <button className='p-3 border bg-slate-700 rounded-lg text-white'>start  Messaging</button>
                            </div> :
                            <>
                            <div class="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">

                                <div class="flex items-center sm:gap-4 gap-2">

                                    <button type="button" class="md:hidden" uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full">
                                        <ion-icon name="chevron-back-outline" class="text-2xl -ml-4"></ion-icon>
                                    </button>


                                </div>

                                <div class="flex items-center gap-2">
                                    <button type="button" class="button__ico">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button type="button" onClick={() => handleVedioCall(chat.users)} class="hover:bg-slate-100 p-1.5 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </button>
                                    <button type="button" class="hover:bg-slate-100 p-1.5 rounded-full" uk-toggle="target: .rightt ; cls: hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                    </button>
                                </div>

                            </div>


                            <div class="w-full p-5 py-10 overflow-y-auto md:h-[calc(100vh-137px)] h-[calc(100vh-250px)]">

                                <div class="py-10 text-center text-sm lg:pt-8">
                                    {getSender(id, chat.users).profilePic ?
                                    <img src={ getSender(id, chat.users).profilePic } class="w-24 h-24 rounded-full mx-auto mb-3" alt="" />
                                    :<RxAvatar className='w-24 h-24 rounded-full mx-auto mb-3' style={{ color: 'white', backgroundColor: 'darkgray' }} />}
                                    <div class="mt-8">
                                        <div class="md:text-xl text-base font-medium text-black dark:text-white"> {getSender(id, chat.users).username} </div>
                                        <div class="text-gray-500 text-sm   dark:text-white/80"> @{getSender(id, chat.users).username} </div>
                                    </div>
                                    <div class="mt-3.5">
                                        <a href="profile.html" class="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery">View profile</a>
                                    </div>
                                </div>

                                <div class="text-sm font-medium space-y-6">
                                    {messages.length == 0 ?
                                        <div className='w-full h-full flex justify-center items-center sm:hidden'>

                                            <button>Start Messaging</button>
                                        </div> : <>
                                            {messages.map((item) => {
                                                return (
                                                    <>
                                                        {/* <div class="flex justify-center ">
                                                            <div class="font-medium text-gray-500 text-sm dark:text-white/70">
                                                                April 8,2023,6:30 AM
                                                            </div>
                                                        </div> */}
                                                        {messageSender(id, item.sender._id ? item.sender._id : item.sender) == true ?
                                                            <div class="flex gap-2 flex-row-reverse items-end">
                                                                {item.sender.profilePic ?
                                                                    <img src={item.sender.profilePic} alt="" class="w-9 h-9 rounded-full shadow" />
                                                                    : <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />}
                                                                <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow"> {item.content}</div>
                                                            </div>
                                                            :
                                                            <div class="flex gap-3">
                                                                {item.sender.profilePic ?
                                                                    <img src={item.sender.profilePic} alt="" class="w-9 h-9 rounded-full shadow" />
                                                                    : <RxAvatar className='w-9 h-9 rounded-full' style={{ color: 'white', backgroundColor: 'darkgray' }} />}
                                                                <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery"> {item.content} </div>
                                                            </div>}
                                                    </>

                                                )
                                            })}





                                        </>}
                                </div>

                            </div>

                            <div className="flex items-center md:gap-4 gap-2 md:p-3 p-2 ">



                                <div class="relative flex-1">
                                    <textarea onChange={(e) => setNewMessage(e.target.value)} placeholder="Write your message" rows="1" class="w-full resize-none bg-secondery rounded-full px-4 p-2"></textarea>

                                    <button onClick={handleNewMessage} class=" shrink-0 p-2 absolute right-0.5 top-0">
                                        submit
                                    </button>

                                </div>

                                <button class="flex h-full dark:text-white">
                                    <ion-icon class="text-3xl flex -mt-3" name="heart-outline"></ion-icon>
                                </button>

                            </div>
                            </>}
                        </div>

                        <div class="rightt w-full h-full absolute top-0 right-0 z-10 hidden transition-transform">
                            <div class="w-[360px] border-l shadow-lg h-screen bg-white absolute right-0 top-0 uk-animation-slide-right-medium delay-200 z-50 dark:bg-dark2 dark:border-slate-700">

                                <div class="w-full h-1.5 bg-gradient-to-r to-purple-500 via-red-500 from-pink-500 -mt-px"></div>

                                <div class="py-10 text-center text-sm pt-20">
                                    <img src="assets/images/avatars/avatar-3.jpg" class="w-24 h-24 rounded-full mx-auto mb-3" alt="" />
                                    <div class="mt-8">
                                        <div class="md:text-xl text-base font-medium text-black dark:text-white"> Monroe Parker  </div>
                                        <div class="text-gray-500 text-sm mt-1 dark:text-white/80">@Monroepark</div>
                                    </div>
                                    <div class="mt-5">
                                        <a href="profile.html" class="inline-block rounded-full px-4 py-1.5 text-sm font-semibold bg-secondery">View profile</a>
                                    </div>
                                </div>

                                <hr class="opacity-80 dark:border-slate-700" />

                                <ul class="text-base font-medium p-3">
                                    <li>
                                        <div class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery">
                                            <ion-icon name="notifications-off-outline" class="text-2xl"></ion-icon> Mute Notification
                                            <label class="switch cursor-pointer ml-auto">
                                                <input type="checkbox" />
                                                <span class="switch-button !relative"></span></label>
                                        </div>
                                    </li>
                                    <li> <button type="button" class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="flag-outline" class="text-2xl"></ion-icon> Report     </button></li>
                                    <li> <button type="button" class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="settings-outline" class="text-2xl"></ion-icon> Ignore messages   </button> </li>
                                    <li> <button type="button" class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="stop-circle-outline" class="text-2xl"></ion-icon> Block    </button> </li>
                                    <li> <button type="button" class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-red-50 text-red-500"> <ion-icon name="trash-outline" class="text-2xl"></ion-icon> Delete Chat   </button> </li>
                                </ul>

                                <button type="button" class="absolute top-0 right-0 m-4 p-2 bg-secondery rounded-full" uk-toggle="target: .rightt ; cls: hidden">
                                    <ion-icon name="close" class="text-2xl flex"></ion-icon>
                                </button>

                            </div>

                            <div class="bg-slate-100/40 backdrop-blur absolute w-full h-full dark:bg-slate-800/40" uk-toggle="target: .rightt ; cls: hidden"></div>

                        </div>

                    </div>

                </div>


            </main>
        </div>
    )
}

export default Message
