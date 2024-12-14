import {DateRangeType} from "../../utils";
import {SelectProps} from "antd";

export enum SettleType {
    //未结算
    Settled = "Settled",
    //已结算
    NotSettle = "NotSettle",
    //无需结算
    NoNeedSettle = "NoNeedSettle"
}

export interface OwnerFeeDetailResultDto {
    id: number;
    streamId: string;
    roomNumber: string;
    ownerName?: string;
    detailType: DetailType;
    detailTypeDesc: string;
    calculateType: CalculateType;
    amount: number;
    amountBalance: number;
    comment?: string;
    createBy: string;
    updateBy: string;
    createTime: Date;
    updateTime: Date;
    relatedOrderNumber: string;
    settleType: SettleType;

}


export interface OwnerFeeDetailSearchDto extends DateRangeType {
    streamId?: string;
    roomNumber?: string;
    detailType?: DetailType;
}

export enum CalculateType {
    Add = "Add",
    Subtract = "Subtract",
}

export enum DetailType {
    //物业费
    ManagementFee = "ManagementFee",
    //滞纳
    LiquidatedDamages = "LiquidatedDamages",
    //预存
    PreStoreFee = "PreStoreFee",
    //结算
    SettlementFee = "SettlementFee",
}

export enum DetailTypePlus {
    ManagementFeeBatch = "ManagementFeeBatch"
}

export type StreamAddDetailType =
    Omit<DetailType, DetailType.LiquidatedDamages> | DetailTypePlus.ManagementFeeBatch

export interface OwnerFeeDetailCreateDto {
    roomNumber?: string,
    version?: string,
    detailType: StreamAddDetailType,
    amount?: number,
    streamId?: string,
}

export const detailTypeSelectProps = (): SelectProps['options'] => {
    return [
        {
            label: '物业费',
            value: DetailType.ManagementFee
        },
        {
            label: '滞纳',
            value: DetailType.LiquidatedDamages
        },
        {
            label: '预存',
            value: DetailType.PreStoreFee
        },
        {
            label: '结算',
            value: DetailType.SettlementFee
        }
    ]
}


export interface OwnerFeeDetailUpdateDto {
    amount?: number;
    comment?: string;
}
