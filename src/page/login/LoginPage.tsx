import React from "react";
import {BasicLayout} from "../../layout";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {UserLoginDto} from "../../redux/userinfo";
import FormItem from "antd/es/form/FormItem";
import styles from "./LoginPage.module.css"
import slice from "../../redux/auth/slice";
import {useDispatch} from "../../redux/hook";
import {useNavigate} from "react-router-dom";

/**
 * 登录页面
 * @constructor
 */
export const LoginPage: React.FC = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const onFinish = (values: UserLoginDto) => {
        dispatch(slice.thunkAuthLogin(values))
        //登录完成后跳转
        navigate('/home');
    }

    let [form] = useForm<UserLoginDto>()
    const LoginForm = () => {
        return <div className={styles['form-content']}>
            <Form form={form} onFinish={onFinish}>
                <FormItem<UserLoginDto> name={"account"} label={"账户"}
                                        rules={[{required: true, message: 'Please input your account!'}]}>
                    <Input placeholder={"请输入账号"}/>
                </FormItem>
                <FormItem<UserLoginDto> name={"password"} label={"密码"}
                                        rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input placeholder={"请输入密码"}/>
                </FormItem>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
    return <BasicLayout>
        <LoginForm/>
    </BasicLayout>
}