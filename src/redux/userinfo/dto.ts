import {DateRangeType} from "../../utils";
import {SelectProps} from "antd";
import {DetailType} from "../ownerfee";

export interface UserDto {
    id: number;
    accountId: string;
    account: string;
    password: string;
    name: string;
    roleType: RoleType;
    roleTypeDesc: string;
    createBy: string;
    updateBy: string;
    createTime: string; // Assuming chrono::NaiveDateTime is a string in TypeScript
    updateTime: string; // Assuming chrono::NaiveDateTime is a string in TypeScript
    comment?: string;
    bindingRoomNumber?: string[];
}

export enum RoleType {
    Manager = "Manager",
    SubManager = "SubManager",
    User = "User",
    Root = "Root",
}


export interface UserSearchDto extends DateRangeType {
    account?: string;
    name?: string;
    roleType?: RoleType;
    bindingRoomNumber?: string[];
}

export const roleTypeSelectProps = (): SelectProps['options'] => {
    return [
        {label: '管理员', value: RoleType.Manager},
        {label: '副管理员', value: RoleType.SubManager},
        {label: '用户', value: RoleType.User},
        {label: '超级管理员', value: RoleType.Root},
    ]
}


export interface UserUpdateDto {
    name: string;
    roleType: RoleType;
    comment?: string;
    bindingRoomNumber?: string[];
}

export interface UserCreateDto {
    accountId: string;
    account: string;
    password: string;
    name: string;
    roleType: RoleType;
    comment?: string;
    bindingRoomNumber?: string[];
}