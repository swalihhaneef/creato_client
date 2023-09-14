import React, { useState } from 'react'

const Demo = () => {
   
    const [user,setUser] = useState([])
    const profilePic = async (id) => {
        const profileref = collection(db, 'profile');
        const profilequery = query(profileref, where("userId", "==", id));

        try {
            const profilequerysnapshot = await getDocs(profilequery);

            if (!profilequerysnapshot.empty) {
                const profile = profilequerysnapshot.docs[0].data();
               return profile.profilePic

            } else {
                // Handle the case where no profile data is found
                return "https://via.placeholder.com/273x271"; // Placeholder URL
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            return "https://via.placeholder.com/273x271"; // Placeholder URL in case of an error
        }
    };
    return (
        <div>
            <div>
               

               { user.map((item)=>{
                <>
                <h1>{item.name}</h1>
                    <img
                        className="w-[120px] h-[120px] rounded-full"
                        src={profilePic(item.id)}
                        alt="Profile"
                        />
                        </>
                })}
            </div>
        </div>
    )
}

export default Demo
