import React from "react";
import styles from "./Header.module.css"
import {Button, Col, Row, Typography} from "antd";
import {useDispatch, useSelector} from "../../redux/hook";
import {useNavigate} from "react-router-dom";
import slice from "../../redux/auth/slice";

export const Header: React.FC = () => {
    let {name, isLogin} = useSelector(state => state.authSlice);
    let dispatch = useDispatch();
    let navigate = useNavigate()

    const Hello = () => {
        if (isLogin) {
            return <Row>
                <Col span={12} style={{display: "flex"}}>
                    <Typography.Text className={styles['header-text']}>你好!{name}</Typography.Text>
                </Col>
                <Col span={12} style={{display: "flex"}}>
                    <Button type="dashed" onClick={() => {
                        dispatch(slice.thunkAuthLogout())
                        navigate('/login')
                    }}>登出</Button>
                </Col>
            </Row>
        } else {
            return <Row>
                <Button type={"link"} onClick={() => navigate('/home')}>请登录</Button>
            </Row>
        }
    }
    return <>
        <div className={styles.header}>
            <div className={styles['header-box']}>
            </div>
            <div className={styles['header-box']}>
                <Typography.Title level={3} style={{margin: 0}}>海上明珠物业</Typography.Title>
            </div>
            <div className={styles['header-box']}>
                <Hello/>
            </div>
        </div>
    </>
}
