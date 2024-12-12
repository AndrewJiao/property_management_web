import React, {useState} from "react";
import styles from "./SideBar.module.css";
import {ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate, useParams} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];


export const SideBarMenu: React.FC = () => {
    let navigate = useNavigate();
    let {tableType} = useParams<{ tableType: string }>();
    const items: MenuItem[] = [
        {key: 'priceBasic', icon: <PieChartOutlined/>, label: '基础价格', onClick: () => navigate("/priceBasic")},
        {key: 'ownerInfo', icon: <DesktopOutlined/>, label: '住户信息', onClick: () => navigate("/ownerInfo")},
        {key: 'roomInfo', icon: <ContainerOutlined/>, label: '水电读数', onClick: () => navigate("/roomInfo")},
        {key: 'propertyFee', icon: <ContainerOutlined/>, label: '物业费明细', onClick: () => navigate("/propertyFee")},
        {key: 'ownerFee', icon: <ContainerOutlined/>, label: '业主费用明细', onClick: () => navigate("/ownerFee")},
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
                defaultSelectedKeys={[tableType ?? 'priceBasic']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
}
