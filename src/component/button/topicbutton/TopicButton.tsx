import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';

interface Props {
    onSelectCompleted: (value: string) => void;
    onFetchingData: () => [{ value: string, label: string }]
    name: string,
    style?: React.CSSProperties,
    childern: React.ReactNode
}

export const TopicButton: React.FC<Props> = ({childern, onSelectCompleted, onFetchingData, name, style}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [versionList, setVersionList] = useState<{ value: string, label: string }[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<string | null>()
    useEffect(() => {
        let e = onFetchingData();
        setInitLoading(false);
        setVersionList(e);
        setSelectedVersion(e[0].value ?? null);
    }, []);


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (selectedVersion) {
            setConfirmLoading(true);
            onSelectCompleted(selectedVersion)
            setOpen(false);
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button style={style} type="primary" onClick={showModal}>
                {name}
            </Button>
            <Modal
                title={'选择初始化的数据版本'}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {childern}
            </Modal>
        </>
    );
};

