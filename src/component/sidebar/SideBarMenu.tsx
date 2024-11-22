import React, {useState} from "react";
import styles from "./SideBar.module.css";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Menu} from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key: '1', icon: <PieChartOutlined/>, label: '基础价格'},
    {key: '2', icon: <DesktopOutlined/>, label: '住户信息'},
    {key: '3', icon: <ContainerOutlined/>, label: '水电读数'},
    {key: '4', icon: <ContainerOutlined/>, label: '物业费明细'},
];

export const SideBarMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={styles['bar-content']}>
            {/*<Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>*/}
            {/*    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}*/}
            {/*</Button>*/}
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
}
