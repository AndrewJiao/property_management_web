import React from "react";
import {onFindFetch, PageRowEditTable, TablePageColumn} from "../../component";
import {FormProps} from "antd";
import {axiosAppendIdToKey, axiosGetContent, PaginateRequest} from "../../axios";
import {useDispatch, useSelector} from "../../redux/hook";
import {RoomInfoData, roomInfoSlice, RoomInfoState, thunkRoomInfoDataGet} from "../../redux/roominfo/slice";
import {REQUEST_ROOM_INFO, RoomInfoDetailSearchDto, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";


const columns: TablePageColumn = [
    {
        title: "房主姓名",
        dataIndex: "roomOwnerName",
        key: "roomOwnerName",
        width: "20%",
    },
    {
        title: "房间号",
        dataIndex: "roomNumber",
        key: "roomNumber",
        sorter: true,
        width: "15%"
    },
    {
        title: "水表读数（前）",
        dataIndex: "waterMeterNumBefore",
        key: "waterMeterNumBefore",
        // sorter: (a, b) => a.waterMeterNumBefore - b.waterMeterNumBefore,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "水表读数（后）",
        dataIndex: "waterMeterNum",
        key: "waterMeterNum",
        // sorter: (a, b) => a.waterMeterNum - b.waterMeterNum,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "水表差值",
        dataIndex: "waterMeterSub",
        key: "waterMeterSub",
        // sorter: (a, b) => a.waterMeterSub - b.waterMeterSub,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "电表读数（前）",
        dataIndex: "electricityMeterNumBefore",
        key: "electricityMeterNumBefore",
        // sorter: (a, b) => a.electricityMeterNumBefore - b.electricityMeterNumBefore,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "电表读数（后）",
        dataIndex: "electricityMeterNum",
        key: "electricityMeterNum",
        // sorter: (a, b) => a.electricityMeterNum - b.electricityMeterNum,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "电表差值",
        dataIndex: "electricityMeterSub",
        key: "electricityMeterSub",
        // sorter: (a, b) => a.electricityMeterSub - b.electricityMeterSub,
        width: "15%",
        // render: (text) => <span>{text}</span>
    },
    {
        title: "月份版本",
        dataIndex: "monthVersion",
        key: "monthVersion",
        // sorter: true,
        // width: "20%"
    },
    {
        title: "备注",
        dataIndex: "comment",
        key: "comment",
        // width: "30%"
    },
    {
        title: "创建者",
        dataIndex: "createBy",
        key: "createBy",
        // sorter: true,
        // width: "15%"
    },
    {
        title: "更新者",
        dataIndex: "updateBy",
        key: "updateBy",
        // sorter: true,
        // width: "15%"
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        // sorter: (a, b) => new Date(a.createTime) - new Date(b.createTime),
        // width: "20%",
        // render: (text) => <span>{new Date(text).toLocaleString()}</span>
    },
    {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        // sorter: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
        // width: "20%",
        // render: (text) => <span>{new Date(text).toLocaleString()}</span>
    }
];

export const RoomInfoTable: React.FC = () => {
    // let [open, setOpen] = useState(false);
    let dispatch = useDispatch();
    let state: RoomInfoState = useSelector((e) => e.roomInfoSlice);

    const onFinishSearch: FormProps<RoomInfoData>['onFinish'] = (value) => {
        dispatch(thunkRoomInfoDataGet(new PaginateRequest<RoomInfoDetailSearchDto>()));
    };
    //开关抽屉
    // const openDraw = () => setOpen(!open);
    // const closeDraw = () => setOpen(false);
    // const onSaveDraw = (value: OwnerInfoInsertDto) => {
    //     dispatch(thunkOwnerInfoInsert(value))
    // }
    // const onDeleteRow = (id: number | string) => dispatch(thunkOwnerInfoDelete(Number(id)));
    const onFind: onFindFetch = (value, callback) => {
        REQUEST_ROOM_INFO.findData(value, RoomInfoSearchType.monthVersion)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }

    return <>
        {/*<SubmitDraw title={"新增住户"} open={open} onClose={closeDraw} onSave={onSaveDraw}/>*/}
        <PageRowEditTable title={`水电读数`}
                          columns={columns}
                          pageSearchAction={thunkRoomInfoDataGet}
                          onUpdateHandleSave={(record: RoomInfoData) => {
                              REQUEST_ROOM_INFO.putData(record.id.toString(), record)
                                  .then(axiosAppendIdToKey)
                                  .then(axiosGetContent)
                                  .then(e => dispatch(roomInfoSlice.actions.putDataResponseUpdate(e.data)))
                          }}
                          state={state}
            // onDelete={onDeleteRow}
        >
            <div></div>
            {/*<div className={styles['search-content']}>*/}
            {/*    <Form form={form} onFinish={onFinishSearch}>*/}
            {/*        <AutoRow showBorder={false} perCountEachRow={4} subElements={[*/}
            {/*            <Form.Item<OwnerInfoDto> name={"roomNumber"} label={`房号`} labelCol={{span: 4}} wrapperCol={{span: 4}}>*/}
            {/*                <Input placeholder={`请输入`} style={{width: 200}}/>*/}
            {/*            </Form.Item>,*/}
            {/*            <Form.Item<OwnerInfoDto> name={"ownerName"} label={`住户名称`} labelCol={{span: 4}}*/}
            {/*                                     wrapperCol={{span: 4}}>*/}
            {/*                <SearchInput placeholder={'请输入房间号'} fetch={onFind} style={{width: 200, textAlign: "left"}}/>*/}
            {/*            </Form.Item>,*/}
            {/*        ]}/>*/}
            {/*        <div className={styles['button-type']}>*/}
            {/*            <Form.Item>*/}
            {/*                <Button className={styles['button-styles']} type="primary" htmlType={"submit"}>*/}
            {/*                    搜索*/}
            {/*                </Button>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item>*/}
            {/*                <Button className={styles['button-styles']} type="dashed" htmlType={"reset"}>*/}
            {/*                    重置*/}
            {/*                </Button>*/}
            {/*            </Form.Item>*/}
            {/*            <Form.Item>*/}
            {/*                <Button className={styles['button-styles']} type="primary" htmlType={"button"}*/}
            {/*                        onClick={openDraw}>*/}
            {/*                    新增*/}
            {/*                </Button>*/}
            {/*            </Form.Item>*/}
            {/*        </div>*/}
            {/*    </Form>*/}
            {/*</div>*/}
        </PageRowEditTable>
    </>
}
