import {AxiosResponse} from 'axios'
import {appInstance, AppResult, PaginateRequest} from "./AxiosConf";
import {encode} from "base-64";
import utf8 from "utf8";
import {DateRangeType} from "../utils";
import {PropertyFeeDetailData} from "../redux/propertyfee/slice";

/**
 * 基础价格请求
 */
export const REQUEST_PROPERTY_FEE = {
    getData: (param: PaginateRequest<PropertyFeeDetailSearchDto>) => {
        return appInstance.get<any, AxiosResponse<AppResult<PropertyFeeResultDto[]>>>(
            `/property_fee/data`,
            {
                params: {
                    ...param,
                    param: param.searchParam ? encode(utf8.encode(JSON.stringify(param.searchParam))) : null
                },
            })
    },

    initData: (monthVersion: string) => {
        let param: PropertyFeeDetailInitDto = {monthVersion: monthVersion};
        return appInstance.post<PropertyFeeDetailInitDto, AxiosResponse<AppResult<void>>>(`/property_fee/data`, param)
    },

    putData: (id: string, data: PropertyFeeDetailUpdatePo) => {
        return appInstance.put<any, AxiosResponse<AppResult<PropertyFeeResultDto>>>(`/property_fee/data/${id}`, data)
    },
    deleteData(id: string | number) {
        return appInstance.delete(`/property_fee/data/${id}`)
    },
    exportData: (param: PaginateRequest<PropertyFeeDetailSearchDto>) => {
        return appInstance.get(
            `/property_fee/export`,
            {
                responseType: 'blob',
                params: {
                    ...param,
                    param: param.searchParam ? encode(utf8.encode(JSON.stringify(param.searchParam))) : null
                },
            })
    },
}


export type PropertyFeeResultDto = PropertyFeeDetailData;


export interface PropertyFeeDetailUpdatePo {
    id: number;
    managementFee?: number;
    partFee?: number;
    liftFee?: number;
    machineRoomRenovationFee?: number;
    electricFee?: number;
    electricShareFee?: number;
    waterFee?: number;
    waterShareFee?: number;
    liquidateFee?: number;
    preStoreFee?: number;
    updateBy?: string;
    updateTime?: Date;
    comment?: string;
    totalFee?: number;
}

export interface PropertyFeeDetailSearchDto extends DateRangeType {
    roomNumber?: string;
    roomOwnerName?: string;
    recordVersion?: string;
}

export interface PropertyFeeDetailInitDto {
    monthVersion?: string;
}
