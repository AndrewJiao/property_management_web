import React, {ReactNode} from "react";
import {Footer, Header, SideBarMenu} from "../../component";
import styles from './MainLayout.module.css'
import {Col, Row} from "antd";

class Props {
    children: ReactNode
}

/**
 * 构建主页面
 * @constructor
 */
export const MainLayout: React.FC<Props> = ({children}) => {
    return <>
        <Header/>
            <Row>
                <Col span={3} style={{backgroundColor: "gray"}}>
                    <SideBarMenu/>
                </Col>
                <Col span={21}>
                    <div className={styles['layout-content']}>
                        {children}
                    </div>
                </Col>
            </Row>
        <Footer/>
    </>
}
