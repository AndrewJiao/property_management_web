import React, {useCallback, useEffect, useState} from "react";
import {ColumnTypes, TablePageColumn} from "../../../component";
import {Popover, Space, Table, Tag} from "antd";
import {useLazySearchUserQuery, UserDto} from "../../../redux/userinfo";
import {useSelector} from "../../../redux/hook";
import {PaginateRequest} from "../../../axios";
import {TimeUtil} from "../../../utils";
import {UserTableCell} from "./UserTableCell";
import {UserTableRow} from "./UserTableRow";

const columns: TablePageColumn = [
    {title: '账号', dataIndex: 'account', key: 'account', width: 150},
// { title: '密码', dataIndex: 'password', key: 'password', width: 150 },
    {title: '姓名', dataIndex: 'name', key: 'name', width: 150},
    {title: '角色', dataIndex: 'roleTypeDesc', key: 'roleTypeDesc', width: 150},
    {
        title: '绑定房间号', dataIndex: 'bindingRoomNumber', key: 'bindingRoomNumber', width: "7%", editable: true,
        render: (_, record: UserDto) => {

            let tags = record.bindingRoomNumber?.map(value => {
                return <Tag color="blue">{value}</Tag>
            })

            let showTags: any;
            if (tags && tags.length > 2) {
                showTags = [...tags?.slice(0, 1), <Tag color="blue">...</Tag>];
            } else {
                showTags = tags;
            }
            const content = <Space>
                {tags}
            </Space>
            return <Popover content={content} title={"房号"}>
                {/*//只展示两个*/}
                {showTags}
            </Popover>
        },
    },
    {
        title: '备注', dataIndex: 'comment', key: 'comment', width: 150, editable: true,
        render: (_, record: UserDto) => {
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
]

export const UserTableDetail: React.FC = () => {
    const [editingKey, setEditingKey] = useState(null);
    const addOperationColumn = (column: TablePageColumn) => {
        return column.map(data => {
            return {
                ...data,
                onCell: (record: UserDto) => {
                    return {
                        record,
                        dataIndex: data.dataIndex,
                        title: data.title,
                        editable: data.editable,
                        editingKey,
                        setEditingKey,
                    }
                }
            }
        })
    }

    let {searchParam, touchSearch} = useSelector(state => state.userSlice);
    let [postFetch, {isFetching, data}, lastArg] = useLazySearchUserQuery();
    useEffect(() => {
        postFetch(new PaginateRequest(1, 10, TimeUtil.buildDateSearchParam(searchParam)));
    }, [touchSearch])

    let cellColumns = useCallback(() => addOperationColumn(columns), [editingKey]);

    return <Table columns={cellColumns() as ColumnTypes} dataSource={data?.data} loading={isFetching}
                  components={{
                      body: {
                          row: UserTableRow,
                          cell: UserTableCell
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