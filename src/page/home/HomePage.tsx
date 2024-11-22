import React from "react";
import {SideBarMenu} from "../../component";
import {MainLayout} from "../../layout";
import {Col, Row} from "antd";

/**
 * 构建主页面
 * @constructor
 */
export const HomePage: React.FC = () => {
    return <>
        <MainLayout>
            {/*<div style={{height: 700}}>*/}
            <Row>
                <Col span={3} style={{backgroundColor: "gray"}}>
                    <SideBarMenu/>
                </Col>
                <Col span={21}></Col>
            </Row>
            {/*</div>*/}
        </MainLayout>

    </>
}