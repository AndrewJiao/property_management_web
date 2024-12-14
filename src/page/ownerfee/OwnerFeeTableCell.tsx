import {
    DetailType,
    OwnerFeeDetailResultDto,
    useCreateOwnerFeeDataMutation,
    useLazyGetOwnerFeeDataQuery
} from "../../redux/ownerfee";
import React, {PropsWithChildren} from "react";
import {Button, Popconfirm, Tag} from "antd";
import {useDispatch} from "../../redux/hook";
import {ownerFeeSlice} from "../../redux/ownerfee/slice";

interface Props {
    record: OwnerFeeDetailResultDto
    dataIndex: string
}

export const OwnerFeeTableCell: React.FC<PropsWithChildren<Props>> = ({
                                                                          record,
                                                                          dataIndex,
                                                                          children,
                                                                          ...props
                                                                      }) => {

    let dispatch = useDispatch();
    let [postFetch, {isLoading}] = useCreateOwnerFeeDataMutation();
    const Operation = () => {
        switch (record.settleType) {
            case "NotSettle":
                console.log("OwnerFeeTableCell")
                return (
                    <Popconfirm disabled={isLoading} title="确定要结算吗" onConfirm={async () => {
                        await postFetch({
                            streamId: record.streamId,
                            detailType: DetailType.SettlementFee
                        });
                        //单纯触发重新查询
                        dispatch(ownerFeeSlice.actions.touchUpdate())
                    }}>
                        <Button size={"small"} type={"primary"}>结算</Button>
                    </Popconfirm>
                )
            case "Settled":
                return <Tag color={"blue"}> 已结算 </Tag>
            case "NoNeedSettle":
                return <Tag color={"green"}> 无需结算 </Tag>
            default:
                return <>{children}</>
        }
    }
    return <td {...props}>{
        dataIndex === 'operation' ? <Operation/> : <>{children}</>
    } </td>
}
