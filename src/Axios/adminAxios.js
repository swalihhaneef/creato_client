import axios from 'axios'
import { AdminApi } from '../Constants/api'

export const AdminAxios = axios.create({
    baseURL:AdminApi,
});

