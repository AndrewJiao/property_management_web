import {appInstance, AppResult} from "./AxiosConf";
import {AxiosResponse} from 'axios'
import {TimeUtil} from "../utils";
import CryptoJS from 'crypto-js'
import OSS from 'ali-oss';

export class OssTokenDto {
    constructor(ossHost: string, region: string, accessKeyId: string, accessKeySecret: string, bucket: string, stsToken: string) {
        this.region = region;
        this.ossHost = ossHost;
        this.accessKeyId = accessKeyId;
        this.accessKeySecret = accessKeySecret;
        this.bucket = bucket;
        this.stsToken = stsToken;
    }

    ossHost: string;
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    stsToken: string;

    get basicHeaders() {
        return {
            'x-oss-date': TimeUtil.getCurrentISOTimeStr(),
            'x-oss-security-token': this.stsToken,
        }
    }

    get host() {
        return `https://${this.ossHost}`
    }


    /**
     * 按照这个结构构建签名
     * Signature = base64(hmac-sha1(AccessKeySecret,
     * VERB + "\n"
     * + Content-MD5 + "\n"
     * + Content-Type + "\n"
     * + Date + "\n"
     * + CanonicalizedOSSHeaders
     * + CanonicalizedResource))
     * @param canonicalizedResource 资源路径
     * @param verb 请求方式
     */
    signatureHeads(canonicalizedResource: string, verb: 'GET' | 'PUT' | 'POST') {
        let basicHeaders = this.basicHeaders;
        let signature = '';
        let contentMD5 = '';
        let contentType = '';
        let date = basicHeaders["x-oss-date"];
        // let date = TimeUtil.getCurrentISOTimeStr();
        let canonicalizedOSSHeaders = {...basicHeaders};
        let stringToSign = verb + '\n' + contentMD5 + '\n' + contentType + '\n' + date + '\n' + canonicalizedOSSHeaders + '\n' + canonicalizedResource;


        const SECRET_IV = CryptoJS.enc.Utf8.parse(this.accessKeySecret); // IV长度通常与块大小相同，对于AES是16字节
        let wordArray = CryptoJS.SHA1(stringToSign, SECRET_IV);
        signature = CryptoJS.enc.Base64.stringify(wordArray);
        // signature = ""
        return {Authorization: "OSS" + this.accessKeyId + ":" + signature, ...basicHeaders}
    }
}

/**
 * 通过axios从后端获取初始化附件凭证
 */
export const REQUEST_ATTACHMENT = {
    getOSSCredential: async () => {
        return appInstance.get<any, AxiosResponse<AppResult<OssTokenDto>>>('attachment/init')
            .then(e => {
                let data = e.data.data;
                return new OssTokenDto(data.ossHost, data.region, data.accessKeyId, data.accessKeySecret, data.bucket, data.stsToken)
            })
    }
}


export const client = new OSS({
    // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'yourregion',
    // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
    accessKeyId: "",
    accessKeySecret: "",
    // 填写Bucket名称。
    bucket: 'examplebucket',
});

// 自定义请求头
const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'private',
    // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
    'Content-Disposition': 'attachment; filename="example.txt"',
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'true',
};

async function put() {
    try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await client.put('exampleobject.txt', null
            // 自定义headers
            , {headers}
        );
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}



