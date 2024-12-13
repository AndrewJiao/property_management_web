import React, {useEffect} from "react";
import {AutoRow, SearchInput} from "../../component";
import {Button, DatePicker, Form, FormProps, Input, Select, SelectProps, Space} from "antd";
import {DetailType, detailTypeSelectProps, OwnerFeeDetailSearchDto} from "../../redux/ownerfee";
import {useForm} from "antd/es/form/Form";
import {defaultCurrentMonthRangeDayJs} from "../../utils";
import styles from "./OwnerFeeTable.module.css";

const options: SelectProps['options'] = detailTypeSelectProps()

export const OwnerFeeFormDetail = (props: { onFinishSearch: (param: OwnerFeeDetailSearchDto) => void }) => {

    let [searchForm] = useForm<OwnerFeeDetailSearchDto>();
    //初始化默认查询条件
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', defaultCurrentMonthRangeDayJs());
    }, []);

    const onFinishFormToFetch: FormProps<OwnerFeeDetailSearchDto>['onFinish'] = async (value) => {
        let searchParam = await searchForm.validateFields();
        props.onFinishSearch(searchParam)
    }
    return <Form form={searchForm} onFinish={onFinishFormToFetch}>
        <AutoRow showBorder={false} perCountEachRow={3} subElements={[
            <Form.Item<OwnerFeeDetailSearchDto> name={"roomNumber"} label={`房号`} labelCol={{span: 4}}
                                                wrapperCol={{span: 4}}>
                <Input placeholder={`请输入`} style={{width: 200}}/>
            </Form.Item>,
            <Form.Item<OwnerFeeDetailSearchDto> name={"streamId"} label={`明细号`}
                                                labelCol={{span: 4}}
                                                wrapperCol={{span: 4}}>
                <Input placeholder={`请输入`} style={{width: 200}}/>
            </Form.Item>,
            <Form.Item<OwnerFeeDetailSearchDto> name={"detailType"} label={`明细类型`}
                                                labelCol={{span: 4}}
                                                wrapperCol={{span: 4}}>
                <Select
                    mode="multiple"
                    size={'middle'}
                    placeholder="请输入"
                    defaultValue={[]}
                    style={{width: '350%'}}
                    options={options}
                />
            </Form.Item>,
            <Form.Item<OwnerFeeDetailSearchDto> name="createDateRange" label={'创建时间'}
                                                labelCol={{span: 4}}
                                                wrapperCol={{span: 4}}>
                <DatePicker.RangePicker style={{width: 300}}/>
            </Form.Item>,
            <Form.Item<OwnerFeeDetailSearchDto> name="updateDateRange" label={'更新时间'}
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
                <Button type="primary" htmlType="submit" className={styles['button-right']}>新增</Button>
            </div>
        </div>

    </Form>


}
