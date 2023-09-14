import { createSlice } from"@reduxjs/toolkit"

const AdminAuth = createSlice({
    name:'Admin',
    initialState:{
        Token:null
    },
    reducers:{
        AdminLogin(state,action){
            state.Token = action.payload.Token
        },
        AdminLogout(state,action){
            state.Token = null
        }
    }
})

export const {AdminLogin,AdminLogout} = AdminAuth.actions
export const Adminreducer = AdminAuth.reducer