import React, {useState} from 'react';
import type {SelectProps} from 'antd';
import {Select} from 'antd';


export type onFindFetch = (value: string, callback: (data: { value: string; text: string }[]) => void) => void;

interface Props<T> {
    placeholder: string;
    style?: React.CSSProperties;
    fetch: onFindFetch;
    value?: T;

    onChange?(value: T): void
}

export const SearchInput: React.FC<Props<any>> = <T extends any>({
                                                                     placeholder,
                                                                     style,
                                                                     fetch,
                                                                     value,
                                                                     onChange,
                                                                 }: Props<T>) => {
    const [data, setData] = useState<SelectProps['options']>([]);
    // const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData);
    };
    // const handleChange = (newValue: string) => {
    //     setValue(newValue);
    // };
    return (
        <Select
            showSearch
            allowClear
            value={value}
            placeholder={placeholder}
            style={style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={onChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
        />
    );
};
