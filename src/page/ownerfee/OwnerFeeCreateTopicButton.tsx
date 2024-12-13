import React, {useState} from "react";
import {TopicButton} from "../../component";
import {SelectProps} from "antd";
import {DetailType} from "../../redux/ownerfee";

const detailTypeToSelected: SelectProps['options'] = [
    {
        label: '预存',
        value: DetailType.PreStoreFee
    },
    {
        label: '结算',
        value: DetailType.SettlementFee
    }
]
export const OwnerFeeCreateTopicButton: React.FC = () => {


    const [initLoading, setInitLoading] = useState(true);
    const [detailTypeToSelected, setDetailTypeToSelected] = useState<{ value: string, label: string }[]>([]);

    return <div/>
    // return <TopicButton
    //     onSelectCompleted={(e) => {
    //
    //     }}
    //     onFetchingData={}
    //     name={"新增明细"}>
    //
    // </TopicButton>
}