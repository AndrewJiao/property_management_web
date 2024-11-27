import React, {ReactElement, useEffect} from "react";


import styles from '../rowedit/PageRowEditTable.module.css';
import {Popconfirm, Table, Typography} from "antd";
import {useDispatch} from "../../../redux/hook";
import {PaginateRequest} from "../../../axios";
import {ColumnTypes, EditableCell, EditableRow, TablePageColumn} from "../../index";
import {AsyncThunk} from "@reduxjs/toolkit";
import {HttpBasicState} from "../../../redux/HttpBasicState";


interface Props<T> {
    title: string,
    children?: ReactElement,
    columns: TablePageColumn,
    pageSearchAction: AsyncThunk<any, any, any>,
    onUpdateHandleSave: (record: T) => void,
    onDelete?: (id: string | number) => void
    state: HttpBasicState,
}


export const PageTable: React.FC<Props<any>> = <T extends any>({
                                                                   columns,
                                                                   title,
                                                                   children,
                                                                   pageSearchAction,
                                                                   onUpdateHandleSave,
                                                                   onDelete,
                                                                   state,
                                                               }: Props<T>) => {
    let dispatch = useDispatch();
    let dataSource = state.result?.data;
    useEffect(() => {
        console.log(`page = ${JSON.stringify(pageSearchAction)}`)
        dispatch(pageSearchAction(new PaginateRequest()));
    }, [])

    if (onDelete) {
        //添加操作项
        columns = [...columns, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, record) =>
                (<Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
                    <a>删除</a>
                </Popconfirm>)
        }]
    }

    const column = columns.map(col => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                title: col.title,
                editable: col.editable,
                dataIndex: col.dataIndex,
                columnStyle: col.columnStyle,
                handleSave: onUpdateHandleSave,
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
                               components={{
                                   body: {
                                       cell: EditableCell,
                                       row: EditableRow,
                                   }
                               }}
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