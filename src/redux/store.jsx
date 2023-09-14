import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { clientreducer } from './client';
import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { Adminreducer } from './admin';

const persitConfig = {
    key:'admin',
    storage,
};
const userPersistConfig = {
    key : 'user',
    storage
}

const persistedClientReducer = persistReducer(userPersistConfig,clientreducer)
const persistedAdminReducer = persistReducer(persitConfig,Adminreducer)

export const store = configureStore({
    reducer:{
        Client:persistedClientReducer,
        Admin:persistedAdminReducer
    }
})
export const persistor = persistStore(store)