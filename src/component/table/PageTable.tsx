import React, {ReactElement, useEffect} from "react";


import styles from './PageTable.module.css';
import {Button, Table, TableProps, Typography} from "antd";
import {useDispatch} from "../../redux/hook";
import {AppResult, PaginateRequest, PriceBasicDto} from "../../axios";
import {AutoRow, EditableCell, EditableRow} from "../../component";
import {AsyncThunk} from "@reduxjs/toolkit";
import {HttpBasicState} from "../../redux/HttpBasicState";


interface Props<T> {
    title: string,
    children?: ReactElement,
    columns: TablePageColumn,
    pageSearchAction: AsyncThunk<any, any, any>,
    onUpdateHandleSave: (record: T) => void,
    onExecuteSearch: () => void,
    state: HttpBasicState,
}

export type ColumnTypes = Exclude<TableProps<PriceBasicDto>['columns'], undefined>;
export type TablePageColumn = (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

export const PageTable: React.FC<Props<any>> = <T extends any>({
                                                                   columns,
                                                                   title,
                                                                   children,
                                                                   pageSearchAction,
                                                                   onUpdateHandleSave,
                                                                   state,
                                                               }: Props<T>) => {
    let dispatch = useDispatch();
    useEffect(() => {
        console.log(`page = ${JSON.stringify(pageSearchAction)}`)
        dispatch(pageSearchAction(new PaginateRequest()));
        // dispatch(thunkBasicPriceDataGet(PAGE_DEFAULT_PAGE_REQUEST));
    }, [])

    const column = columns.map(col => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: PriceBasicDto) => ({
                record,
                title: col.title,
                editable: col.editable,
                dataIndex: col.dataIndex,
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
                        <Table columns={column as ColumnTypes} dataSource={state.result?.data}
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