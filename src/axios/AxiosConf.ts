import axios from 'axios'
import {AxiosResponse} from 'axios'

// axios.defaults.headers['x-icode'] = 'FB80558A73FA658E'

export const appInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
});

// 可以配置请求拦截器
// appInstance.interceptors.request.use(
//     (config) => {
//         // 在请求发送之前可以做一些操作，例如添加 token 等
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers = {'X-Requested-With': 'XMLHttpRequest'};
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


/**
 * 通用请求
 */
export interface AppResult<T> {
    code: number;
    message: string;
    data: T;
    paginateResult: PaginateResult;
    timestamp: string;
}

/**
 * 通用请求分页
 */
export interface PaginateResult {
    currentPage: number;
    totalSize: number;
    pageSize: number;
}

export class PaginateRequest<T> {
    constructor(currentPage?: number, pageSize?: number, searchParam?: T) {
        this.currentPage = currentPage ? currentPage : 1;
        this.pageSize = pageSize ? pageSize : 10;
        this.searchParam = searchParam ? searchParam : null;
    }

    currentPage: number = 1;
    pageSize: number = 10;
    searchParam?: T | null;
}


export const axiosAppendIdToKey = (e: AxiosResponse<AppResult<any>>) => {
    let item = e.data.data;
    if (Array.isArray(item)) {
        e.data.data = item.map(e => ({...e, key: e.id.toString()}))
    } else {
        e.data.data = {...item, key: item.id.toString()}
    }
    return e
}
export const axiosGetContent = (e: AxiosResponse<AppResult<any>>) => {
    return e.data
}
