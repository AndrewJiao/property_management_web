import React from "react";
import {useForm} from "antd/es/form/Form";
import {Form, Input, Select} from "antd";
import styles from './UserTable.module.css';
import {
    roleTypeSelectProps,
    usePostUserMutation,
    UserCreateDto,
    UserSearchDto,
    userSlice
} from "../../../redux/userinfo";
import {useDispatch} from "../../../redux/hook";
import {SearchInput, TopicButton} from "../../../component";
import {AxiosOwnerInfo} from "../../../axios";
import TextArea from "antd/es/input/TextArea";

interface Props {
    classNameButton?: string
}

export const UserCreateTopicButton: React.FC<Props> = ({classNameButton}) => {
    let [form] = useForm<UserCreateDto>()
    let [postCreateUser, {isLoading, isSuccess, data}] = usePostUserMutation();
    let dispatch = useDispatch();

    const onFinishForm = async (value: UserCreateDto) => {
        await postCreateUser(value)
        //触发重新查询
        dispatch(userSlice.actions.touchUpdate());
        form.resetFields();
    }

    const SearchContent = () => <Form form={form} onFinish={onFinishForm}>
        <Form.Item<UserCreateDto> className={styles['topic-input']} name={"account"} label={"账户"}
                                  labelCol={{span: 4}} wrapperCol={{span: 12}}
                                  rules={[{required: true, message: '账户必填'}]}>
            <Input placeholder={"请输入"} style={{width: 225}}/>
        </Form.Item>
        <Form.Item<UserCreateDto> className={styles['topic-input']} name={"password"} label={"密码"}
                                  labelCol={{span: 4}} wrapperCol={{span: 12}}
                                  rules={[{required: true, message: '密码是必填项'}]}>
            <Input placeholder={"请输入"} style={{width: 225}}/>
        </Form.Item>

        <Form.Item<UserCreateDto> className={styles['topic-input']} name={"name"} label={"用户名称"}
                                  labelCol={{span: 4}} wrapperCol={{span: 12}}
                                  rules={[{required: true, message: '用户名称是必填项'}]}>
            <Input placeholder={"请输入"} style={{width: 225}}/>
        </Form.Item>

        <Form.Item<UserCreateDto> name={"roleType"} label={'角色'} rules={[{required: true, message: '角色是必填项'}]}
                                  labelCol={{span: 4}}
                                  wrapperCol={{span: 12}}>
            <Select size={'middle'} placeholder="请输入" options={roleTypeSelectProps()} style={{width: 225}}/>
        </Form.Item>
        <Form.Item<UserCreateDto> name={"bindingRoomNumber"} label={'关联房间号'}
                                  labelCol={{span: 4}}
                                  wrapperCol={{span: 12}}>
            <SearchInput
                mode={"multiple"}
                placeholder={"请选择"} fetch={AxiosOwnerInfo.onClickSearch} style={{width: 225}}/>
        </Form.Item>
        <Form.Item<UserCreateDto> name={"comment"} label={'备注'}
                                  labelCol={{span: 4}}
                                  wrapperCol={{span: 12}}>
            <TextArea placeholder={"请选择"} autoSize={{minRows: 5, maxRows: 7}}/>
        </Form.Item>
    </Form>
    return <TopicButton onCompleted={async (open) => {
        try {
            await form.validateFields();
            form.submit();
            open(false)
        } catch (e) {
            open(true)
        }
    }} name={"新增用户"} className={classNameButton}>
        <SearchContent/>
    </TopicButton>
}
