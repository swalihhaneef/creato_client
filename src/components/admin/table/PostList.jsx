import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PostList = ({ props }) => {
   
    const navigate = useNavigate()
  const itemsPerPage = 4; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = props.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    return (
        <div className=''>
            <div class="flex flex-col mt-24">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table
                                class="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>

                                        <th
                                            scope="col"
                                            class="border-r px-6 py-4 dark:border-neutral-500">
                                            username
                                        </th>
                                        <th
                                            scope="col"
                                            class="border-r px-6 py-4 dark:border-neutral-500">
                                            post
                                        </th>
                                        <th
                                            scope="col"
                                            class="border-r px-6 py-4 dark:border-neutral-500">
                                            posted on
                                        </th>

                                        <th scope="col" class="px-6 py-4">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.map((item) => {
                                        return (
                                            <tr class="border-b dark:border-neutral-500">
                                                    <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                     <img className="w-[60px] h-[55px] rounded-full border " src={item.userId.profilePic ? item.userId.profilePic : "https://via.placeholder.com/60x55"} alt="" />
                                                    <p>{item.userId.username}</p>
                                                </td>  
                                                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    <img src={item.post} className='w-[100px] flex justify-center' />
                                                </td>
                                                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {item.time}
                                                </td>
                                                <td class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                                    {item.mobile}
                                                </td>
                                                <td class="whitespace-nowrap px-6 py-4"onClick={() => navigate(`/admin/view?id=${item._id}`)}>View</td>
                                            </tr>


                                )
                                    })}



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 mx-1 border rounded ${endIndex >= props.length ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= props.length}
                >
                    Next
                </button>
            </div>
        </div>

        </div >
    )
}

export default PostList
