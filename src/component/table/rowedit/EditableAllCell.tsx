import React, {PropsWithChildren, useContext} from "react";
import {Form, Input, InputNumber, Popconfirm, Typography} from "antd";
import {FormContext} from "./EditableAllRow";
import {EditingMark} from "./PageRowEditTable";


interface Props {
    title: React.ReactNode;
    editable: boolean
    dataIndex: any;
    record: any & { editingMark: boolean };
    onUpdateHandleSave: (record: any) => void,
    onDelete: (id) => void,
    //用于给外部修改dataSource,不传参数代表不编辑了
    onEditingMark: (id?) => void,
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
                                                                        ...props
                                                                    }) => {
    let childNode = children;
    let editingMark: EditingMark = record.editingMark;
    const form = useContext(FormContext)!;

    function onSave() {
        let values = form.validateFields();
        onUpdateHandleSave(values)
        onEditingMark()
    }

    //编辑操作项的场景
    if (dataIndex === 'operation') {
        if (editingMark === EditingMark.normal || editingMark === EditingMark.disEditing) {
            return <div>
                <Popconfirm disabled={editingMark === EditingMark.disEditing} title="确定要删除吗？"
                            onConfirm={() => onDelete(record.id)}>
                    <a>删除</a>
                </Popconfirm>
                {/*点击编辑，将这一行的数据设置为editing*/}
                <Typography.Link disabled={editingMark === EditingMark.disEditing} onClick={async () => {
                    onEditingMark(record.id)
                }}>
                    编辑
                </Typography.Link>
            </div>
        } else {
            return <div>
                <Typography.Link onClick={onSave}>保存</Typography.Link>
                <Popconfirm title="确定取消吗" onConfirm={() => onEditingMark()}>
                    <a>取消</a>
                </Popconfirm>
            </div>
        }

    } else {
        //编辑单元格的场景
        if (editable && editingMark !== EditingMark.normal) {
            childNode = <Form.Item
                style={{margin: 0, padding: 0}}
                name={dataIndex as string}
                rules={[
                    {required: false, message: `${title} is required.`},
                ]}
            >
                {
                    columnStyle === 'inputNumber' ?
                        <InputNumber/> :
                        <Input/>
                }
            </Form.Item>
        } else {
            childNode = <div>{children}</div>
        }
        return <td {...props}>{childNode}</td>
    }

}
