import React, {useMemo, useRef, useState} from "react";
import {SearchInput, TopicButton} from "../../component";
import {DetailType, OwnerFeeDetailCreateDto, useCreateOwnerFeeDataMutation} from "../../redux/ownerfee";
import {OwnerInfoSearchType, REQUEST_OWNER_INFO} from "../../axios";
import {useForm} from "antd/es/form/Form";
import {Form, InputNumber} from "antd";
import styles from './OwnerFeeTable.module.css';
import {useDispatch} from "../../redux/hook";
import {ownerFeeSlice} from "../../redux/ownerfee/slice";

interface Props {
    classNameButton?: string

}

export const OwnerFeeCreateTopicButton: React.FC<Props> = ({classNameButton}) => {
    let [form] = useForm<OwnerFeeDetailCreateDto>()
    let [postCreateOwnerFee, {isLoading, isSuccess, data}] = useCreateOwnerFeeDataMutation();
    let dispatch = useDispatch();
    dispatch(ownerFeeSlice.actions.setTableLoading(isLoading));

    const onFinishForm = (value: OwnerFeeDetailCreateDto) => {
        postCreateOwnerFee({...value, detailType: DetailType.PreStoreFee}).then(() => {
            form.resetFields();
        })
    }

    const SearchContent = () => <Form form={form} onFinish={onFinishForm}>
        <Form.Item<OwnerFeeDetailCreateDto> className={styles['topic-input']} name={"roomNumber"} label={"房间号"}
                                            labelCol={{span: 4}} wrapperCol={{span: 12}}>
            <SearchInput placeholder={"选择预存用户"} fetch={async (value, callback) => {
                let roomNumbers = await REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.RoomNumber);
                callback(roomNumbers.map(value => ({value: value, text: value})));
            }}/>
        </Form.Item>
        <Form.Item<OwnerFeeDetailCreateDto> className={styles['topic-input']} name={"amount"} label={"金额"}
                                            labelCol={{span: 4}} wrapperCol={{span: 12}}>
            <InputNumber placeholder={"请输入"} style={{width: 225}}/>
        </Form.Item>
    </Form>


    return <TopicButton onCompleted={() => form.submit()} name={"增加预存"} classNameButton={classNameButton}>
        <SearchContent/>
    </TopicButton>
}