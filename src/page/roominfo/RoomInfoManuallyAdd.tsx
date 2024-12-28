import {Button, Col, Divider, Drawer, Form, FormProps, Row, Space, Typography} from "antd";
import styles from './RoomInfoManuallyAdd.module.css';
import React, {PropsWithChildren, useState} from "react";
import {REQUEST_ROOM_INFO, RoomInfoDetailInsertDto, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";
import {useForm} from "antd/es/form/Form";
import {onFindFetch, SearchInput} from "../../component";
import {TupleInput} from "./RoomInfoTupleInput";
import {OwnerInfoSearchType, REQUEST_OWNER_INFO} from "../../axios";
import TextArea from "antd/es/input/TextArea";
import {Uploader} from "../../component/uploader/Uploader";
import {useDispatch} from "../../redux/hook";
import {thunkRoomInfoPost} from "../../redux/roominfo/slice";

interface Props {
    className?: string;
    style?: React.CSSProperties;
}

export const RoomInfoManuallyAdd: React.FC<PropsWithChildren<Props>> = ({className, style}) => {
    let [openState, setOpenState] = useState(false);
    let [form] = useForm<RoomInfoDetailInsertDto>();

    const onFind: onFindFetch = (value, callback) => {
        REQUEST_ROOM_INFO.findData<string[]>(value, RoomInfoSearchType.monthVersion)
            .then(values => callback(values.map(value => ({value: value, text: value}))))
    }

    const onFindRoom: onFindFetch = (value, callback) => {
        REQUEST_OWNER_INFO.findData(value, OwnerInfoSearchType.RoomNumber)
            .then(values => {
                callback(values.map(value => ({value: value, text: value})))
            })
    }

    let dispatch = useDispatch();
    //配置提交
    const onFinishAndSubmit: FormProps<RoomInfoDetailInsertDto>['onFinish'] = async (values) => {
        await form.validateFields()
        dispatch(thunkRoomInfoPost(values));
    }

    return (<div>
            <Button className={className} style={style} type={"primary"}
                    onClick={() => setOpenState(true)}>手动新增</Button>
            <Drawer width={800} title={"新增水电数据"} onClose={() => setOpenState(false)} open={openState}>
                <div className={styles['drawer-content']}>
                    {/*<Uploader/>*/}
                    <div className={styles["input-content"]}>
                        <Form form={form} onFinish={onFinishAndSubmit}>
                            <Divider orientation={"left"} type={"horizontal"}>
                                <Typography.Text aria-level={5}>房间</Typography.Text>
                            </Divider>
                            <Row>
                                <Col span={12}>
                                    <Form.Item<RoomInfoDetailInsertDto> name={'roomNumber'} label={"房间号"} rules={[{
                                        required: true,
                                        message: '请输入房间号'
                                    }]}
                                                                        labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                        <SearchInput placeholder={'请输入'} fetch={onFindRoom}
                                                     style={{width: 200, textAlign: "left"}}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item<RoomInfoDetailInsertDto> name={'monthVersion'} label={"数据版本"}
                                                                        rules={[{
                                                                            required: true,
                                                                            message: '请输入数据版本'
                                                                        }]}
                                                                        labelCol={{span: 4}} wrapperCol={{span: 12}}>
                                        <SearchInput placeholder={'请输入'} fetch={onFind}
                                                     style={{width: 200, textAlign: "left"}}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <TupleInput name={"水表"} beforeName={"waterMeterNumBefore"} afterName={"waterMeterNum"}/>
                            <TupleInput name={"电表"} beforeName={"electricityMeterNumBefore"}
                                        afterName={"electricityMeterNum"}/>
                            <Divider orientation={"left"} type={"horizontal"}>
                                <Typography.Text>其它</Typography.Text>
                            </Divider>
                            <Row>
                                <Col className={styles['form-input']} span={20}>
                                    <Form.Item<RoomInfoDetailInsertDto> name={"comment"} label={`备注`}>
                                        <TextArea rows={8} placeholder={`不超过1000个字符`} maxLength={1000}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{textAlign: "center"}}>
                                    <Button type={"primary"} htmlType={"submit"}>提交</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}


