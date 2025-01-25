import {DetailType, OwnerFeeDetailResultDto, useCreateOwnerFeeDataMutation} from "../../redux/ownerfee";
import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import {Form, InputNumber, Row, Tag, Typography} from "antd";
import {useDispatch} from "../../redux/hook";
import {ownerFeeSlice} from "../../redux/ownerfee/slice";
import {TopicButton} from "../../component";
import styles from "./OwnerFeeTableCell.module.css";
import {useForm} from "antd/es/form/Form";

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


    let onConfirm = async (settleNumber: number) => {
        await postFetch({
            streamId: record.streamId,
            detailType: DetailType.SettlementFee,
            settleAmount: settleNumber
        });
        //单纯触发重新查询
        dispatch(ownerFeeSlice.actions.touchUpdate())
    };
    const Operation = () => {
        switch (record.settleType) {
            case "NotSettle":
                return (
                    <SettleTopic onCompleted={onConfirm} defaultSettleAmount={record.amount}/>
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


const SettleTopic = (props: { onCompleted: (settleNumber: number) => void, defaultSettleAmount: number }) => {
    const [settleAmount, setSettleAmount] = useState(props.defaultSettleAmount)
    const preStoreAmount = settleAmount - props.defaultSettleAmount
    const validate = props.defaultSettleAmount <= settleAmount;
    const help = `结算金额必须大于等于${props.defaultSettleAmount}`;
    const completedFun = (open: (flag: boolean) => void) => {
        if (validate) {
            props.onCompleted(settleAmount)
            open(false)
        } else {
            open(true)
        }
    }
    return <div>
        <TopicButton onCompleted={completedFun} name={"结算"} title={`结算金额:${props.defaultSettleAmount}`}>
            <Row className={styles['topic-row']}>
                <Form>

                    <Form.Item<{ amount: number }> name={"amount"} label={'结算金额'}
                                                   labelCol={{span: 12}}
                                                   wrapperCol={{span: 8}}
                                                   validateStatus={validate ? 'success' : 'error'}
                                                   help={validate ? '' : help}
                    >
                        <InputNumber defaultValue={settleAmount}
                                     onChange={(inputValue) => setSettleAmount(Number(inputValue))}/>
                    </Form.Item>
                </Form>
                <Typography.Text style={{marginTop: 5}}>
                    预存金额: {preStoreAmount}
                </Typography.Text>
            </Row>
        </TopicButton>
    </div>

}