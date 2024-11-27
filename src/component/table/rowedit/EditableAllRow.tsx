import React from "react";
import {Form, FormInstance} from "antd";

interface Props {
}

export const FormContext = React.createContext<FormInstance<any> | null>(null);
export const EditableAllRow: React.FC<React.PropsWithChildren<Props>> = ({...props}) => {
    let [editForm] = Form.useForm();
    return <>
        <Form form={editForm} component={false}>
            <FormContext.Provider value={editForm}>
                <tr {...props}/>
            </FormContext.Provider>
        </Form>
    </>
}