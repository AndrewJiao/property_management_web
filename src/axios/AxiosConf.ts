import axios, {AxiosResponse} from 'axios'
import {SorterResult} from "antd/es/table/interface";

axios.defaults.headers['Access-Control-Allow-Origin'] = "*"

export const appInstance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "http://andrew.free.idcfengye.com",
    timeout: 10000,
    auth: {
        username: 'jiojio',
        password: 'jiojio'
    }
});


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
const convertObjectSorter = (sorter: SorterResult<any>): Order|undefined => {
    if(sorter.columnKey){
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
