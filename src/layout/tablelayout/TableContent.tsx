import styles from './TableContent.module.css';
import React, {useEffect} from "react";
import {Button, Table, Typography} from "antd";
import {AutoRow, SearchColumn} from "../../component";
import {ColumnsType} from "antd/es/table";
import {useDispatch, useSelector} from "../../redux/hook";
import {BasicPriceState, thunkBasicPriceDataGet} from "../../redux/basicprice/slice";
import {PAGE_DEFAULT_PAGE_REQUEST} from "../../AxiosConf";


const columns: ColumnsType = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '基础价格',
        dataIndex: 'basicNumber',
        key: 'basicNumber',
    },
    {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
    {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
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


const executeSearch = () => {
}

export const TableContent: React.FC = () => {
    let dispatch = useDispatch();
    let state: BasicPriceState = useSelector(e => e.basicPriceSlice);
    useEffect(() => {
        dispatch(thunkBasicPriceDataGet(PAGE_DEFAULT_PAGE_REQUEST));
    }, [])


    return <>
        <div className={styles['content']}>
            <Typography.Title level={4}>基础价格</Typography.Title>
            <div className={styles['search-content']}>
                <AutoRow showBorder={false} perCountEachRow={4} subElements={[
                    <SearchColumn inputName={"房间号"} width={200}/>,
                    <SearchColumn inputName={"业主名称"} width={200}/>,
                ]}/>
            </div>
            <div className={styles['button-type']}>
                <Button style={{width: 80}} type={"primary"} onClick={executeSearch}>搜索</Button>
            </div>
            <div className={styles['table-content']}>
                {
                    state.errorMsg ? <div></div> :
                        <Table columns={columns} dataSource={state.result?.data}
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