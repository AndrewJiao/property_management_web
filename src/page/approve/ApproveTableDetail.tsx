import React, {useCallback, useEffect} from "react";
import {useSelector} from "../../redux/hook";
import {PaginateRequest} from "../../axios";
import {TimeUtil} from "../../utils";
import {Popover, Row, Space, Table, Tag, Typography} from "antd";
import {ColumnTypes, TablePageColumn} from "../../component";
import api from "../../redux/approve/api";
import {ApproveCreateUserValue, ApproveDto} from "../../redux/approve";
import {ApproveTableCell} from "./cell";

const Content = (param: ApproveCreateUserValue) => {
    return <div>
        <Row>
            <Space>
                名称：<p>{param.name}</p>
            </Space>
        </Row>
        <Row>
            <Space>
                账户：<p>{param.account}</p>
            </Space>
        </Row>
        <Row>
            <Space>
                {
                    param.bindingRoomNumber?.map(value => {
                        return <Tag color="green">{value}</Tag>
                    })
                }
            </Space>
        </Row>
    </div>
}

const columns: TablePageColumn = [
    {title: '审批单号', dataIndex: 'orderNo', key: 'orderNo', width: 200},
    {title: '审批状态', dataIndex: 'approveStateDesc', key: 'approveStateDesc', width: 150},
    {title: '审批类型', dataIndex: 'approveTypeDesc', key: 'approveTypeDesc', width: 150},
    {
        title: '审批数据', dataIndex: 'approveData', key: 'approveData', width: 150,
        render: (data: string, record: ApproveDto) => {
            return <Popover content={Content(record.approveData)} title="Title" trigger="hover">
                <Typography.Text>{JSON.stringify(record.approveData).slice(0,20)}</Typography.Text>
            </Popover>
        }
    },
    {
        title: '备注', dataIndex: 'comment', key: 'comment', width: 150, editable: true,
        render: (_, record: ApproveDto) => {
            return <Popover content={record.comment}>
                {record.comment ? record.comment.slice(0, 20) + '...' : record.comment}
            </Popover>
        }
    },
    {title: '创建人', dataIndex: 'createBy', key: 'createBy', width: 150},
    {title: '更新人', dataIndex: 'updateBy', key: 'updateBy', width: 150},
    {title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 150, render: TimeUtil.tableTimeRender},
    {title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 150, render: TimeUtil.tableTimeRender},
    {title: '操作', dataIndex: 'operation', key: 'operation', width: 150},
];

const addOperationColumn = (column: TablePageColumn) => {
    return column.map(data => {
        return {
            ...data,
            onCell: (record: ApproveDto) => {
                return {
                    record,
                    dataIndex: data.dataIndex,
                    title: data.title,
                }
            }
        }
    })
}
export const ApproveTableDetail: React.FC = () => {
    let {searchParam, touchSearch} = useSelector(state => state.approveSlice);
    let [postFetch, {isFetching, data}, lastArg] = api.useLazyGetApproveQuery();
    useEffect(() => {
        postFetch(new PaginateRequest(1, 10, TimeUtil.buildDateSearchParam(searchParam)));
    }, [touchSearch])

    let cellColumns = useCallback(() => addOperationColumn(columns), []);

    return <Table columns={cellColumns() as ColumnTypes} dataSource={data?.data} loading={isFetching}
                  components={{
                      body: {
                          cell: ApproveTableCell
                      }
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

