import React, {useEffect} from "react";
import {AutoRow, SearchInput, TablePageColumn} from "../../component";
import {DatePicker, Form, Input, Table, Typography} from "antd";
import {initOwnerFeeDetailSearchDto, OwnerFeeDetailSearchDto, useGetOwnerFeeDataQuery} from "../../redux/ownerfee";
import styles from './OwnerFeeTable.module.css';
import {useForm} from "antd/es/form/Form";
import {defaultCurrentMonthRangeDayJs} from "../../utils";


const columns: TablePageColumn = [
    {title: '编号', dataIndex: 'id', key: 'id',},
    {title: '流ID', dataIndex: 'streamId', key: 'streamId',},
    {title: '房间号', dataIndex: 'roomNumber', key: 'roomNumber',},
    {title: '业主姓名', dataIndex: 'ownerName', key: 'ownerName',},
    {title: '明细类型', dataIndex: 'detailType', key: 'detailType',},
    {title: '金额', dataIndex: 'amount', key: 'amount',},
    {title: '余额', dataIndex: 'amountBalance', key: 'amountBalance',},
    {title: '备注', dataIndex: 'comment', key: 'comment',},
    {title: '创建人', dataIndex: 'createBy', key: 'createBy',},
    {title: '更新人', dataIndex: 'updateBy', key: 'updateBy',},
    {title: '创建时间', dataIndex: 'createTime', key: 'createTime',},
    {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',},
    {title: '相关订单号', dataIndex: 'relatedOrderNumber', key: 'relatedOrderNumber',},
];

function onFetchSearchDetailType(e) {
    alert(`e = ${JSON.stringify(e)}`);
}

export const OwnerFeeTable: React.FC = () => {
    let [searchForm] = useForm<OwnerFeeDetailSearchDto>();
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', defaultCurrentMonthRangeDayJs());
    }, []);

    let {isLoading, isFetching, data,refetch} = useGetOwnerFeeDataQuery(initOwnerFeeDetailSearchDto());


    const onFinishFormToFetch = (value)=>{
    }

    return <>
        <Typography.Title level={4}>用户费用明细</Typography.Title>

        <div className={styles['search-content']}>
            <Form form={searchForm} onFinish={onFinishFormToFetch}>
                <AutoRow subElements={[
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
                        <Input placeholder={`请输入`} style={{width: 200}}/>
                        <SearchInput placeholder={'请输入'} fetch={onFetchSearchDetailType}
                                     style={{width: 200, textAlign: "left"}}/>
                    </Form.Item>,
                    <Form.Item<OwnerFeeDetailSearchDto> name="createDateRange" label={'创建时间'}
                                                        labelCol={{span: 4}}
                                                        wrapperCol={{span: 4}}>
                        <DatePicker.RangePicker style={{width: 300}}/>
                    </Form.Item>,
                    <Form.Item<OwnerFeeDetailSearchDto> name="updateDateRange" label={'创建时间'}
                                                        labelCol={{span: 4}} wrapperCol={{span: 4}}>
                        <DatePicker.RangePicker style={{width: 300}}/>
                    </Form.Item>
                ]}/>


            </Form>

        </div>
        <div className={styles['table-content']}>
            <Table columns={columns} dataSource={[data?.paginateResult]}/>
        </div>
    </>
}