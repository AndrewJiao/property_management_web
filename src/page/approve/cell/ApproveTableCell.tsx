import React, {PropsWithChildren} from "react";
import {ApproveDto} from "../../../redux/approve";
import {Button, Popconfirm, Space} from "antd";
import api from "../../../redux/approve/api";

interface Props {
    record: ApproveDto,
    dataIndex: string,
}

export const ApproveTableCell: React.FC<PropsWithChildren<Props>> = ({
                                                                         record,
                                                                         dataIndex,
                                                                         children,
                                                                         ...props
                                                                     }) => {

    let [postFetchChange] = api.useChangeStateMutation()
    const Operation = () => {
        //如果状态是pedding，就显示一个按钮，点击后调用dispatch
        if (record.approveState === 'Pending') {
            return <Space>
                <Button style={{padding: 0}} type={"link"} onClick={() => postFetchChange(
                    {
                        id: record.id,
                        arg: {approveState: 'Approved'}
                    }
                )}>通过</Button>
                <Button style={{padding: 0}} type={"link"} onClick={() => postFetchChange(
                    {
                        id: record.id,
                        arg: {approveState: 'Rejected'}
                    }
                )}>拒绝</Button>
            </Space>
        } else {
            return <div>--</div>
        }
    }
    return <td {...props}>{
        dataIndex === 'operation' ? <Operation/> : <>{children}</>
    } </td>
}
