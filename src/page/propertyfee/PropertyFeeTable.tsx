import React, {useEffect} from "react";
import {AutoRow, onFindFetch, PageRowEditTable, SearchInput, TablePageColumn, TopicButton} from "../../component";
import {Button, DatePicker, Form, FormProps, Input} from "antd";
import {
    axiosAppendIdToKey,
    axiosGetContent,
    OwnerInfoSearchType,
    PaginateRequest,
    REQUEST_OWNER_INFO
} from "../../axios";
import {useDispatch, useSelector} from "../../redux/hook";
import {REQUEST_ROOM_INFO, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";
import styles from './PropertyFee.module.css'
import {useForm} from "antd/es/form/Form";
import {buildDateSearchParam, defaultCurrentMonthRange, tableTimeRender} from "../../utils";
import {
    PropertyFeeDetailData,
    propertyFeeSlice,
    PropertyFeeState, thunkPropertyFeeDataExport,
    thunkPropertyFeeDataGet,
    thunkPropertyFeeDelete,
    thunkPropertyFeeInit
} from "../../redux/propertyfee/slice";
import {PropertyFeeDetailSearchDto, PropertyFeeResultDto, REQUEST_PROPERTY_FEE} from "../../axios/AxiosPropertyFee";
import {PropertyFeeInitTopicModal} from "./PropertyFeeInitTopicModal";
import dayjs from "dayjs";
import {InitOwnerFeeButton} from "./PropertyFeeInitOwnerFee";
import {DetailType, useCreateOwnerFeeDataMutation} from "../../redux/ownerfee";

//为费用单号添加按钮
const RenderButton = (props: { text: string, record: PropertyFeeResultDto }) => {
    let [fetchRelateOrder, {isLoading, data, isSuccess}] = useCreateOwnerFeeDataMutation({});
    if (props.text || isSuccess) {
        return <>{isSuccess ? data?.data?.streamId : props.text}</>
    } else {
        return <Button loading={isLoading} disabled={isLoading} type={"default"} onClick={() => {
            //校验费用是否都全
            fetchRelateOrder({
                roomNumber: props.record.roomNumber,
                version: props.record.recordVersion,
                detailType: DetailType.ManagementFee
            });
        }}>创建费用</Button>
    }
}


const columns: TablePageColumn = [

    {title: '房号', dataIndex: 'roomNumber', key: 'roomNumber'},
    {title: '房主姓名', dataIndex: 'roomOwnerName', key: 'roomOwnerName'},
    {title: '费用单号', dataIndex: 'relatedOrderNumber', key: 'relateOrderNumber', width: '150px',},
    {title: '管理费', dataIndex: 'managementFee', key: 'managementFee', editable: true},
    {title: '停车费', dataIndex: 'partFee', key: 'partFee', editable: true},
    {title: '电梯费', dataIndex: 'liftFee', key: 'liftFee', editable: true},
    {title: '机房装修费', dataIndex: 'machineRoomRenovationFee', key: 'machineRoomRenovationFee', editable: true},
    {title: '电费', dataIndex: 'electricFee', key: 'electricFee', editable: true},
    {title: '电费分摊', dataIndex: 'electricShareFee', key: 'electricShareFee', editable: true},
    {title: '水费', dataIndex: 'waterFee', key: 'waterFee', editable: true},
    {title: '水费分摊', dataIndex: 'waterShareFee', key: 'waterShareFee', editable: true},
    {title: '违约金', dataIndex: 'liquidateFee', key: 'liquidateFee', editable: true},
    {title: '预存费', dataIndex: 'preStoreFee', key: 'preStoreFee', editable: true},
    {title: '备注', dataIndex: 'comment', key: 'comment', editable: true},
    {title: '总费用', dataIndex: 'totalFee', key: 'totalFee'},
    {title: '记录版本', dataIndex: 'recordVersion', key: 'recordVersion'},
    {title: '创建者', dataIndex: 'createBy', key: 'createBy'},
    {title: '更新者', dataIndex: 'updateBy', key: 'updateBy'},
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


export const PropertyFeeTable: React.FC = () => {
    let [searchForm] = useForm<PropertyFeeDetailSearchDto>();
    let dispatch = useDispatch();
    let state: PropertyFeeState = useSelector((e) => e.propertyFeeSlice);
    let [star, end] = defaultCurrentMonthRange().map(e => dayjs(e));
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', [star, end])
    }, []);

    const onFinishSearch: FormProps<PropertyFeeDetailSearchDto>['onFinish'] = (value) => {
        dispatch(thunkPropertyFeeDataGet(new PaginateRequest<PropertyFeeDetailSearchDto>(1, 10, buildDateSearchParam(value))));
    };
    const onDelete = (id: string | number) => {
        dispatch(thunkPropertyFeeDelete(id))
    }
    const initDataVersion = (monthVersion: string) => {
        dispatch(thunkPropertyFeeInit(monthVersion))
    }
    const onFindRecord: onFindFetch = (value, callback) => {
        REQUEST_ROOM_INFO.findData(value, RoomInfoSearchType.monthVersion)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }
    const onFindName: onFindFetch = (value, callback) => {
        REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.OwnerName)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }

    columns[2].render = (text, record) => {
        return <RenderButton text={text} record={record}/>
    }
    return <>
        <PageRowEditTable title={`物业费明细`}
                          columns={columns}
                          pageSearchAction={thunkPropertyFeeDataGet}
                          onDelete={onDelete}
                          onUpdateHandleSave={(record: PropertyFeeDetailData) => {
                              REQUEST_PROPERTY_FEE.putData(record.id.toString(), record)
                                  .then(axiosAppendIdToKey)
                                  .then(axiosGetContent)
                                  .then(e => dispatch(propertyFeeSlice.actions.putDataResponseUpdate(e.data)))
                          }} state={state}>
            <div className={styles['search-content']}>
                <Form form={searchForm} onFinish={onFinishSearch}>
                    <AutoRow showBorder={false} perCountEachRow={3} subElements={[
                        <Form.Item<PropertyFeeDetailSearchDto> name={"roomNumber"} label={`房号`} labelCol={{span: 4}}
                                                               wrapperCol={{span: 4}}>
                            <Input placeholder={`请输入`} style={{width: 200}}/>
                        </Form.Item>,
                        <Form.Item<PropertyFeeDetailSearchDto> name={"roomOwnerName"} label={`业主姓名`}
                                                               labelCol={{span: 4}}
                                                               wrapperCol={{span: 4}}>
                            <SearchInput placeholder={'请输入'} fetch={onFindName}
                                         style={{width: 200, textAlign: "left"}}/>
                        </Form.Item>,
                        <Form.Item<PropertyFeeDetailSearchDto> name={"recordVersion"} label={`记录版本`}
                                                               labelCol={{span: 4}}
                                                               wrapperCol={{span: 4}}>
                            <SearchInput placeholder={'请输入'} fetch={onFindRecord}
                                         style={{width: 200, textAlign: "left"}}/>
                        </Form.Item>,
                        <Form.Item<PropertyFeeDetailSearchDto> name="createDateRange" label={'创建时间'}
                                                               labelCol={{span: 4}}
                                                               wrapperCol={{span: 4}}>
                            <DatePicker.RangePicker style={{width: 300}}/>
                        </Form.Item>,
                        <Form.Item<PropertyFeeDetailSearchDto> name="updateDateRange" label={'更新时间'}
                                                               labelCol={{span: 4}} wrapperCol={{span: 4}}>
                            <DatePicker.RangePicker style={{width: 300}}/>
                        </Form.Item>
                    ]}/>
                    <div className={styles['button-type']}>
                        <Form.Item style={{display: "inline-flex"}}>
                            <Button className={styles['button-styles']} type="primary" htmlType={"submit"}>
                                搜索
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles['button-styles']} type="dashed" htmlType={"reset"}>
                                重置
                            </Button>
                        </Form.Item>
                        <PropertyFeeInitTopicModal style={{marginBottom: 24, marginRight: 20}} name={'初始化'}
                                                   onSelectCompleted={initDataVersion}/>
                        <InitOwnerFeeButton style={{marginBottom: 24, marginRight: 20}} name={"生成费用"}/>
                        <Button className={styles['button-styles']} style={{marginBottom: 24}} type="primary"
                                onClick={() => {
                                    dispatch(thunkPropertyFeeDataExport(new PaginateRequest<PropertyFeeDetailSearchDto>()))
                                }}>
                            导出
                        </Button>
                    </div>
                </Form>
            </div>
        </PageRowEditTable>
    </>
}
