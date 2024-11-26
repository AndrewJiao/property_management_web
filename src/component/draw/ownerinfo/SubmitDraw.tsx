import {Button, Col, Drawer, Form, Input, InputNumber, Row, Space, Typography} from "antd";
import React from "react";
import {useForm} from "antd/es/form/Form";
import {OwnerInfoInsertDto} from "../../../axios";
import {AutoRow} from "../../autorow";
import styles from './SubmitDraw.module.css'

const {TextArea} = Input;

interface Props {
    title: string,
    width?: number,
    open: boolean,
    onClose?: () => void,
    onSave: (item: OwnerInfoInsertDto) => void,
}

export const SubmitDraw: React.FC<Props> = ({title, width = 800, open, onClose, onSave}) => {
    let [form] = useForm<OwnerInfoInsertDto>();

    const onFinish = (submitValues: OwnerInfoInsertDto) => {
        onSave(submitValues);
        form.resetFields();
    }

    const onSubmit = () => {
        form.validateFields()
            .then(() => {
                form.submit();
                if (onClose) onClose();
            }).catch(() => {
            alert('请检查输入')
        })
    }
    const onReset = () => {
        form.resetFields();
    }
    return <>
        <Drawer title={title} width={width} open={open} onClose={onClose}
                extra={
                    <Space>
                        <Button onClick={onSubmit} type={"primary"}>提交</Button>
                        <Button onClick={onReset} type={"dashed"}>重置</Button>
                        <Button onClick={onClose}>关闭</Button>
                    </Space>
                }>
            <Form form={form}
                  onFinish={onFinish}
            >
                <Row>
                    <Col className={styles['form-input']} span={12}>
                        <Form.Item<OwnerInfoInsertDto> name={"roomNumber"} label={`房号`}
                                                       rules={[{required: true, message: '请输入房号'}]}
                        >
                            <Input placeholder={`请输入`}/>
                        </Form.Item>
                    </Col>
                    <Col className={styles['form-input']} span={12}>
                        <Form.Item<OwnerInfoInsertDto> name={"ownerName"} label={`住户名称`}
                                                       rules={[{required: true, message: '请输入住户名称'}]}
                        >
                            <Input placeholder={`请输入`}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['form-input']} span={16}>
                        <Form.Item<OwnerInfoInsertDto> name={"roomSquare"} label={`房间大小`}
                                                       rules={[{required: true, message: "请输入房间大小"}]}>
                            <InputNumber placeholder={`请输入`} addonAfter={"平方米"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['form-input']} span={6}>
                        <Form.Item<OwnerInfoInsertDto> name={["otherBasic", "carNumber"]} label={`汽车数量`}>
                            <InputNumber placeholder={`请输入`}/>
                        </Form.Item>
                    </Col>
                    <Col className={styles['form-input']} span={6}>
                        <Form.Item<OwnerInfoInsertDto> name={["otherBasic", "motorCycleNumber"]} label={`电动车数量`}>
                            <InputNumber placeholder={`请输入`}/>
                        </Form.Item>,
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['form-input']} span={20}>
                        <Form.Item<OwnerInfoInsertDto> name={"comment"} label={`备注`}>
                            <TextArea rows={8} placeholder={`不超过1000个字符`} maxLength={1000}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    </>
}