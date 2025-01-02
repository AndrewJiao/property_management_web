import React from "react";
import styles from "./ApproveTable.module.css";
import {Typography} from "antd";
import {ApproveTableDetail} from "./ApproveTableDetail";
import {ApproveFormDetail} from "./ApproveFormDetail";

export const ApproveTable: React.FC = () => {
    return <div className={styles['table-content']}>
        <Typography.Title level={4}>用户表</Typography.Title>
        <div className={styles['search-content']}>
            <ApproveFormDetail/>
        </div>
        <div className={styles['content']}>
            <ApproveTableDetail/>
        </div>
    </div>
}
