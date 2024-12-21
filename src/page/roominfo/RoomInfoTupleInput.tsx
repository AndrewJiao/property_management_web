import React, {useState} from "react";
import {Col, Divider, Form, InputNumber, Row, Space, Typography} from "antd";
import {RoomInfoDetailInsertDto} from "../../axios/AxiosRoomInfo";

type ExceptNameType = 'electricityMeterNumBefore' | 'electricityMeterNum' | 'waterMeterNumBefore' | 'waterMeterNum'

interface Props {
    name:string
    beforeName: ExceptNameType,
    afterName: ExceptNameType,
}


export const TupleInput: React.FC<Props> = ({name, beforeName, afterName}) => {
    let [before, setBefore] = useState(0);
    let [after, setAfter] = useState(0);
    const diff = before - after;
    return <div>
        <Divider orientation={"left"} type={"horizontal"}>
            <Typography.Text>{name}</Typography.Text>
        </Divider>
        <Row>
            <Col span={8}>
                <Form.Item<RoomInfoDetailInsertDto> name={beforeName} label={"上月"} labelCol={{span: 8}}>
                    <InputNumber style={{width: 130}} onChange={(e) => setBefore(e as number)} placeholder={"请输入"}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item<RoomInfoDetailInsertDto> name={afterName} label={"本月"} labelCol={{span: 6}}>
                    <InputNumber style={{width: 130}} onChange={(e) => setAfter(e as number)}
                                 placeholder={"请输入"}/>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Space>
                    <Typography.Text style={{color: 'grey'}}>差值:</Typography.Text>
                    <InputNumber style={{width: 130}} value={diff} disabled={true}/>
                </Space>
            </Col>
        </Row>
    </div>
}
