import {createSlice} from '@reduxjs/toolkit'

export const ClientAuth = createSlice({
    name:'Client',
    initialState:{
        Token:null,
        user:null,
        id:null,
        profilepic:null
    },
    reducers:{
        clientLogin(state,action){
            state.Token = action.payload.Token
            state.user =action.payload.user
            state.id = action.payload.id
            state.profilepic = action.payload.profilepic
        },
        clientLogout(state,action){
            state.Token = null
            state.user = null
            state.id = null
            state.profilepic = null
        }
    }
})
export const {clientLogin,clientLogout} = ClientAuth.actions
export const clientreducer = ClientAuth.reducer