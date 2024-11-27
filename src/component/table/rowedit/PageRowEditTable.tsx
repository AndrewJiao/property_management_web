import React, {ReactElement, useEffect} from "react";


import styles from './PageRowEditTable.module.css';
import {Table, Typography} from "antd";
import {useDispatch} from "../../../redux/hook";
import {PaginateRequest} from "../../../axios";
import {ColumnTypes, EditableAllRow, TablePageColumn} from "../index";
import {AsyncThunk} from "@reduxjs/toolkit";
import {HttpBasicState} from "../../../redux/HttpBasicState";

export enum EditingMark {
    editing,
    disEditing,
    normal
}


interface Props {
    title: string,
    children?: ReactElement,
    columns: TablePageColumn,
    pageSearchAction: AsyncThunk<any, any, any>,
    onUpdateHandleSave: (record: any) => void,
    onDelete?: (id: string | number) => void
    state: HttpBasicState,
}


//标记数据为编辑中
function markColumnEditing(id: any, dataSource: any[]) {
    dataSource?.map(e => e.editingMark = e.id === id ? EditingMark.editing : EditingMark.disEditing)
}

//标记数据为编辑完成
function markColumnNormal(dataSource: any[]) {
    dataSource?.map(e => e.editingMark = EditingMark.normal)
}

export const PageRowEditTable: React.FC<Props> = ({
                                                      columns,
                                                      title,
                                                      children,
                                                      pageSearchAction,
                                                      onUpdateHandleSave,
                                                      onDelete,
                                                      state,
                                                  }: Props) => {
    let dispatch = useDispatch();
    let dataSource: any[] = state.result?.data;
    markColumnNormal(dataSource)
    useEffect(() => {
        dispatch(pageSearchAction(new PaginateRequest()));
    }, [])

    function onEditMark(id) {
        if (id) {
            markColumnEditing(id, dataSource)
        } else {
            markColumnNormal(dataSource)
        }
    }

    //添加操作项
    columns = [...columns, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    }]


    const column = columns.map(col => {
        console.log(`col.editable`, col.editable)
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
                onEditingMark: onEditMark,
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
                               components={{
                                   body: {
                                       row: EditableAllRow,
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