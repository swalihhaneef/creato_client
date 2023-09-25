import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai'
import axiosInstance from '../../../Axios/UserAxios'
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const Shop = () => {
    const [counter, setCounter] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('')
    const [price, Setprice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [image, setimage] = useState('')
    const [product, Setproducts] = useState([])
    const { Token } = useSelector((state) => state.Client)
    const [showModalXL, setShowModalXL] = useState(false);
    const [showQueryModal, setShowQueryModal] = useState(false)
    const userAxios = axiosInstance()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const [productId, setProductId] = useState('')
    const product_id = searchParams.get('id')
    useEffect(() => {
        if (product_id) {
            setShowQueryModal(true);
        }
    }, [product_id, setShowQueryModal]);
    useEffect(() => {
        userAxios.get('/products').then((res) => {
            console.log(res.data.filteredProducts);
            Setproducts(res.data.filteredProducts);
        }).catch((err) => {
            console.log(err);
        })
    })
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
    const handleNewProduct = async () => {
        const converTed = await imgConverter(image)
        console.log(title, price, category, description, converTed);
        userAxios.post('/AddProduct', { title, price, category, description, converTed }).then((res) => {
            if (res.data.success) {
                toast.success(res.data.message)
            }
        })
    }
    return (
        <div>
            <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">

                <div className="main__inner">

                    <div uk-sticky="cls-active: bg-slate-100/60 z-30 backdrop-blur-lg px-4; start: 80; animation: uk-animation-slide-top">

                        {/* <!-- heading title --> */}
                        <div className="page__heading">
                            <h1> Market </h1>
                        </div>

                        {/* <!-- tab style one --> */}



                        {/* <!-- tab style two .  default this tab is hidden just remove to see style tab 2 --> */}
                        <div className="relative  items-center justify-between mt-6 border-b hidden">

                            {/* <!-- tabs --> */}
                            <ul className="flex gap-2 text-sm text-center text-gray-600 capitalize font-semibold"
                                uk-switcher="connect: #market_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">

                                <li>
                                    <a href="#" className="flex items-center px-3 py-3.5 -mb-px border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black"> <ion-icon className="mr-2 text-2xl" name="cart-outline"></ion-icon> My Products</a> </li>
                                <li> <a href="#" className="flex items-center px-3 py-3.5 -mb-px border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black"> <ion-icon className="mr-2 text-2xl" name="cloud-download-outline"></ion-icon> Donwloads</a> </li>
                                <li> <a href="#" className="flex items-center px-3 py-3.5 -mb-px border-b-2 border-transparent aria-expanded:text-black aria-expanded:border-black"> <ion-icon className="mr-2 text-2xl" name="add-outline"></ion-icon> Upload</a> </li>

                            </ul>

                            {/* <!-- right button icons --> */}
                            <div className="flex items-center gap-4">
                                <button className="flex" uk-toggle="target: #search-box; cls: hidden">
                                    <ion-icon className="text-xl" name="search"></ion-icon>
                                </button>
                                <select className="!bg-transparent focus:!border-transparent focus:!ring-transparent md:w-40">
                                    <option value="1">Latest</option>
                                    <option value="3">best product</option>
                                    <option value="4">Engaged</option>
                                </select>
                            </div>

                            {/* <!-- Search box --> */}
                            <div className="absolute left-0 -bottom-0.5 w-full hidden ring-4 ring-slate-100 rounded-lg z-30 " id="search-box">
                                <div className="bg-slate-200 py-2 px-3.5 rounded-md w-full flex items-center gap-3">
                                    <button type="submit" className="flex"> <ion-icon className="text-2xl" name="search"></ion-icon></button>
                                    <input type="text" className="!bg-transparent !outline-none !w-full" placeholder="Search" />
                                    <button className="flex" uk-toggle="target: #search-box; cls: hidden">
                                        <ion-icon className="text-2xl" name="close"></ion-icon>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="uk-switche" id="market_tab">

                        {/* <!-- product list --> */}
                        <div>

                            {/* <!-- category list --> */}
                            <div className="relative" tabindex="-1" uk-slider="finite: true">

                                <div className="py-6 overflow-hidden uk-slider-container">

                                    <ul className="uk-slider-items w-[calc(100%+0.10px)] capitalize text-sm font-semibold">
                                        <li className="w-auto pr-2.5">
                                            <a onClick={()=> setCategory('all')} className="px-4 py-2 rounded-lg bg-slate-200 inline-block hover:shadow dark:bg-dark2"> all </a>
                                        </li>
                                        <li className="w-auto pr-2.5">
                                            <a onClick={()=> setCategory('Furniture')} className="px-4 py-2 rounded-lg bg-slate-200 inline-block hover:shadow dark:bg-dark2"> Furniture </a>
                                        </li>
                                        <li className="w-auto pr-2.5">
                                            <a onClick={()=> setCategory('Home decors')} className="px-4 py-2 rounded-lg bg-slate-200 inline-block hover:shadow dark:bg-dark2"> Home decors </a>
                                        </li>
                                        <li className="w-auto pr-2.5">
                                            <a onClick={()=> setCategory('Tools')} className="px-4 py-2 rounded-lg bg-slate-200 inline-block hover:shadow dark:bg-dark2"> Tools </a>
                                        </li>
                                    </ul>

                                </div>


                            </div>

                            {/* <!-- product list  --> */}
                            <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 mt-2" uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 100">

                                {/* <!-- single item --> */}

                                {product.length > 0 ? product.map((item) => {
                                    return (
                                        category == '' || 'all' ?
                                        <div>
                                            <div onClick={() => { setShowModalXL(true), setProductId(item._id) }} className="group" uk-toggle="">
                                                <div className="relative overflow-hidden rounded-lg">
                                                    <div className="relative w-full md:h-60 h-56 transition-all group-hover:scale-110 duration-300">
                                                        <img src={item.post} alt="" className="object-cover w-full h-full inset-0" />
                                                    </div>
                                                    <div className="absolute right-0 top-0 m-2 bg-slate-100 rounded-full py-0.5 px-2 text-sm font-bold dark:bg-slate-800/60"> {item.price} </div>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <h4 className="text-black lg:font-medium mb-0.5 dark:text-white"> {item.title} </h4>
                                                <p className="md:text-sm text-xs lg:font-medium text-gray-500 dark:text-white"> by <a href="profile.html"> {item.userId.username} </a> </p>
                                            </div>
                                            {productId == item._id ? <TEModal show={showModalXL} setShow={setShowModalXL}>
                                                <TEModalDialog size="xl">
                                                    <TEModalContent>

                                                        {/* <!--Modal body--> */}
                                                        <TEModalBody>
                                                            <div id="product_moda" uk-modal="">

                                                                <div class=" relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">

                                                                    <div class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">

                                                                        <div class="relative z-10 w-full h-full">
                                                                            <img src={item.post} alt="" class="w-full h-full object-cover absolute" />
                                                                        </div>

                                                                        <button onClick={() => setShowModalXL(false)} type="button" class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>

                                                                    </div>

                                                                    <div class="lg:w-[400px] w-full bg-white h-full relative overflow-y-auto shadow-xl dark:bg-dark2">

                                                                        <div class="p-6">

                                                                            <div class="flex absolute right-2.5 top-4 text-black gap-1">
                                                                                <button class="w-8 h-8 hover:bg-slate-100 rounded-full grid place-items-center"> <ion-icon class="text-xl" uk-tooltip="title: Share; pos: top; offset: 6" name="share-outline"></ion-icon> </button>
                                                                                <button class="w-8 h-8 hover:bg-slate-100 rounded-full grid place-items-center"> <ion-icon class="text-xl" uk-tooltip="title: Save; pos: top; offset: 6" name="bookmarks-outline"></ion-icon> </button>
                                                                            </div>

                                                                            <div>
                                                                                <div class="text-lg font-semibold text-black dark:text-white"> {item.title} </div>
                                                                                <p class="font-normal text-sm leading-6 mt-3">{item.discription}</p>
                                                                            </div>

                                                                            <div class="grid grid-cols-2 gap-y-5 gap-3 text-xs font-medium mt-5">
                                                                                <div class="col-span-2 p-3 bg-slate-100 rounded-md space-y-1.5 border">
                                                                                    <div> Price</div>
                                                                                    <div class="text-3xl font-semibold text-black">{item.price}</div>
                                                                                </div>

                                                                            </div>

                                                                            <div class="space-y-2 text-sm mt-7">
                                                                                <div class="flex items-center gap-3">
                                                                                    <ion-icon class="text-xl" name="tag-outline"></ion-icon>
                                                                                    <div class="flex-1">{item.category}  </div>
                                                                                </div>
                                                                                <div class="flex items-center gap-3"> <ion-icon class="text-xl" name="navigate-circle-outline"></ion-icon> <div class="flex-1"> Published   4 days ago  </div> </div>
                                                                            </div>

                                                                            <div class="font-medium mt-6 space-y-3">
                                                                                <div class="text-sm"> Seller </div>
                                                                                <a href="#" class="flex items-center gap-3 mb-4 mt-1">
                                                                                    <div class="relative w-8 h-8 shrink-0">
                                                                                        <img src={item.userId.profilePic} alt="" class="object-cover w-full h-full rounded-full" /></div>
                                                                                    <div class="flex-1 min-w-0">
                                                                                        <div class="text-sm font-medium text-black dark:text-white">{item.userId.username}</div>
                                                                                    </div>
                                                                                    <button type="button" class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Chat </button>
                                                                                </a>
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </TEModalBody>
                                                    </TEModalContent>
                                                </TEModalDialog>
                                            </TEModal> : ''}
                                        </div>
                                    :''
                                    )
                                }) : ''}







                            </div>

                            {/* <!-- load more --> */}
                            <div className="flex justify-center my-8">
                                <button type="button" className="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2">Load more...</button>
                            </div>


                        </div>


                        {/* <!-- downloads --> */}




                    </div>


                </div>


            </main>
            {showQueryModal &&
                <TEModal show={showQueryModal} setShow={setShowQueryModal}>
                    <TEModalDialog size="xl">
                        <TEModalContent>

                            {/* <!--Modal body--> */}
                            <TEModalBody>
                                <div id="product_moda" uk-modal="">
                                    {product.length > 0 ?
                                        product.map((item) => {
                                            return (
                                                item._id == product_id ?
                                                    <div class=" relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">

                                                        <div class="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">

                                                            <div class="relative z-10 w-full h-full">
                                                                <img src={item.post} alt="" class="w-full h-full object-cover absolute" />
                                                            </div>

                                                            <button onClick={() => setShowQueryModal(false)} type="button" class="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>

                                                        </div>

                                                        <div class="lg:w-[400px] w-full bg-white h-full relative overflow-y-auto shadow-xl dark:bg-dark2">

                                                            <div class="p-6">

                                                                <div class="flex absolute right-2.5 top-4 text-black gap-1">
                                                                    <button class="w-8 h-8 hover:bg-slate-100 rounded-full grid place-items-center"> <ion-icon class="text-xl" uk-tooltip="title: Share; pos: top; offset: 6" name="share-outline"></ion-icon> </button>
                                                                    <button class="w-8 h-8 hover:bg-slate-100 rounded-full grid place-items-center"> <ion-icon class="text-xl" uk-tooltip="title: Save; pos: top; offset: 6" name="bookmarks-outline"></ion-icon> </button>
                                                                </div>

                                                                <div>
                                                                    <div class="text-lg font-semibold text-black dark:text-white"> {item.title} </div>
                                                                    <p class="font-normal text-sm leading-6 mt-3">{item.discription}</p>
                                                                </div>

                                                                <div class="grid grid-cols-2 gap-y-5 gap-3 text-xs font-medium mt-5">
                                                                    <div class="col-span-2 p-3 bg-slate-100 rounded-md space-y-1.5 border">
                                                                        <div> Price</div>
                                                                        <div class="text-3xl font-semibold text-black">{item.price}</div>
                                                                    </div>

                                                                </div>

                                                                <div class="space-y-2 text-sm mt-7">
                                                                    <div class="flex items-center gap-3">
                                                                        <ion-icon class="text-xl" name="tag-outline"></ion-icon>
                                                                        <div class="flex-1">{item.category}  </div>
                                                                    </div>
                                                                    <div class="flex items-center gap-3"> <ion-icon class="text-xl" name="navigate-circle-outline"></ion-icon> <div class="flex-1"> Published   4 days ago  </div> </div>
                                                                </div>

                                                                <div class="font-medium mt-6 space-y-3">
                                                                    <div class="text-sm"> Seller </div>
                                                                    <a href="#" class="flex items-center gap-3 mb-4 mt-1">
                                                                        <div class="relative w-8 h-8 shrink-0">
                                                                            <img src={item.userId.profilePic} alt="" class="object-cover w-full h-full rounded-full" /></div>
                                                                        <div class="flex-1 min-w-0">
                                                                            <div class="text-sm font-medium text-black dark:text-white">{item.userId.username}</div>
                                                                        </div>
                                                                        <button type="button" class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Chat </button>
                                                                    </a>
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    : ''
                                            )
                                        }) : ""}



                                </div>
                            </TEModalBody>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>}
            <button type="button" class="fixed bottom-0 right-0 m-10" onClick={() => { setShowModal(true); setCounter(1) }}>
                <div class="flex items-center justify-center w-14 h-14 bg-sky-500 rounded-full">
                    <AiOutlinePlus className="text-white text-3xl" />
                </div>
            </button>
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                Create new post
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
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
                        <TEModalBody style={{ minHeight: "400px" }} >


                            <div className="lg:w-[600px] w-full">

                                <div className="relative" tabindex="-1" uk-slideshow="finite: true;animation: Fade;  min-height: 460;animation:fade">

                                    <ul className="uk-slideshow-">

                                        {/* <!-- Intro --> */}
                                        {counter == 1 ?
                                            (<li className="w-full">

                                                <div className="flex justify-center items-center flex-col gap-4 h-full" uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 300;repeat:true">

                                                    <div>
                                                        <svg className="text-gray-600 dark:text-white" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                                    </div>
                                                    <div uk-scrollspy-className="uk-animation-slide-bottom-small">
                                                        <h3 className="text-black font-semibold text-xl dark:text-white"> Sell Premium Photes</h3>
                                                    </div>
                                                    <div uk-scrollspy-className="uk-animation-slide-bottom-small">
                                                        <p className="text-sm text-center max-w-sm">You can earn money by selling high-quality photos and share them with your friends who are interested</p>
                                                    </div>
                                                    <div>
                                                        <button className="bg-blue-600 text-white rounded-lg py-1.5 px-4 text-sm mt-2 dark:bg-slate-700"> Start selling </button>
                                                    </div>

                                                </div>

                                            </li>)
                                            : counter == 2 ?
                                                (<li className="w-full">

                                                    <div>

                                                        <div className="p-8 space-y-4 font-normal text-sm">

                                                            <div className="md:flex items-center gap-16 justify-between">
                                                                <label className="md:w-32"> Title </label>
                                                                <div className="flex-1 max-md:mt-4">
                                                                    <input type="text" onChange={(e) => setTitle(e.target.value)} className=" w-full" />
                                                                </div>
                                                            </div>
                                                            <div className="md:flex items-start gap-16 justify-between">
                                                                <label className="md:w-32"> Description </label>
                                                                <div className="flex-1 max-md:mt-4">
                                                                    <textarea className="w-full" rows="4" onChange={(e) => setDescription(e.target.value)} placeholder="Product Description.."></textarea>
                                                                </div>
                                                            </div>
                                                            <div className="md:flex items-center gap-16 justify-between">
                                                                <label className="md:w-32"> Price </label>
                                                                <div className="flex-1 max-md:mt-4">
                                                                    <input type="number" onChange={(e) => Setprice(e.target.value)} placeholder="$12" className=" w-full" />
                                                                </div>
                                                            </div>
                                                            <div className="md:flex items-center gap-16 justify-between">
                                                                <label className="md:w-32"> Category </label>
                                                                <div className="flex-1 max-md:mt-4">
                                                                    <select onChange={(e) => setCategory(e.target.value)} className="w-full !border-0 !rounded-md">
                                                                        <option >Furniture</option>
                                                                        <option >Home decors</option>
                                                                        <option >Tools</option>
                                                                    </select>
                                                                </div>
                                                            </div>


                                                        </div>

                                                    </div>

                                                </li>)
                                                : counter == 3 ?
                                                    (<li className="w-full">

                                                        <div className="p-8" uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 300;repeat:true">

                                                            <div className="relative w-full h-[305px] border1 rounded-lg overflow-hidden bg-[url('../images/ad_pattern.png')] bg-repeat">

                                                                <label for="createProductUrl" className="flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 w-full pb-6 pt-10 cursor-pointer bg-gradient-to-t from-gray-700/60">
                                                                    <input id="createProductUrl" onChange={(e) => setimage(e.target.files[0])} type="file" className="hidden" />
                                                                    <ion-icon name="image" className="text-3xl text-teal-600"></ion-icon>
                                                                    <span className="text-white mt-2">Upload image </span>
                                                                </label>

                                                                {/* <img id="createProductImage" src="#" alt="Uploaded Image" accept="image/png, image/jpeg" style="display:none;" className="w-full h-full absolute object-cover"/> */}

                                                            </div>

                                                        </div>

                                                    </li>)
                                                    : counter == 4 ?
                                                        (<li className="w-full">

                                                            <div className="flex justify-center items-center flex-col gap-6 h-full" uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 300;repeat:true">

                                                                <div className="text-center">
                                                                    <ion-icon name="sparkles-sharp" className="text-5xl mb-6 text-blue-600 opacity-60 rotate-12"></ion-icon>
                                                                    <h3 className="text-black font-semibold text-xl dark:text-white"> Almost Done </h3>
                                                                </div>

                                                                <div className="font-medium text-sm">
                                                                    <div>
                                                                        <label className="flex justify-center max-w-sm mx-auto text-center">
                                                                            <input className="rounded mt-1" type="checkbox" checked name="checkbox1" value="3" />
                                                                            <span className="ml-3"> I agree this product is mine and i take resposibilty of this product for selling </span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-center p-6 pt-0">
                                                                    <button className="button bg-blue-600 text-white px-10" onClick={handleNewProduct}> Share </button>
                                                                </div>

                                                            </div>

                                                        </li>)

                                                        : ' '}
                                    </ul>



                                </div>

                            </div>

                        </TEModalBody>
                        <div className="flex  justify-center py-1.5 border-t relative dark:border-slate-700/60">
                            {counter == 1 ? '' :
                                <button type="button" onClick={() => { setCounter(prevState => prevState - 1) }} className="bg-secondery font-semibold py-1.5 px-3.5 rounded-full text-sm absolute left-4 bottom-3 leading-6 uk-animation-slide-left-small">Previews</button>
                            }
                            <ul className="inline-flex flex-wrap justify-center my-5 uk-dotnav uk-slideshow-nav gap-2.5"></ul>
                            {counter == 4 ? '' :
                                <button type="button" onClick={() => { setCounter(prevState => prevState + 1) }} className="bg-secondery font-semibold py-1.5 px-3.5 rounded-full text-sm absolute right-4 bottom-3 leading-6 uk-animation-slide-right-small">Next</button>
                            }

                        </div>

                    </TEModalContent>
                </TEModalDialog>
            </TEModal>

        </div>
    )
}

export default Shop
