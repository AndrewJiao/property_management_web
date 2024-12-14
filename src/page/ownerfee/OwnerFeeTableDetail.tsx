import React, {useEffect} from "react";
import {CalculateType, OwnerFeeDetailResultDto, useLazyGetOwnerFeeDataQuery} from "../../redux/ownerfee";
import {PaginateRequest} from "../../axios";
import {Table, Tag} from "antd";
import {ColumnTypes, TablePageColumn} from "../../component";
import {OwnerFeeTableCell} from "./OwnerFeeTableCell";
import {useSelector} from "../../redux/hook";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";


const columns: TablePageColumn = [
    {title: '明细ID', dataIndex: 'streamId', key: 'streamId',},
    {title: '关联订单号', dataIndex: 'relatedOrderNumber', key: 'relatedOrderNumber',},
    {title: '房间号', dataIndex: 'roomNumber', key: 'roomNumber',},
    {title: '业主姓名', dataIndex: 'ownerName', key: 'ownerName',},
    {title: '明细类型', dataIndex: 'detailTypeDesc', key: 'detailTypeDesc',},
    {
        title: '金额', dataIndex: 'amount', key: 'amount',
        render: (text: number, record: OwnerFeeDetailResultDto) => {
            if (record.calculateType === CalculateType.Add) {
                return <div><CaretDownOutlined/><Tag color="red">{text}</Tag></div>
            } else {
                return <div><CaretUpOutlined/> <Tag color="green">{text}</Tag></div>
            }
        }
    },
    {title: '应收金额', dataIndex: 'amountBalance', key: 'amountBalance',},
    {title: '备注', dataIndex: 'comment', key: 'comment',},
    {title: '创建人', dataIndex: 'createBy', key: 'createBy',},
    {title: '更新人', dataIndex: 'updateBy', key: 'updateBy',},
    {
        title: '创建时间', dataIndex: 'createTime', key: 'createTime',
        render: (text) => <span>{new Date(text).toLocaleString()}</span>
    },
    {
        title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',
        render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
        title: '操作', dataIndex: 'operation', key: 'operation',
        fixed: 'right',
    }
];
const columnWithOperation = columns.map(col => ({
    ...col,
    onCell: (record: OwnerFeeDetailResultDto) => ({
        record,
        title: col.title,
        dataIndex: col.dataIndex,
    })
}))
export const OwnerFeeTableDetail = () => {
    let {searchParam, touchSearch} = useSelector(state => state.ownerFeeSlice);
    let [postFetch, {isFetching, data}, lastArg] = useLazyGetOwnerFeeDataQuery();

    useEffect(() => {
        postFetch(new PaginateRequest(1, 10, searchParam));
    }, [touchSearch]);
    return <Table columns={columnWithOperation as ColumnTypes} dataSource={data?.data} loading={isFetching}
                  components={{
                      body: {cell: OwnerFeeTableCell}
                  }}
                  pagination={
                      {
                          disabled: isFetching,
                          position: ["bottomCenter"],
                          pageSize: data?.paginateResult.pageSize,
                          current: data?.paginateResult.currentPage,
                          total: data?.paginateResult.totalSize,
                          showSizeChanger: true,
                          onShowSizeChange: (currentPage, pageSize) => {
                              postFetch({...lastArg.lastArg, pageSize, currentPage})
                          },
                          onChange: (currentPage, pageSize) => {
                              postFetch({...lastArg.lastArg, pageSize, currentPage})
                          }
                      }
                  }/>
}
