import React, {useEffect, useState} from 'react';
import {Button, Modal, Select, Space} from 'antd';
import {REQUEST_ROOM_INFO, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";

interface Props {
    onSelectCompleted: (versionRecord: string) => void;
    name: string,
    style?: React.CSSProperties,
}

export const PropertyFeeInitTopicModal: React.FC<Props> = ({onSelectCompleted, name, style}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [versionList, setVersionList] = useState<{ value: string, label: string }[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<string | null>()
    useEffect(() => {
        REQUEST_ROOM_INFO.findData("HSMZ-", RoomInfoSearchType.monthVersion)
            .then((e) => {
                setInitLoading(false);
                setVersionList(e.map(value => ({value: value, label: value})));
                setSelectedVersion(e[0] ?? null);
            });
    }, []);


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        console.log(`selectedVersion = ${selectedVersion}`)
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

    const selector = <div style={{display: "flex", justifyContent: "center"}}>
        <Select
            showSearch
            loading={initLoading}
            maxCount={10}
            placeholder="选择一个版本"
            defaultValue={versionList[0]?.value}
            options={versionList}
            onChange={(value) => setSelectedVersion(value)}
        />
    </div>
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
                {selector}
            </Modal>
        </>
    );
};

