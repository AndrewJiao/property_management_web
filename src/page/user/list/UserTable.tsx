import React from "react";
import styles from "../../ownerfee/OwnerFeeTable.module.css";
import {Typography} from "antd";
import {OwnerFeeFormDetail} from "../../ownerfee/OwnerFeeFormDetail";
import {OwnerFeeTableDetail} from "../../ownerfee/OwnerFeeTableDetail";
import {UserTableDetail} from "./UserTableDetail";
import {UserFormDetail} from "./UserFormDetail";

export const UserTable: React.FC = () => {


    return <div className={styles['table-content']}>
        <Typography.Title level={4}>用户表</Typography.Title>
        <div className={styles['search-content']}>
            <UserFormDetail/>
        </div>
        <div className={styles['content']}>
            <UserTableDetail/>
        </div>
    </div>
}
