import styles from './PriceBasic.module.css';
import React, {useEffect} from "react";
import {Table, Typography} from "antd";
import {useDispatch, useSelector} from "../../redux/hook";
import {basicPriceSlice, PriceBasicState, thunkBasicPriceDataGet} from "../../redux/basicprice/slice";
import {PaginateRequest, PriceBasicDto, REQUEST_PRICE_BASIC} from "../../axios";
import {ColumnTypes, EditableCell, EditableRow, TablePageColumn} from "../../component";
import {tableTimeRender} from "../../utils/Time";

const defaultColumns:TablePageColumn  = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        width: '15%',
    },
    {
        title: '基础价格',
        dataIndex: 'basicNumber',
        key: 'basicNumber',
        editable: true,
        width: '10%',
    },
    {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        editable: true,
        width: '15%',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: tableTimeRender
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: tableTimeRender

    },
    {
        title: '创建人',
        dataIndex: 'createBy',
        key: 'createBy',
    },
    {
        title: '修改人',
        dataIndex: 'updateBy',
        key: 'updateBy',
    },
];


export const PriceBasicTable: React.FC = () => {
    let dispatch = useDispatch();
    let state: PriceBasicState = useSelector(e => e.basicPriceSlice);
    useEffect(() => {
        dispatch(thunkBasicPriceDataGet(new PaginateRequest()));
    }, [])

    const column = defaultColumns.map(col => {
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
                handleSave: (record: PriceBasicDto) => {
                    REQUEST_PRICE_BASIC.putData<PriceBasicDto>(record.id, record)
                        //基于结果更新column
                        .then(e => {
                            dispatch(basicPriceSlice.actions.putDataResponseUpdate(e.data.data));
                        });
                }
            })
        }
    })
    return <>
        <div className={styles['content']}>
            <Typography.Title level={4}>基础价格</Typography.Title>
            {/*<div className={styles['search-content']}>*/}
            {/*    <AutoRow showBorder={false} perCountEachRow={4} subElements={[*/}
            {/*        <SearchColumn inputName={"房间号"} width={200}/>,*/}
            {/*        <SearchColumn inputName={"业主名称"} width={200}/>,*/}
            {/*    ]}/>*/}
            {/*</div>*/}
            {/*<div className={styles['button-type']}>*/}
            {/*    <Button style={{width: 80}} type={"primary"} onClick={executeSearch}>搜索</Button>*/}
            {/*</div>*/}
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
                                       dispatch(thunkBasicPriceDataGet({pageSize: size, currentPage: current}));
                                   },
                                   onChange: (page, pageSize) => {
                                       if (page && pageSize) {
                                           dispatch(thunkBasicPriceDataGet({pageSize: pageSize, currentPage: page}));
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