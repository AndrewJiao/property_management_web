import React, {useEffect} from "react";
import {
    CalculateType,
    OwnerFeeDetailResultDto,
    OwnerFeeDetailSearchDto,
    useLazyGetOwnerFeeDataQuery
} from "../../redux/ownerfee";
import {PaginateRequest} from "../../axios";
import {Table, Tag} from "antd";
import {TablePageColumn} from "../../component";
import {useSelector} from "../../redux/hook";


const columns: TablePageColumn = [
    {title: '明细ID', dataIndex: 'streamId', key: 'streamId',},
    {title: '关联订单号', dataIndex: 'relatedOrderNumber', key: 'relatedOrderNumber',},
    {title: '房间号', dataIndex: 'roomNumber', key: 'roomNumber',},
    {title: '业主姓名', dataIndex: 'ownerName', key: 'ownerName',},
    {title: '明细类型', dataIndex: 'detailTypeDesc', key: 'detailTypeDesc',},
    {
        title: '应收金额', dataIndex: 'amount', key: 'amount',
        render: (text, record: OwnerFeeDetailResultDto) => {
            if (record.calculateType === CalculateType.Add) {
                return <Tag color="red">{text}</Tag>
            } else {
                return <Tag color="green">{text}</Tag>
            }

        }
    },
    {title: '余额', dataIndex: 'amountBalance', key: 'amountBalance',},
    {title: '备注', dataIndex: 'comment', key: 'comment',},
    {title: '创建人', dataIndex: 'createBy', key: 'createBy',},
    {title: '更新人', dataIndex: 'updateBy', key: 'updateBy',},
    {
        title: '创建时间', dataIndex: 'createTime', key: 'createTime',
        render: (text) => <span>{new Date(text).toLocaleString()}</span>
    },
    {
        title: '更新时间', dataIndex: 'updateTime', key: 'updateTime',
        render: (text) => <span>{new Date(text).toLocaleString()}</span>
    },
];

export const OwnerFeeTableDetail = () => {
    let {searchParam, isLoading} = useSelector(state => state.ownerFeeSlice);
    let [postFetch, {isFetching, data}] = useLazyGetOwnerFeeDataQuery();
    useEffect(() => {
        !isLoading && postFetch(new PaginateRequest(1, 10, searchParam));
    }, [searchParam, isLoading]);
    return <Table columns={columns} dataSource={data?.data} loading={isFetching || isLoading}
                  pagination={
                      {
                          disabled: isFetching,
                          position: ["bottomCenter"],
                          pageSize: data?.paginateResult.pageSize,
                          current: data?.paginateResult.currentPage,
                          total: data?.paginateResult.totalSize,
                          showSizeChanger: true,
                          onShowSizeChange: (currentPage, pageSize) => {
                              postFetch(new PaginateRequest(currentPage, pageSize, searchParam))
                          },
                          onChange: (currentPage, pageSize) => {
                              postFetch(new PaginateRequest(currentPage, pageSize, searchParam))
                          }
                      }
                  }/>
}
