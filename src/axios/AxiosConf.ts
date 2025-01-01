import axios, {AxiosResponse} from 'axios'
import {SorterResult} from "antd/es/table/interface";


export class ErrorResult {
    constructor(code: number, message: string, source: string, status: number) {
        this.code = code;
        this.message = message;
        this.source = source;
        this.status = status;
    }
    code?: number;
    message?: string;
    source?: string;
    status?: number
}

// axios.defaults.headers['Access-Control-Allow-Origin'] = "*"

export const HOST_WITH_SEC = "https://localhost:9527/api"
export const HOST = "http://localhost:8080"

export const appInstance = axios.create({
    withCredentials: true,
    baseURL: HOST_WITH_SEC,
    // baseURL: "http://andrew.free.idcfengye.com",
    timeout: 10000,
    auth: {
        username: 'jiojio',
        password: 'jiojio'
    },
});
appInstance.interceptors.response.use(response => response,
    async (error) => {
        // await ErrorHandler.alertError(new ErrorResult(error.response.status, error.response.statusText, error.response.config.url, error.response.status))
        //拦截所有错误，根据情况给一个默认返回
        // let config = error.config;
        return Promise.reject(new ErrorResult(error.response.data?.code, error.response.data?.message || error.response.statusText, error.response.data?.source, error.response.status));
    },
);

function getDefaultResult(config: any) {
    let method: string = config.method;
    let url: string = config.url
    let params = config.params;
    if (method === "get") {
        if (url.includes("currentPage") && url.includes("pageSize")) {
            return {data: {data: []}, paginateResult: {currentPage: 1, pageSize: 10, totalSize: 0}}
        } else if (params?.searchType !== undefined && params?.searchValue !== undefined) {
            return {data: {data: []}}
        }
    } else {
        return {data: {data: {}}}
    }
}

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
    constructor(currentPage?: number, pageSize?: number, searchParam?: T, searchOrder?: Order[]) {
        this.currentPage = currentPage ? currentPage : 1;
        this.pageSize = pageSize ? pageSize : 10;
        this.searchParam = searchParam ? searchParam : undefined;
        this.searchOrder = searchOrder
    }

    currentPage: number = 1;
    pageSize: number = 10;
    searchOrder?: Order[];
    searchParam?: T | null;
}

export const convertTableSortToParamSort = (sort: SorterResult<any> | SorterResult<any>[]): Order[] => {
    if (Array.isArray(sort)) {
        return convertArraySorter(sort).flatMap(e => e === undefined ? [] : [e]);
    } else {
        let param = convertObjectSorter(sort);
        return param && [param] || []
    }
}
const convertObjectSorter = (sorter: SorterResult<any>): Order | undefined => {
    if (sorter.columnKey) {
        return {
            fieldName: sorter.columnKey as string,
            orderType: sorter.order === "ascend" ? OrderType.ASC : OrderType.DESC
        }
    }
}
const convertArraySorter = (sorters: SorterResult<any>[]) => {
    return sorters.map(e => convertObjectSorter(e)
    );
}

export interface Order {
    fieldName: string,
    orderType: OrderType
}

export enum OrderType {
    ASC = "Asc",
    DESC = "Desc"
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
