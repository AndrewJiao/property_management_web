import React, {useEffect, useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import {client, OssTokenDto, REQUEST_ATTACHMENT} from "../../axios/AxiosUploader";
import OSS from "ali-oss";


export const RoomInfoUploader: React.FC = () => {
    let [oss, setOss] = useState<OssTokenDto>();
    useEffect(() => {
        REQUEST_ATTACHMENT.getOSSCredential().then(oss => {
            setOss(oss);

        });
    }, []);
    let oss1 = new OSS({
        // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'yourregion',
        // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
        accessKeyId: "123",
        accessKeySecret: "123",
        // 填写Bucket名称。
        bucket: 'examplebucket',
    });

    console.log(`oss = ${JSON.stringify(oss1)}`);

    const props: UploadProps = {
        name: 'file1',
        action: oss?.host + '/form',
        headers: {...oss?.signatureHeads('/form', 'PUT')},
        method: 'PUT',
        async onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload: async (file) => {
            let oss = await REQUEST_ATTACHMENT.getOSSCredential();
            console.log(`oss = ${JSON.stringify(oss.signatureHeads('/form', 'PUT'))}`);
            setOss(oss)
        },
    };

    return <Upload {...props}>
        <Button icon={<UploadOutlined/>}>快速新增</Button>
    </Upload>
}