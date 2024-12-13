import React, {useState} from "react";
import {Typography} from "antd";
import {OwnerFeeDetailSearchDto} from "../../redux/ownerfee";
import styles from './OwnerFeeTable.module.css';
import {OwnerFeeTableDetail} from "./OwnerFeeTableDetail";
import {OwnerFeeFormDetail} from "./OwnerFeeFormDetail";


export const OwnerFeeTable: React.FC = () => {

    const [searchParam, setSearchParam] = useState<OwnerFeeDetailSearchDto>({});

    return <>
        <Typography.Title level={4}>用户费用明细</Typography.Title>
        <div className={styles['search-content']}>
            <OwnerFeeFormDetail onFinishSearch={setSearchParam}/>
        </div>
        <div className={styles['table-content']}>
            <OwnerFeeTableDetail param={searchParam}/>
        </div>
    </>
}