import {appInstance, AppResult} from "./AxiosConf";
import {AxiosResponse} from 'axios';
import {UserDto} from "../redux/userinfo";

export const REQUEST_AUTH = {
    logIn(account: string, password: string) {
        return appInstance.put<AppResult<UserDto>>('/user_info/login', {
            account: account,
            password: password
        })
            .then((response) => response.data.data)
    },
    logOut(){
        appInstance.put<AxiosResponse>('/user_info/logout' )
    }
}