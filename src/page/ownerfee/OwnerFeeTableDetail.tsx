import React, {useEffect} from "react";
import {OwnerFeeDetailSearchDto, useLazyGetOwnerFeeDataQuery} from "../../redux/ownerfee";
import {PaginateRequest} from "../../axios";
import {Table} from "antd";
import {TablePageColumn} from "../../component";


const columns: TablePageColumn = [
    {title: '明细ID', dataIndex: 'streamId', key: 'streamId',},
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

export const OwnerFeeTableDetail = (props: { param: OwnerFeeDetailSearchDto }) => {
    let [trigger, {isFetching, isLoading, data}] = useLazyGetOwnerFeeDataQuery();
    useEffect(() => {
        trigger(new PaginateRequest(1, 2, props.param));
    }, []);
    return <Table columns={columns} dataSource={data?.data} loading={isLoading}
                  pagination={
                      {
                          disabled: isFetching,
                          position: ["bottomCenter"],
                          pageSize: data?.paginateResult.pageSize,
                          current: data?.paginateResult.currentPage,
                          total: data?.paginateResult.totalSize,
                          showSizeChanger: true,
                          onShowSizeChange: (currentPage, pageSize) => {
                              trigger(new PaginateRequest(currentPage, pageSize, props.param))
                          },
                          onChange: (currentPage, pageSize) => {
                              trigger(new PaginateRequest(currentPage, pageSize, props.param))
                          }
                      }
                  }/>
}
