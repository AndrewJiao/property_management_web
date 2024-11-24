import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import {basicPriceSlice} from "./basicprice/slice";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    basicPriceSlice: basicPriceSlice.reducer
})

let persistedReducer = persistReducer({
    key: "app",
    storage,
    whitelist: ['auth']
}, rootReducer);

let store = configureStore({
    reducer: persistedReducer,
    // middleware: (e) => e,
    devTools: true
});

let persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


export {store, persistedStore}
