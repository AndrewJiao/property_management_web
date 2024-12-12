import {AxiosResponse} from 'axios'
import {appInstance, AppResult, PaginateRequest} from "./AxiosConf";
import {encode} from "base-64";
import utf8 from "utf8";
import {RoomInfoData} from "../redux/roominfo/slice";
import {DateRangeType} from "../utils";

/**
 * 基础价格请求
 */
export const REQUEST_ROOM_INFO = {
    getData: (param: PaginateRequest<RoomInfoDetailSearchDto>) => {
        return appInstance.get<any, AxiosResponse<AppResult<RoomInfoDetailResultDto[]>>>(
            `/room_info/data`,
            {
                params: {
                    ...param,
                    param: param.searchParam ? encode(utf8.encode(JSON.stringify(param.searchParam))) : null
                },
            })
    },

    initData: () => {
        return appInstance.post<any, AxiosResponse<AppResult<void>>>(`/room_info/init`)
    },

    putData: (id: string, data: RoomInfoDetailUpdateDto) => {
        return appInstance.put<any, AxiosResponse<AppResult<RoomInfoDetailResultDto>>>(`/room_info/data/${id}`, data)
    },
    findData: (searchValue: string, searchType: RoomInfoSearchType) => {
        return appInstance.get<any, AxiosResponse<AppResult<string[]>>>(`/room_info/find`, {
            params: {searchType, searchValue}
        }).then(e => e.data.data)
    }
}

export enum RoomInfoSearchType {
    monthVersion = "monthVersion"
}

export type RoomInfoDetailResultDto = RoomInfoData;

export interface RoomInfoDetailUpdateDto {
    waterMeterNumBefore?: number;
    waterMeterNum?: number;
    waterMeterSub?: number;
    electricityMeterNumBefore?: number;
    electricityMeterNum?: number;
    electricityMeterSub?: number;
    comment?: string;
}

export interface RoomInfoDetailSearchDto extends DateRangeType {
    roomNumber?: string;
    monthVersion?: string;
}
