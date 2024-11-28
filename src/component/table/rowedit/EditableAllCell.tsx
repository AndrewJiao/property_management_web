import React, {PropsWithChildren, useContext} from "react";
import {Form, Input, InputNumber, Popconfirm, Typography} from "antd";
import {FormContext} from "./EditableAllRow";


interface Props {
    title: React.ReactNode;
    editable: boolean
    dataIndex: any;
    record: any & { editingMark: boolean };
    onUpdateHandleSave: (record: any) => void,
    onDelete: (id) => void,
    //用于给外部修改dataSource,不传参数代表不编辑了
    onEditingMark: (id?) => void,
    editingKey: string
    columnStyle?: ('input' | 'inputNumber');
}


export const EditableAllCell: React.FC<PropsWithChildren<Props>> = ({
                                                                        title,
                                                                        editable,
                                                                        children,
                                                                        onEditingMark,
                                                                        onUpdateHandleSave,
                                                                        onDelete,
                                                                        dataIndex,
                                                                        record,
                                                                        columnStyle,
                                                                        editingKey,
                                                                        ...props
                                                                    }) => {
    let childNode = children;
    const form = useContext(FormContext)!;

    async function onSave() {
        let values = await form.validateFields();
        onUpdateHandleSave({...record, ...values});
        onEditingMark()
    }

    //编辑操作项的场景
    if (dataIndex === 'operation') {
        if (editingKey !== record.id || editingKey === '') {
            childNode = (<div>
                {onDelete ?
                    (<Popconfirm disabled={editingKey !== '' && editingKey === record.id} title="确定要删除吗？"
                                 style={{marginInlineEnd: 8}}
                                 onConfirm={() => onDelete(record.id)}>
                        <a>删除</a>
                    </Popconfirm>) : <></>
                }
                {/*点击编辑，将这一行的数据设置为editing*/}
                <Typography.Link disabled={editingKey !== '' && editingKey === record.id}
                                 onClick={() => onEditingMark(record.id)}>
                    编辑
                </Typography.Link>
            </div>)
        } else {
            //参与编辑的行
            childNode = <div>
                <Typography.Link onClick={onSave} style={{marginInlineEnd: 8}}> 保存 </Typography.Link>
                <Popconfirm title="确定取消吗" onConfirm={() => onEditingMark()}>
                    <a>取消</a>
                </Popconfirm>
            </div>
        }

    } else {
        //编辑单元格的场景
        if (editable && editingKey === record.id) {
            childNode = <Form.Item
                style={{margin: 0, padding: 0}}
                name={dataIndex as string}
                rules={[
                    {required: false, message: `${title} is required.`},
                ]}
            >
                {
                    columnStyle === 'inputNumber' ?
                        <InputNumber defaultValue={record[dataIndex]}/> :
                        <Input defaultValue={record[dataIndex]}/>
                }
            </Form.Item>
        } else {
            childNode = <div>{children}</div>
        }
    }
    return <td {...props}>{childNode}</td>

}
