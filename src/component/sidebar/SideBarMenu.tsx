import React, {useState} from "react";
import styles from "./SideBar.module.css";
import {ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];


export const SideBarMenu: React.FC = () => {
    let navigate = useNavigate();
    const items: MenuItem[] = [
        {key: '1', icon: <PieChartOutlined/>, label: '基础价格', onClick: () => navigate("/priceBasic")},
        {key: '2', icon: <DesktopOutlined/>, label: '住户信息', onClick: () => navigate("/ownerInfo")},
        {key: '3', icon: <ContainerOutlined/>, label: '水电读数', onClick: () => navigate("/roomInfo")},
        {key: '4', icon: <ContainerOutlined/>, label: '物业费明细', onClick: () => navigate("/other")},
    ];

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
