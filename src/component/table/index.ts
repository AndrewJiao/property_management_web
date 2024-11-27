import {TableProps} from "antd";

export * from './celledit';
export * from './rowedit';

export type ColumnTypes = Exclude<TableProps<any>['columns'], undefined>;
export type TablePageColumn = (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    columnStyle?: ('input' | 'inputNumber')
})[];
