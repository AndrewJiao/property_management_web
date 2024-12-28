import {appInstance, AppResult, PaginateRequest} from "./AxiosConf";
import {AxiosResponse} from 'axios'
import {encode} from 'base-64'
import utf8 from "utf8";


export interface OwnerInfoDto {
    id: number,
    roomNumber: string,
    ownerName: string,
    roomSquare: number | null,
    createBy: string,
    updateBy: string,
    createTime: Date,
    updateTime: Date,
    isDelete: boolean,
    comment: string,
    'otherBasic.carNumber': number,
    'otherBasic.motorCycleNumber': number,
    otherBasic: OwnerInfoState,
}


export interface OwnerInfoSearchDto {
    roomNumber?: string,
    ownerName?: string
}

export interface OwnerInfoUpdateDto {
    roomNumber: string,
    ownerName: string,
    comment: string,
    roomSquare: number | null,
    otherBasic: OwnerInfoState,
}

export type OwnerInfoInsertDto = OwnerInfoUpdateDto

export const defaultOwnerInfoInsertDto = {
    roomNumber: '',
    ownerName: '',
    comment: '',
    roomSquare: 0,
    otherBasic: {
        carNumber: 0,
        motorCycleNumber: 0,
    },
    // 'otherBasic.carNumber': 0,
    // 'otherBasic.motorCycleNumber': 0,
}


export interface OwnerInfoState {
    carNumber: number,
    motorCycleNumber: number,
}


export const REQUEST_OWNER_INFO = {
    getData: <T>(param: PaginateRequest<OwnerInfoSearchDto>) => {
        return appInstance.get<any, AxiosResponse<AppResult<T>>>(
            `/owner_info/info`,
            {
                params: {
                    ...param,
                    param: encode(utf8.encode(JSON.stringify(param.searchParam)))
                },
            })
    },

    putData: (dataId: number, updateData: OwnerInfoDto) => {
        let updateDto: OwnerInfoUpdateDto = {
            ...updateData,
            otherBasic: {
                carNumber: updateData["otherBasic.carNumber"],
                motorCycleNumber: updateData["otherBasic.motorCycleNumber"]
            }
        }
        return appInstance.put<any, AxiosResponse<AppResult<OwnerInfoDto>>>(`/owner_info/info/${dataId}`, updateDto)
    },

    postData: (data: OwnerInfoInsertDto) => {
        return appInstance.post<any, AxiosResponse<AppResult<OwnerInfoDto>>>(`/owner_info/info`, data)
    },
    deleteData: (dataId: number) => {
        return appInstance.delete<any, AxiosResponse<any>>(`/owner_info/info/${dataId}`)
    },
    findData: (searchValue: string, searchType: OwnerInfoSearchType) => {
        return appInstance.get<any, AxiosResponse<AppResult<string[]>>>(`/owner_info/find`, {
            params: {searchType, searchValue}
        }).then(e => e.data.data)
    }
}

export enum OwnerInfoSearchType {
    RoomNumber = "roomNumber",
    OwnerName = "ownerName",
}

export const AxiosOwnerInfo = {
    onClickSearch: async (value, callback) => {
        let roomNumbers = await REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.RoomNumber);
        callback(roomNumbers.map(value => ({value: value, text: value})));
    },
}
