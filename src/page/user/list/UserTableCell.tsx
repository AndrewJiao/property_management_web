import React, {PropsWithChildren} from "react";
import {Button, Popconfirm, Typography} from "antd";
import {useDeleteUserMutation, UserDto, userSlice, userTableSlice} from "../../../redux/userinfo";
import {useDispatch, useSelector} from "../../../redux/hook";

interface Props {
    record: UserDto,
    dataIndex: string,
}

export const UserTableCell: React.FC<PropsWithChildren<Props>> = ({
                                                                          record,
                                                                          dataIndex,
                                                                          children,
                                                                          ...props
                                                                      }) => {
    const dispatch = useDispatch();
    const [deleteFetch] = useDeleteUserMutation()
    const Operation = () => {
        return <Popconfirm title="确定删除吗？"
                           onConfirm={() => {
                               deleteFetch(record.id)
                               dispatch(userSlice.actions.touchUpdate())
                           }}>
            <Typography.Link>删除</Typography.Link>
        </Popconfirm>
    }


    return <td {...props}>{
        dataIndex === 'operation' ? <Operation/> : <>{children}</>
    } </td>
}
