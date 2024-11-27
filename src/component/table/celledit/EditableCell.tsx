import React, {RefObject, useContext, useEffect, useRef, useState} from "react";
import {Form, Input, InputNumber, InputRef,} from "antd";
import {EditableContext} from "./EditableRow";


interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof any;
    record: any;
    handleSave: (record: any) => void;
    columnStyle?: ('input' | 'inputNumber');
}

export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
                                                                                       title,
                                                                                       editable,
                                                                                       children,
                                                                                       dataIndex,
                                                                                       columnStyle = 'input',
                                                                                       record,
                                                                                       handleSave,
                                                                                       ...restProps
                                                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement | InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing)
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            handleSave({...record, ...values});
            toggleEdit();
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0, padding: 0}}
                name={dataIndex as any}
                rules={[
                    {required: false, message: `${title} is required.`},
                ]}
            >
                {
                    columnStyle === 'inputNumber' ?
                        <InputNumber ref={inputRef as RefObject<HTMLInputElement>} onPressEnter={save} onBlur={save}/> :
                        <Input ref={inputRef as RefObject<InputRef>} onPressEnter={save} onBlur={save}/>
                }
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{padding: "5px", minHeight: 20}}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
