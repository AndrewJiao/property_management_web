import React, {useEffect} from "react";
import {useDispatch} from "../../redux/hook";
import {useForm} from "antd/es/form/Form";
import {ApproveSearchDto, approveSlice} from "../../redux/approve";
import {defaultCurrentMonthRangeDayJs} from "../../utils";
import {Button, DatePicker, Form, FormProps, Input, Select} from "antd";
import {AutoRow} from "../../component";
import styles from "./ApproveTable.module.css";

export const ApproveFormDetail: React.FC = () => {
    let dispatch = useDispatch();
    let [searchForm] = useForm<ApproveSearchDto>();
    //初始化默认查询条件
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', defaultCurrentMonthRangeDayJs());
    }, []);

    const onFinishFormToFetch: FormProps<ApproveSearchDto>['onFinish'] = async (value) => {
        let searchParam = await searchForm.validateFields();
        dispatch(approveSlice.actions.setSearchParam(searchParam));
    }

    return <Form form={searchForm} onFinish={onFinishFormToFetch}>
        <AutoRow showBorder={false} perCountEachRow={3} subElements={[
            <Form.Item<ApproveSearchDto> name={"orderNo"} label={`审批单号`} labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <Input placeholder={`请输入`} style={{width: 200}}/>
            </Form.Item>,
            <Form.Item<ApproveSearchDto> name={"approveState"} label={`审批状态`} labelCol={{span: 4}}
                                         wrapperCol={{span: 10}}>
                <Select mode={"multiple"}>
                    <Select.Option value="Pending">待审批</Select.Option>
                    <Select.Option value="Approved">已通过</Select.Option>
                    <Select.Option value="Rejected">已拒绝</Select.Option>
                </Select>
            </Form.Item>,

            <Form.Item<ApproveSearchDto> name={"approveType"} label={`审批类型`} labelCol={{span: 4}}
                                         wrapperCol={{span: 10}}>
                <Select>
                    <Select.Option value="CreateUser">创建用户</Select.Option>
                    <Select.Option value="BindingRooms">绑定房间</Select.Option>
                    <Select.Option value="WeChartCreateUser">微信创建用户</Select.Option>
                    <Select.Option value="ChangeRoomInfo">修改房间信息</Select.Option>
                </Select>
            </Form.Item>,

            <Form.Item<ApproveSearchDto> name="createDateRange" label={'创建时间'}
                                      labelCol={{span: 4}}
                                      wrapperCol={{span: 4}}>
                <DatePicker.RangePicker style={{width: 300}}/>
            </Form.Item>,
            <Form.Item<ApproveSearchDto> name="updateDateRange" label={'更新时间'}
                                      labelCol={{span: 4}} wrapperCol={{span: 4}}>
                <DatePicker.RangePicker style={{width: 300}}/>
            </Form.Item>
        ]}/>

        <div className={styles['button-container']}>
            <div className={styles['button-left-container']}>
                <Button type="primary" htmlType="submit" className={styles['button-left']}>查询</Button>
                <Button type="dashed" htmlType="reset" className={styles['button-left']}>重置</Button>
            </div>
            {/*<div className={styles['button-right-container']}>*/}
            {/*    <UserCreateTopicButton classNameButton={styles['button-right']}/>*/}
            {/*</div>*/}
        </div>
    </Form>
}