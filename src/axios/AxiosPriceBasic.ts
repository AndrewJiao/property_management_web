import {AxiosResponse} from 'axios'
import {appInstance, AppResult} from "./AxiosConf";

/**
 * 基础价格请求
 */
export const REQUEST_PRICE_BASIC = {
    getData: <T>(currentPage: number, pageSize: number) => {
        return appInstance.get<any, AxiosResponse<AppResult<T>>>(
            `/price_basic/data?currentPage=${currentPage}&pageSize=${pageSize}`,
        )
    },

    putData: <T>(id: number, data: UpdatePriceBasicDto) =>
        appInstance.put<any, AxiosResponse<AppResult<T>>>(`/price_basic/data/${id}`, data),
}


export interface PriceBasicDto {
    id: number;
    name: string;
    priceNumber: number;
    comment: string;
    createTime: Date;
    updateTime: Date;
    createBy: string;
    updateBy: string;
}

export type  UpdatePriceBasicDto = Pick<PriceBasicDto, 'name' | 'priceNumber' | 'comment'>
