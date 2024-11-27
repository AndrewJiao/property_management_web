import React from "react";
import type {GetRef} from "antd";
import {Form} from "antd";

type FormInstance<T> = GetRef<typeof Form<T>>;
export const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Props {
    index: number,
}

export const EditableRow: React.FC<Props> = ({index, ...props}) => {
    let [form] = Form.useForm();
    return <>
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props}/>
            </EditableContext.Provider>
        </Form>
    </>
}
