import {DateRangeType} from "../../utils";

export interface ApproveDto<T extends ApproveData = any> {
    id: number;
    orderNo: string;
    approveState: ApproveState;
    approveStateDesc: string;
    approveType: ApproveType;
    approveTypeDesc: string;
    approveData: T;
    comment?: string;
    createBy: string;
    updateBy: string;
    createTime: string;
    updateTime: string;
    isDelete: boolean;
}


export type ApproveType = 'CreateUser' | 'BindingRooms' | 'WeChartCreateUser' | 'ChangeRoomInfo';
export interface ApproveData {}

export interface BindingRooms extends ApproveData {
    bindingRoomNumber: string[];
}


export interface CreateUser extends ApproveData {
    account: string;
    bindingRoomNumber: string[];
    name: string;
}

export interface ChangeRoomInfo extends ApproveData {
    roomNumber: string;
    otherPartInfo: {
        carNumber?: number,
        motorCycleNumber?: number,
        carNumberElectron?: number
    }
}


export type ApproveState = 'Pending' | 'Approved' | 'Rejected'


export interface ApproveActionDto {
    approveState: ApproveState;
}

export interface ApproveSearchDto extends DateRangeType {
    orderNo?: string;
    approveState?: ApproveState[];
    approveType?: ApproveType;
}



