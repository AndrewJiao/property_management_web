import React, {useState} from 'react';
import {Button, Modal} from 'antd';

interface Props {
    onCompleted: (open: (flag: boolean) => void) => void,
    name: string,
    style?: React.CSSProperties,
    children: React.ReactNode
    className?: string,
}

export const TopicButton: React.FC<Props> = ({
                                                 children,
                                                 onCompleted,
                                                 name,
                                                 style,
                                                 className
                                             }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        onCompleted(setOpen);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (<>
        <Button className={className} style={style} type="primary" onClick={showModal}>
            {name}
        </Button>
        <Modal
            title={'选择初始化的数据版本'}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}>
            {children}
        </Modal>
    </>);
}

