import React, {PropsWithChildren, useContext} from "react";
import {Form, Input, Popconfirm, Typography} from "antd";
import {useDeleteUserMutation, usePutUerMutation, UserDto, userSlice} from "../../../redux/userinfo";
import {useDispatch} from "../../../redux/hook";
import {UserFormContext} from "./UserTableRow";

interface Props {
    record: UserDto,
    dataIndex: string,
    editable: boolean
    editingKey: number | null,
    setEditingKey: (key: number | null) => void,
    title: string
}

export const UserTableCell: React.FC<PropsWithChildren<Props>> = ({
                                                                      record,
                                                                      dataIndex,
                                                                      children,
                                                                      editable,
                                                                      editingKey,
                                                                      setEditingKey,
                                                                      title,
                                                                      ...props
                                                                  }) => {
    const form = useContext(UserFormContext)!;
    const dispatch = useDispatch();
    const [deleteFetch] = useDeleteUserMutation()
    const onDelete = () => {
        deleteFetch(record.id)
        dispatch(userSlice.actions.touchUpdate())
    }
    let [putUser] = usePutUerMutation();

    async function onSave() {
        let values = await form.validateFields();
        putUser({id: record.id, arg: values})
        setEditingKey(null)
    }

    let childNode = children;
    console.log('editingKey', editingKey)
    if (dataIndex === 'operation') {
        if (editingKey !== record.id || editingKey === null) {
            childNode = (<div>
                {/*点击编辑，将这一行的数据设置为editing*/}
                <Typography.Link disabled={editingKey !== null && editingKey !== record.id}
                                 onClick={() => {
                                     console.log('edit record.id', record.id)
                                     return setEditingKey(record.id)
                                 }}
                                 style={{marginInlineEnd: 8}}
                >
                    编辑
                </Typography.Link>
                {onDelete ?
                    (<Popconfirm disabled={editingKey !== null && editingKey !== record.id} title="确定要删除吗？"
                                 onConfirm={() => onDelete()}>
                        <a>删除</a>
                    </Popconfirm>) : <></>
                }
            </div>)
        } else {
            //参与编辑的行
            childNode = <div>
                <Typography.Link onClick={() => form?.submit} style={{marginInlineEnd: 8}}> 保存 </Typography.Link>
                <Popconfirm title="确定取消吗" onConfirm={() => setEditingKey(null)}>
                    <a>取消</a>
                </Popconfirm>
            </div>
        }

    } else {
        //编辑单元格的场景
        if (editable && editingKey === record.id) {
            childNode = <Form.Item
                style={{margin: 0, padding: 0}}
                name={dataIndex as string}
                rules={[
                    {required: false, message: `${title} is required.`},
                ]}
            >
                {
                    <Input defaultValue={record[dataIndex]}/>
                }
            </Form.Item>
        } else {
            childNode = <div>{children}</div>
        }
    }

    return <td {...props}>{childNode} </td>
}
