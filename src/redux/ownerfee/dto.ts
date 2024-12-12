import {buildDateSearchParam, DateRangeType, defaultCurrentMonthRange} from "../../utils";
import {OwnerInfoSearchDto, PaginateRequest} from "../../axios";

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

/**
 * 初始化查詢
 */
export const initOwnerFeeDetailSearchDto = (): PaginateRequest<OwnerInfoSearchDto> => {
    let [star, end] = defaultCurrentMonthRange();
    return {
        currentPage: 1,
        pageSize: 10,
        searchParam: buildDateSearchParam({
            createDateRange: [star.toISOString(), end.toISOString()],
            createTimeStar: null,
            createTimeEnd: null,
        })
    }
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
