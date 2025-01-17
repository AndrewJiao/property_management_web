import React, {useState} from "react";
import {AutoRow, onFindFetch, PageTable, SearchInput, SubmitDraw, TablePageColumn} from "../../component";
import {Button, Form, FormProps, Input, Select} from "antd";
import {
    ownerInfoSlice,
    thunkOwnerInfoDataGet,
    thunkOwnerInfoDelete,
    thunkOwnerInfoInsert
} from "../../redux/ownerInfo/slice";
import {
    axiosAppendIdToKey,
    OwnerInfoDto,
    OwnerInfoInsertDto,
    OwnerInfoSearchDto,
    OwnerInfoSearchType,
    PaginateRequest,
    REQUEST_OWNER_INFO
} from "../../axios";
import {useDispatch, useSelector} from "../../redux/hook";
import {tableTimeRender} from "../../utils";
import styles from "./OwnerInfoTable.module.css";
import {useForm} from "antd/es/form/Form";


const columns: TablePageColumn = [
    {
        title: '房号',
        dataIndex: 'roomNumber',
        key: 'roomNumber',
        width: '7%',
    },
    {
        title: '住户名称',
        dataIndex: 'ownerName',
        key: 'ownerName',
        editable: true,
        width: '7%',
    },
    {
        title: '住户类型',
        dataIndex: 'roomType',
        key: 'roomType',
        width: '7%',
    },
    {
        title: '房间大小',
        dataIndex: 'roomSquare',
        key: 'roomSquare',
        editable: true,
        width: '8%',
        columnStyle: 'inputNumber',
        render: (text: number) => `${text} m²`
    },
    {
        title: '应收费用',
        dataIndex: 'amountBalance',
        key: 'amountBalance',
        width: '8%',
        columnStyle: 'inputNumber',
        render: (text: number) => `${text} ￥`
    },
    {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        editable: true,
        width: '10%'
    },
    {
        title: '汽车数量',
        dataIndex: 'otherBasic.carNumber',
        key: 'otherBasic.carNumber',
        editable: true,
        width: '7%',
        columnStyle:'inputNumber',
        render: (text) => text ? `${text} 辆` : ''
    },
    {
        title: '汽车数量(电)',
        dataIndex: 'otherBasic.carNumberElectron',
        key: 'otherBasic.carNumberElectron',
        editable: true,
        width: '7%',
        columnStyle:'inputNumber',
        render: (text) => text ? `${text} 辆` : ''
    },
    {
        title: '电动车数量',
        dataIndex: 'otherBasic.motorCycleNumber',
        key: 'otherBasic.motorCycleNumber',
        editable: true,
        width: '7%',
        columnStyle:'inputNumber',
        render: (text) => text ? `${text} 辆` : ''
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
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: tableTimeRender
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: tableTimeRender
    },
];

export const OwnerInfoTable: React.FC = () => {
    let [open, setOpen] = useState(false);
    let [form] = useForm<OwnerInfoSearchDto>();
    let dispatch = useDispatch();
    let state = useSelector((e) => e.ownerInfoSlice);

    const onFinishSearch: FormProps<OwnerInfoSearchDto>['onFinish'] = (value) => {
        let searchParam = new PaginateRequest<OwnerInfoSearchDto>();
        searchParam.searchParam = value
        dispatch(thunkOwnerInfoDataGet(searchParam));
    };
    //开关抽屉
    const openDraw = () => setOpen(!open);
    const closeDraw = () => setOpen(false);
    const onSaveDraw = (value: OwnerInfoInsertDto) => {
        dispatch(thunkOwnerInfoInsert(value))
    }
    const onDeleteRow = (id: number | string) => dispatch(thunkOwnerInfoDelete(Number(id)));
    const onFind: onFindFetch = (value, callback) => {
        REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.OwnerName)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }

    return <>
        <SubmitDraw title={"新增住户"} open={open} onClose={closeDraw} onSave={onSaveDraw}/>
        <PageTable title={`住户信息`}
                   columns={columns}
                   pageSearchAction={thunkOwnerInfoDataGet}
                   onUpdateHandleSave={(record: OwnerInfoDto) => {
                       REQUEST_OWNER_INFO.putData(record.id, record)
                           .then(e => {
                               let item = e.data.data;
                               item["otherBasic.carNumber"] = item.otherBasic.carNumber;
                               item["otherBasic.carNumberElectron"] = item.otherBasic.carNumberElectron;
                               item["otherBasic.motorCycleNumber"] = item.otherBasic.motorCycleNumber;
                               return e;
                           })
                           .then(axiosAppendIdToKey)
                           .then(e => {
                               dispatch(ownerInfoSlice.actions.putDataResponseUpdate(e.data.data))
                           })
                   }}
                   state={state}
                   onDelete={onDeleteRow}
        >
            <div className={styles['search-content']}>
                <Form form={form} onFinish={onFinishSearch}>
                    <AutoRow showBorder={false} perCountEachRow={4} subElements={[
                        <Form.Item<OwnerInfoSearchDto> name={"roomNumber"} label={`房号`} labelCol={{span: 4}}
                                                       wrapperCol={{span: 4}}>
                            <Input placeholder={`请输入`} style={{width: 200}}/>
                        </Form.Item>,
                        <Form.Item<OwnerInfoSearchDto> name={"ownerName"} label={`住户名称`} labelCol={{span: 4}}
                                                 wrapperCol={{span: 4}}>
                            <SearchInput placeholder={'请输入'} fetch={onFind} style={{width: 200, textAlign: "left"}}/>
                        </Form.Item>,
                        <Form.Item<OwnerInfoSearchDto> name={"roomType"} label={`住户类型`} labelCol={{span: 4}}
                                                       wrapperCol={{span: 12}}>
                            <Select mode={"multiple"}>
                                <Select.Option value={"Common"}>住户</Select.Option>
                                <Select.Option value={"Business"}>商用</Select.Option>
                            </Select>
                        </Form.Item>,
                    ]}/>
                    <div className={styles['button-type']}>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="primary" htmlType={"submit"}>
                                搜索
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="dashed" htmlType={"reset"}>
                                重置
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="primary" htmlType={"button"}
                                    onClick={openDraw}>
                                新增
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </PageTable>
    </>
}
