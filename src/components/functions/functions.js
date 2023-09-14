import userAxios  from '../../Axios/UserAxios'
// import { useDispatch, useSelector } from 'react-redux'
// const { Token } = useSelector((state) => state.Client)

// const handleFollow = ((id) => {
//     userAxios.patch('/follow', { id }, {
//         headers: {
//             Authorization: Token
//         }
//     }).then((res) => {
//         if (res.data.success) {
//             setSuccess(id)
//             trigger()
//         }
//     })
// })

export const getSender = (userId,array)=>{
        
    return userId == array[0]._id ? array[1] : array[0]
}

export const messageSender = (userId,senderId)=>{
    // console.log(userId,senderId);
    return userId == senderId ? true : false
}

export  const imgConverter = (post) => {
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
