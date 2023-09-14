import axios from 'axios'
import { userApi } from '../Constants/api'
import { useSelector } from 'react-redux';

const userInstances = () =>{
    const token = useSelector((state)=>state.Client.Token)
    const instance = axios.create({
        baseURL:userApi,
    });
    instance.interceptors.request.use(
        (config)=>{
           if(token){
            config.headers["Authorization"] = token
           }
           return config
        },
        (error)=>{
            return Promise.reject(error)
        }
    )
    return instance
}



export default  userInstances 
