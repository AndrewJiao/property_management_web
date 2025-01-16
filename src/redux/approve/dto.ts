import {DateRangeType} from "../../utils";

export interface ApproveDto {
    id: number;
    orderNo: string;
    approveState: ApproveState;
    approveStateDesc: string;
    approveType: ApproveType;
    approveTypeDesc: string;
    approveData: ApproveCreateUserValue;
    comment?: string;
    createBy: string;
    updateBy: string;
    createTime: string;
    updateTime: string;
    isDelete: boolean;
}

export interface ApproveCreateUserValue {
    account: string,
    name: string,
    bindingRoomNumber: [string] | null,
}

export type ApproveType = 'CreateUser'
export type ApproveState = 'Pending' | 'Approved' | 'Rejected'

export interface ApproveCreateDto {
    approveType: ApproveType;
    approveData: any;
    comment?: string;
}



export interface ApproveActionDto {
    approveState: ApproveState;
}

export interface ApproveSearchDto extends DateRangeType {
    orderNo?: string;
    approveState?: ApproveState;
    approveType?: ApproveType;
}



