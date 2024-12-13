import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';

interface Props {
    onCompleted: () => void;
    name: string,
    style?: React.CSSProperties,
    children: React.ReactNode
    classNameButton?: string,
}

export const TopicButton: React.FC<Props> = ({
                                                 children,
                                                 onCompleted,
                                                 name,
                                                 style,
                                                 classNameButton
                                             }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setOpen(false);
        setConfirmLoading(false);
        onCompleted()
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (<>
            <Button className={classNameButton} style={style} type="primary" onClick={showModal}>
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
        </>
    );
};

