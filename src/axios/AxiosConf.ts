import axios from 'axios'

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

export const PAGE_DEFAULT_CURRENT_PAGE = 1;
export const PAGE_DEFAULT_PAGE_SIZE = 10;

/**
 * 通用请求分页
 */
export interface PaginateResult {
    currentPage: number;
    totalSize: number;
    pageSize: number;


}

export class PaginateRequest {
    constructor(currentPage: number, pageSize: number) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }

    currentPage: number;
    pageSize: number;
}

export const PAGE_DEFAULT_PAGE_REQUEST: PaginateRequest = {
    currentPage: PAGE_DEFAULT_CURRENT_PAGE,
    pageSize: PAGE_DEFAULT_PAGE_SIZE
}

