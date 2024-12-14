import React from "react";
import {Typography} from "antd";
import styles from './OwnerFeeTable.module.css';
import {OwnerFeeTableDetail} from "./OwnerFeeTableDetail";
import {OwnerFeeFormDetail} from "./OwnerFeeFormDetail";


export const OwnerFeeTable: React.FC = () => {
    return <>
        <div className={styles['table-content']}>
            <Typography.Title level={4}>用户费用明细</Typography.Title>
            <div className={styles['search-content']}>
                <OwnerFeeFormDetail/>
            </div>
            <div className={styles['content']}>
                <OwnerFeeTableDetail/>
            </div>
        </div>
    </>
}