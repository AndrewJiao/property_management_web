import React, {useEffect} from "react";
import {AutoRow, onFindFetch, PageRowEditTable, SearchInput, TablePageColumn} from "../../component";
import {Button, DatePicker, Form, FormProps, Input} from "antd";
import {axiosAppendIdToKey, axiosGetContent, PaginateRequest} from "../../axios";
import {useDispatch, useSelector} from "../../redux/hook";
import {
    RoomInfoData,
    roomInfoSlice,
    RoomInfoState,
    thunkRoomInfoDataGet,
    thunkRoomInfoInit
} from "../../redux/roominfo/slice";
import {REQUEST_ROOM_INFO, RoomInfoDetailSearchDto, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";
import styles from './RoomInfoTable.module.css'
import {useForm} from "antd/es/form/Form";
import {buildDateSearchParam, defaultCurrentMonthRange} from "../../utils";
import dayjs from "dayjs";
import {RoomInfoManuallyAdd} from "./RoomInfoManuallyAdd";
import errorHandler from "../../redux/middleware/ErrorHandler";
import {RoomInfoInitTopicModal} from "./RoomInfoInitTopicModule";


const columns: TablePageColumn = [
    {
        title: "房主姓名",
        dataIndex: "roomOwnerName",
        key: "roomOwnerName",
        width: 100,
    },
    {
        title: "房间号",
        dataIndex: "roomNumber",
        key: "roomNumber",
        sorter: true,
        width: 100,
        fixed: 'left',
    },
    {
        title: "水表读数（前）",
        dataIndex: "waterMeterNumBefore",
        key: "waterMeterNumBefore",
        // sorter: (a, b) => a.waterMeterNumBefore - b.waterMeterNumBefore,
        width: 150,
        columnStyle: 'inputNumber',
        editable: true,
        // render: (text) => <span>{text}</span>
    },
    {
        title: "水表读数（后）",
        dataIndex: "waterMeterNum",
        key: "waterMeterNum",
        // sorter: (a, b) => a.waterMeterNum - b.waterMeterNum,
        width: 150,
        columnStyle: 'inputNumber',
        editable: true,
        // render: (text) => <span>{text}</span>
    },
    {
        title: "水表差值",
        dataIndex: "waterMeterSub",
        key: "waterMeterSub",
        // sorter: (a, b) => a.waterMeterSub - b.waterMeterSub,
        width: 150,
        columnStyle: 'inputNumber',
    },
    {
        title: "电表读数（前）",
        dataIndex: "electricityMeterNumBefore",
        key: "electricityMeterNumBefore",
        // sorter: (a, b) => a.electricityMeterNumBefore - b.electricityMeterNumBefore,
        width: 150,
        columnStyle: 'inputNumber',
        editable: true,
        // render: (text) => <span>{text}</span>
    },
    {
        title: "电表读数（后）",
        dataIndex: "electricityMeterNum",
        key: "electricityMeterNum",
        // sorter: (a, b) => a.electricityMeterNum - b.electricityMeterNum,
        width: 150,
        columnStyle: 'inputNumber',
        editable: true,
        // render: (text) => <span>{text}</span>
    },
    {
        title: "电表差值",
        dataIndex: "electricityMeterSub",
        key: "electricityMeterSub",
        // sorter: (a, b) => a.electricityMeterSub - b.electricityMeterSub,
        width: 150,
        columnStyle: 'inputNumber',
        // render: (text) => <span>{text}</span>
    },
    {
        title: "月份版本",
        dataIndex: "monthVersion",
        key: "monthVersion",
        // sorter: true,
        width: "200"
    },
    {
        title: "备注",
        dataIndex: "comment",
        key: "comment",
        editable: true,
        width: "300"
    },
    {
        title: "创建者",
        dataIndex: "createBy",
        key: "createBy",
        sorter: true,
        width: "100"
    },
    {
        title: "更新者",
        dataIndex: "updateBy",
        key: "updateBy",
        sorter: true,
        width: "100"
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        render: (text) => <span>{new Date(text).toLocaleString()}</span>,
        width: "200",
    },
    {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: "200",
        render: (text) => <span>{new Date(text).toLocaleString()}</span>
    }
];

export const RoomInfoTable: React.FC = () => {
    let [searchForm] = useForm<RoomInfoDetailSearchDto>();
    let dispatch = useDispatch();
    let state: RoomInfoState = useSelector((e) => e.roomInfoSlice);
    let [star, end] = defaultCurrentMonthRange().map(e => dayjs(e));
    useEffect(() => {
        searchForm.setFieldValue('createDateRange', [star, end])
    }, []);

    const onFinishSearch: FormProps<RoomInfoDetailSearchDto>['onFinish'] = (value) => {
        dispatch(thunkRoomInfoDataGet(new PaginateRequest<RoomInfoDetailSearchDto>(1, 10, buildDateSearchParam(value))));
    };

    const initData = (v: string) => {
        dispatch(thunkRoomInfoInit(v))
    }

    const onFind: onFindFetch = (value, callback) => {
        REQUEST_ROOM_INFO.findData<string[]>(value, RoomInfoSearchType.monthVersion)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }
    return <>
        <PageRowEditTable title={`水电读数`}
                          columns={columns}
                          pageSearchAction={thunkRoomInfoDataGet}
                          onUpdateHandleSave={(record: RoomInfoData) => {
                              REQUEST_ROOM_INFO.putData(record.id.toString(), record)
                                  .then(axiosAppendIdToKey)
                                  .then(axiosGetContent)
                                  .then(e => dispatch(roomInfoSlice.actions.putDataResponseUpdate(e.data)))
                                  .catch(e => errorHandler.alertError(e))
                          }}
                          state={state}
        >
            <div className={styles['search-content']}>
                <Form form={searchForm} onFinish={onFinishSearch}>
                    <AutoRow showBorder={false} perCountEachRow={2} subElements={[
                        <Form.Item<RoomInfoDetailSearchDto> name={"roomNumber"} label={`房号`} labelCol={{span: 4}}
                                                            wrapperCol={{span: 4}}>
                            <Input placeholder={`请输入`} style={{width: 200}}/>
                        </Form.Item>,
                        <Form.Item<RoomInfoDetailSearchDto> name={"monthVersion"} label={`月份版本`}
                                                            labelCol={{span: 4}}
                                                            wrapperCol={{span: 4}}>
                            <SearchInput placeholder={'请输入'} fetch={onFind} style={{width: 200, textAlign: "left"}}/>
                        </Form.Item>,
                        <Form.Item<RoomInfoDetailSearchDto> name="createDateRange" label={'创建时间'}
                                                            rules={[{required: true, message: '请选择时间'}]}
                                                            labelCol={{span: 4}}
                                                            wrapperCol={{span: 4}}>
                            <DatePicker.RangePicker style={{width: 300}}/>
                        </Form.Item>,
                        <Form.Item<RoomInfoDetailSearchDto> name="updateDateRange" label={'更新时间'}
                                                            labelCol={{span: 4}} wrapperCol={{span: 4}}>
                            <DatePicker.RangePicker style={{width: 300}}/>
                        </Form.Item>
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
                            {/*<Button className={styles['button-styles']} type="primary" htmlType={"button"}*/}
                            {/*        onClick={initData}>*/}
                            {/*    初始化*/}
                            {/*</Button>*/}
                            <RoomInfoInitTopicModal style={{marginBottom: 24, marginRight: 20}} name={'初始化'}
                                                       onSelectCompleted={initData}/>
                        </Form.Item>
                        <RoomInfoManuallyAdd className={styles['button-styles']}/>
                    </div>
                </Form>
            </div>
        </PageRowEditTable>
    </>
}
