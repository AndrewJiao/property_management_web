import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RoleType, UserDto, UserLoginDto} from "../userinfo";
import {REQUEST_AUTH} from "../../axios/AxiosAuth";
import cookieUtil from "../../utils/CookieUtil";

interface AuthState {
    // token?: string | null,
    account?: string,
    accountId?: String
    name?: string,
    role?: RoleType
    isLogin: boolean,
}

const defaultState: AuthState = {
    isLogin: false
}


/**
 * 登录成功就跳转home
 */
const thunkAuthLogin = createAsyncThunk('auth/login',
    async (param: UserLoginDto, thunkAPI) => {
        return REQUEST_AUTH.logIn(param.account, param.password);
    }
);
const thunkAuthLogout = createAsyncThunk('auth/logout', async () => {
    return REQUEST_AUTH.logOut();
});

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: defaultState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkAuthLogin.fulfilled,
            (state, action) => {
                let payload: UserDto = action.payload;
                return {
                    ...state,
                    account: payload.account,
                    accountId: payload.accountId,
                    name: payload.name,
                    role: payload.roleType,
                    isLogin: true,
                }
            }
        ).addCase(thunkAuthLogout.fulfilled,
            (state, action) => {
                return defaultState;
            }
        )
        //     .addMatcher(
        //     (action) => action.type.endsWith("/rejected"),
        //     (_, action) => {
        //         console.log(`all return = ${JSON.stringify(action)}`);
        //     }
        // );
    }
})

export default {thunkAuthLogout, thunkAuthLogin, AuthSlice}