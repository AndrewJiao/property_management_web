import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import {basicPriceSlice} from "./basicprice/slice";
import storage from 'redux-persist/lib/storage';
import {ownerInfoSlice} from "./ownerInfo/slice";
import {roomInfoSlice} from "./roominfo/slice";
import {propertyFeeSlice} from "./propertyfee/slice";
import {ownerFeeApi} from "./ownerfee";
import {ownerFeeSlice} from "./ownerfee/slice";
import {userInfoApi, userSlice, userTableSlice} from "./userinfo";
import {AuthSlice} from "./auth/slice";
import ErrorHandler from "./middleware/ErrorHandler";


const rootReducer = combineReducers({
    basicPriceSlice: basicPriceSlice.reducer,
    ownerInfoSlice: ownerInfoSlice.reducer,
    roomInfoSlice: roomInfoSlice.reducer,
    propertyFeeSlice: propertyFeeSlice.reducer,
    [ownerFeeApi.reducerPath]: ownerFeeApi.reducer,
    ownerFeeSlice: ownerFeeSlice.reducer,
    [userInfoApi.reducerPath]: userInfoApi.reducer,
    userSlice: userSlice.reducer,
    userTableSlice: userTableSlice.reducer,
    authSlice: AuthSlice.reducer,
})

let persistedReducer = persistReducer({
    key: "app",
    storage,
    whitelist: ['authSlice']
}, rootReducer);

let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(ownerFeeApi.middleware)
            .concat(ErrorHandler.ErrorHandlerMiddleWare)
            .concat(userInfoApi.middleware),
    devTools: true
});

let persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export {store, persistedStore}
