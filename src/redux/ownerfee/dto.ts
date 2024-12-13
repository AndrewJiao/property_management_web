import {DateRangeType} from "../../utils";
import {SelectProps} from "antd";

export interface OwnerFeeDetailResultDto {
    id: number;
    streamId: string;
    roomNumber: string;
    ownerName?: string;
    detailType: DetailType;
    amount: number;
    amountBalance: number;
    comment?: string;
    createBy: string;
    updateBy: string;
    createTime: Date;
    updateTime: Date;
    relatedOrderNumber: string;
}


export interface OwnerFeeDetailSearchDto extends DateRangeType {
    streamId?: string;
    roomNumber?: string;
    detailType?: DetailType;
}


export enum DetailType {
    //物业费
    ManagementFee = "managementFee",
    //滞纳
    LiquidatedDamages = "liquidatedDamages",
    //预存
    PreStoreFee = "preStoreFee",
    //结算
    SettlementFee = "settlementFee",
}

export interface OwnerFeeDetailCreateDto {
    roomNumber?: string,
    version?: string,
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
