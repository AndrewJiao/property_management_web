import React from "react";
import {SearchInput, TopicButton} from "../../component";
import {
    DetailType,
    OwnerFeeDetailCreateDto,
    useCreateOwnerFeeDataMutation,
    useLazyGetOwnerFeeDataQuery
} from "../../redux/ownerfee";
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

    const onFinishForm = async (value: OwnerFeeDetailCreateDto) => {
        await postCreateOwnerFee({...value, detailType: DetailType.AdjustOrder})
        //触发重新查询
        dispatch(ownerFeeSlice.actions.touchUpdate());
        form.resetFields();
    }

    const SearchContent = () => <Form form={form} onFinish={onFinishForm}>
        <Form.Item<OwnerFeeDetailCreateDto> className={styles['topic-input']} name={"roomNumber"} label={"房间号"}
                                            labelCol={{span: 4}} wrapperCol={{span: 12}}
                                            rules={[{required: true, message: '房间号是必填项'}]}>
            <SearchInput placeholder={"选择预存用户"} fetch={async (value, callback) => {
                let roomNumbers = await REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.RoomNumber);
                callback(roomNumbers.map(value => ({value: value, text: value})));
            }}/>
        </Form.Item>
        <Form.Item<OwnerFeeDetailCreateDto> className={styles['topic-input']} name={"amount"} label={"金额"}
                                            labelCol={{span: 4}} wrapperCol={{span: 12}}
                                            rules={[{required: true, message: '金额是必填项'}]}>
            <InputNumber placeholder={"请输入"} style={{width: 225}}/>
        </Form.Item>
    </Form>


    return <TopicButton onCompleted={async (open) => {
        try {
            await form.validateFields()
            form.submit();
            open(false)
        } catch (e) {
            open(true)
        }
    }} name={"调整单"} className={classNameButton}>
        <SearchContent/>
    </TopicButton>
}