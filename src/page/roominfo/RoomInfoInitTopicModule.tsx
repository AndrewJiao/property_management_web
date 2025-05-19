import React, {useEffect, useState} from 'react';
import {Button, Modal, Select, Space} from 'antd';
import {REQUEST_ROOM_INFO, RoomInfoSearchType} from "../../axios/AxiosRoomInfo";
import {SearchInput} from "../../component";

interface Props {
    onSelectCompleted: (versionRecord: string) => void;
    name: string,
    style?: React.CSSProperties,
}

export const RoomInfoInitTopicModal: React.FC<Props> = ({onSelectCompleted, name, style}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState<string | null>()


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

    const selector = <div style={{display: "flex", justifyContent: "center"}}>
        <SearchInput style={{width: 200}} placeholder={'请输入一个版本'} fetch={async (value, callback) => {
            let values = await REQUEST_ROOM_INFO.findData<string[]>(value, RoomInfoSearchType.monthVersion);
            let map = values.map(value => ({value: value, text: value}));
            map.push({value: value, text: value})
            callback(map);
        }} onChange={(e) => {
            setSelectedVersion(e);
        }}/>
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

