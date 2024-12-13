import {DateRangeType} from "../../utils";

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
    ManagementFee,
    //滞纳
    LiquidatedDamages,
    //预存
    PreStoreFee,
    //结算
    SettlementFee,
}

export interface OwnerFeeDetailUpdateDto {
    amount?: number;
    comment?: string;
}
