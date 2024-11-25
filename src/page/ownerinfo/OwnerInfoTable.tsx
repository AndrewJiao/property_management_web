import React from "react";
import {AutoRow, PageTable, TablePageColumn} from "../../component";
import {Button, Form, FormProps, Input} from "antd";
import {ownerInfoSlice, thunkOwnerInfoDataGet} from "../../redux/ownerInfo/slice";
import {
    axiosAppendIdToKey,
    axiosGetContent,
    OwnerInfoDto,
    OwnerInfoSearchDto,
    PaginateRequest,
    REQUEST_OWNER_INFO
} from "../../axios";
import {useDispatch, useSelector} from "../../redux/hook";
import {tableTimeRender} from "../../utils/Time";
import styles from "./OwnerInfoTable.module.css";
import {useForm} from "antd/es/form/Form";


const columns: TablePageColumn = [
    {
        title: '房号',
        dataIndex: 'roomNumber',
        key: 'roomNumber',
        editable: true,
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
        title: '房间大小',
        dataIndex: 'roomSquare',
        key: 'roomSquare',
        editable: true,
        width: '7%',
        render: (text) => `${text} m²`
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
        render: (text) => text ? `${text} 辆` : ''
    },
    {
        title: '电动车数量',
        dataIndex: 'otherBasic.motorCycleNumber',
        key: 'otherBasic.motorCycleNumber',
        editable: true,
        width: '7%',
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
    let [form] = useForm<OwnerInfoSearchDto>();
    let dispatch = useDispatch();
    let state = useSelector((e) => e.ownerInfoSlice);


    const onFinish: FormProps<OwnerInfoSearchDto>['onFinish'] = (value) => {
        let searchParam = new PaginateRequest<OwnerInfoSearchDto>();
        searchParam.searchParam = {ownerName: "", roomNumber: "", ...value};
        dispatch(thunkOwnerInfoDataGet(searchParam));
    };
    return <>
        <PageTable title={`住户信息`}
                   columns={columns}
                   pageSearchAction={thunkOwnerInfoDataGet}
                   onUpdateHandleSave={(record: OwnerInfoDto) => {
                       REQUEST_OWNER_INFO.putData(record.id, record)
                           .then(e => {
                               let item = e.data.data;
                               item["otherBasic.carNumber"] = item.otherBasic.carNumber;
                               item["otherBasic.motorCycleNumber"] = item.otherBasic.motorCycleNumber;
                               return e;
                           })
                           .then(axiosAppendIdToKey)
                           .then(e => {
                               dispatch(ownerInfoSlice.actions.putDataResponseUpdate(e.data.data))
                           })
                   }}
                   state={state}
                   onExecuteSearch={() => {
                   }}
        >
            <div className={styles['search-content']}>
                <Form form={form}
                      onFinish={onFinish}
                >
                    <AutoRow showBorder={false} perCountEachRow={4} subElements={[
                        <Form.Item<OwnerInfoDto> name={"ownerName"} label={`住户名称`}
                                                 labelCol={{span: 4}}
                                                 wrapperCol={{span: 4}}>
                            <Input placeholder={`请输入`} style={{width: 200}}/>
                        </Form.Item>,
                        <Form.Item<OwnerInfoDto> name={"roomNumber"} label={`房号`}
                                                 labelCol={{span: 4}}
                                                 wrapperCol={{span: 4}}>
                            <Input placeholder={`请输入`} style={{width: 200}}/>
                        </Form.Item>,
                    ]}/>
                    <div className={styles['button-type']}>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="primary" htmlType={"submit"}>
                                搜索
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="primary" htmlType={"reset"}>
                                重置
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="primary" htmlType={"button"}>
                                新增
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </PageTable>
    </>
}