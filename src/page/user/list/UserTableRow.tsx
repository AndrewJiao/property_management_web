import React, {createContext, PropsWithChildren} from "react";
import {UserUpdateDto} from "../../../redux/userinfo";
import {useForm} from "antd/es/form/Form";
import {Form, FormInstance} from "antd";

interface Props {
}

export const UserFormContext =React.createContext<FormInstance<UserUpdateDto> | null>(null);

export const UserTableRow: React.FC<PropsWithChildren<Props>> = ({...props}) => {
    let [form] = useForm();
    return <>
        <Form form={form} component={false}>
            <UserFormContext.Provider value={form}>
                <tr {...props} />
            </UserFormContext.Provider>
        </Form>
    </>
}