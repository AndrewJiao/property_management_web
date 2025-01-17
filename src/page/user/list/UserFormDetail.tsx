import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "../../../redux/hook";
import {roleTypeSelectProps, UserSearchDto, userSlice} from "../../../redux/userinfo";
import {defaultCurrentMonthRangeDayJs} from "../../../utils";
import {Button, DatePicker, Form, FormProps, Input, Select} from "antd";
import {AutoRow, SearchInput} from "../../../component";
import styles from "../../ownerfee/OwnerFeeTable.module.css";
import {OwnerFeeCreateTopicButton} from "../../ownerfee/OwnerFeeCreateTopicButton";
import {AxiosOwnerInfo} from "../../../axios";
import {UserCreateTopicButton} from "./UserCreateTopicButton";

const options = roleTypeSelectProps();
export const UserFormDetail: React.FC = () => {
    let dispatch = useDispatch();
    let [searchForm] = useForm<UserSearchDto>();

    //初始化默认查询条件
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', defaultCurrentMonthRangeDayJs());
    }, []);

    const onFinishFormToFetch: FormProps<UserSearchDto>['onFinish'] = async (value) => {
        let searchParam = await searchForm.validateFields();
        dispatch(userSlice.actions.setSearchParam(searchParam));
    }

    return <Form form={searchForm} onFinish={onFinishFormToFetch}>
        <AutoRow showBorder={false} perCountEachRow={3} subElements={[
            <Form.Item<UserSearchDto> name={"account"} label={`账户`} labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <Input placeholder={`请输入`} style={{width: 200}}/>
            </Form.Item>,
            <Form.Item<UserSearchDto> name={"name"} label={`名称`}
                                      labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <Input placeholder={`请输入`} style={{width: 200}}/>
            </Form.Item>,
            <Form.Item<UserSearchDto> name={"roleType"} label={'角色'}
                                      labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <Select mode="multiple" size={'middle'} placeholder="请输入" defaultValue={[]} style={{width: '350%'}}
                        options={options}/>
            </Form.Item>,

            <Form.Item<UserSearchDto> name={"bindingRoomNumber"} label={'关联房号'}
                                      labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <SearchInput mode={"multiple"} placeholder={"请选择"} style={{width: 200, textAlign: "left"}}
                             fetch={AxiosOwnerInfo.onClickSearch}/>
            </Form.Item>,
            <Form.Item<UserSearchDto> name="createDateRange" label={'创建时间'}
                                      rules={[{required: true, message: '请选择时间'}]}
                                      labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <DatePicker.RangePicker style={{width: 300}}/>
            </Form.Item>,
            <Form.Item<UserSearchDto> name="updateDateRange" label={'更新时间'}
                                      labelCol={{span: 4}} wrapperCol={{span: 4}}>
                <DatePicker.RangePicker style={{width: 300}}/>
            </Form.Item>
        ]}/>

        <div className={styles['button-container']}>
            <div className={styles['button-left-container']}>
                <Button type="primary" htmlType="submit" className={styles['button-left']}>查询</Button>
                <Button type="dashed" htmlType="reset" className={styles['button-left']}>重置</Button>
            </div>
            <div className={styles['button-right-container']}>
                <UserCreateTopicButton classNameButton={styles['button-right']}/>
            </div>
        </div>
    </Form>
}