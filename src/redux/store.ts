import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import {basicPriceSlice} from "./basicprice/slice";
import storage from 'redux-persist/lib/storage';
import {ownerInfoSlice} from "./ownerInfo/slice";
import {roomInfoSlice} from "./roominfo/slice";
import {propertyFeeSlice} from "./propertyfee/slice";
import {ownerFeeApi} from "./ownerfee";


const rootReducer = combineReducers({
    basicPriceSlice: basicPriceSlice.reducer,
    ownerInfoSlice: ownerInfoSlice.reducer,
    roomInfoSlice: roomInfoSlice.reducer,
    propertyFeeSlice: propertyFeeSlice.reducer,
    [ownerFeeApi.reducerPath]: ownerFeeApi.reducer
})

let persistedReducer = persistReducer({
    key: "app",
    storage,
    whitelist: ['auth']
}, rootReducer);

let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(ownerFeeApi.middleware),
    devTools: true
});

let persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export {store, persistedStore}
