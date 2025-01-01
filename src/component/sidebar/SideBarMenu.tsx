import React, {useState} from "react";
import styles from "./SideBar.module.css";
import {
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
    SettingOutlined,
    TableOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Menu, MenuProps} from 'antd';
import {useNavigate, useParams} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];


export const SideBarMenu: React.FC = () => {
    let navigate = useNavigate();
    let {tableType} = useParams<{ tableType: string }>();
    const items: MenuItem[] = [
        {key: 'basicSetting', icon: <SettingOutlined />, label: '基础配置', children: [
            {key: 'priceBasic', icon: <PieChartOutlined/>, label: '基础价格', onClick: () => navigate("/priceBasic")},
            {key: 'ownerInfo', icon: <DesktopOutlined/>, label: '住户信息', onClick: () => navigate("/ownerInfo")},
        ]
        },
        {key: 'formData', icon: <ContainerOutlined/>, label: '物业数据', children: [
                {key: 'roomInfo', icon: <TableOutlined />, label: '水电读数', onClick: () => navigate("/roomInfo")},
                {key: 'propertyFee', icon: <TableOutlined/>, label: '物业费明细', onClick: () => navigate("/propertyFee")},
                {key: 'ownerFee', icon: <TableOutlined/>, label: '业主费用明细', onClick: () => navigate("/ownerFee")},
            ]
        },
        {
            key: 'userData', icon: <UserOutlined/>, label: '权限配置', children: [
                {key: 'userInfo', icon: <TableOutlined/>, label: '用户列表', onClick: () => navigate("/userInfo")},
            ]
        },
    ];

    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={styles['bar-content']}>
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
