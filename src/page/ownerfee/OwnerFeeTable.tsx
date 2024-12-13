import React, {useState} from "react";
import {Typography} from "antd";
import {OwnerFeeDetailSearchDto} from "../../redux/ownerfee";
import styles from './OwnerFeeTable.module.css';
import {OwnerFeeTableDetail} from "./OwnerFeeTableDetail";
import {OwnerFeeFormDetail} from "./OwnerFeeFormDetail";


export const OwnerFeeTable: React.FC = () => {

    const [param, setParam] = useState<OwnerFeeDetailSearchDto>({});

    return <>
        <Typography.Title level={4}>用户费用明细</Typography.Title>
        <div className={styles['search-content']}>
            <OwnerFeeFormDetail onFinishSearch={setParam}/>
        </div>
        <div className={styles['table-content']}>
            {/*内部会绑定param作为state,param变更则table会更新查询*/}
            <OwnerFeeTableDetail param={param}/>
        </div>
    </>
}