import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {message, UploadProps} from 'antd';
import {Button, Upload} from 'antd';
import {REQUEST_ATTACHMENT} from "../../axios/AxiosUploader";


/**
 * 上传组件
 */
export const Uploader: React.FC = () => {
    // let [oss, setOss] = useState<OssTokenDto>();
    // useEffect(() => {
    //     REQUEST_ATTACHMENT.getOSSCredential().then(oss => {
    //         setOss(oss);
    //     });
    // }, []);
    const props: UploadProps = {
        customRequest: async (options) => {
            let signatureDto = await REQUEST_ATTACHMENT.getOSSCredential(options.filename);
            let file = options.file;
            await REQUEST_ATTACHMENT.uploaderOss(signatureDto,file as File)
        },
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
    };

    return <Upload {...props}>
        <Button icon={<UploadOutlined/>}>快速新增</Button>
    </Upload>
}