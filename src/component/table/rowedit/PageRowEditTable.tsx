import React, {ReactElement, useEffect, useState} from "react";


import styles from './PageRowEditTable.module.css';
import {Table, Typography} from "antd";
import {useDispatch} from "../../../redux/hook";
import {ColumnTypes, EditableAllCell, EditableAllRow, TablePageColumn} from "../index";
import {AsyncThunk} from "@reduxjs/toolkit";
import {HttpBasicState} from "../../../redux/HttpBasicState";
import {buildDateSearchParam, defaultCurrentMonthRange} from "../../../utils";


interface Props {
    title: string,
    children?: ReactElement,
    columns: TablePageColumn,
    pageSearchAction: AsyncThunk<any, any, any>,
    onUpdateHandleSave: (record: any) => void,
    onDelete?: (id: string | number) => void
    state: HttpBasicState,
    onTableChange?: (paginate, filter, sorter, extra) => void
}

export const PageRowEditTable: React.FC<Props> = ({
                                                      columns,
                                                      onTableChange,
                                                      title,
                                                      children,
                                                      pageSearchAction,
                                                      onUpdateHandleSave,
                                                      onDelete,
                                                      state,
                                                  }: Props) => {
    let dispatch = useDispatch();
    let dataSource: any[] = state.result?.data;
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        let [star, end] = defaultCurrentMonthRange();
        dispatch(pageSearchAction({
            currentPage: 1, pageSize: 10,
            searchParam: buildDateSearchParam({createDateRange: [star.toISOString(), end.toISOString()]}),
        }));
    }, [])

    //添加操作项
    columns = [...columns, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '10',
        fixed: 'right',
    }]

    const column = columns.map(col => {
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                title: col.title,
                editable: col.editable,
                dataIndex: col.dataIndex,
                columnStyle: col.columnStyle,
                onUpdateHandleSave: onUpdateHandleSave,
                onEditingMark: setEditingKey,
                editingKey: editingKey,
                onDelete: onDelete,
            })
        }
    })
    return <>
        <div className={styles['content']}>
            <Typography.Title level={4}>{title}</Typography.Title>
            {
                children
            }
            <div className={styles['table-content']}>
                {
                    state.errorMsg ? <div></div> :
                        <Table columns={column as ColumnTypes} dataSource={dataSource}
                               scroll={{x: 2000}}
                               components={{
                                   body: {
                                       cell: EditableAllCell,
                                       row: EditableAllRow,
                                   }
                               }}
                               onChange={onTableChange}
                               bordered
                               rowClassName={() => 'editable-row'}
                               pagination={{
                                   position: ["bottomCenter"],
                                   pageSize: state.result?.paginateResult.pageSize,
                                   current: state.result?.paginateResult.currentPage,
                                   total: state.result?.paginateResult.totalSize,
                                   showSizeChanger: true,
                                   onShowSizeChange: (current, size) => {
                                       dispatch(pageSearchAction({pageSize: size, currentPage: current}));
                                   },
                                   onChange: (page, pageSize) => {
                                       if (page && pageSize) {
                                           dispatch(pageSearchAction({pageSize: pageSize, currentPage: page}));
                                       }
                                   }
                               }}
                               loading={state.isLoading} rowKey={"key"}
                        />
                }
            </div>
        </div>
    </>

}