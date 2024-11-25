import React, {FormEventHandler} from "react";
import {Input} from "antd";
import styles from './SearchColumn.module.css';

interface Props {
    width?: number,
    placeholder?: string,
    onInput?: FormEventHandler<HTMLInputElement>,
    inputName: string
}

export const SearchColumn: React.FC<Props> = ({width = 150, placeholder = "请输入", onInput, inputName}) => {
    return <>
        <div className={styles['search-content']}>
            <div className={styles['search-name']}>{inputName}</div>
            <Input placeholder={placeholder} style={{width: width}}/>,
        </div>
    </>
}
