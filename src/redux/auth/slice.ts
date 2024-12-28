import {createSlice} from "@reduxjs/toolkit";
import {RoleType} from "../userinfo";

interface AuthState {
    token?: string | null,
    account?: string,
    accountId?: String
    name?: string,
    role?: RoleType
}

const defaultState: AuthState = {
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState:defaultState ,
    reducers: {
        setAuth: (state, action) => {
        },
        removeAuth: (state) => {
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (_, action) => {
                console.log(`all return = ${JSON.stringify(action)}`);
            });
    }
})