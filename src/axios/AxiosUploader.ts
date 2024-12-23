import {appInstance, AppResult} from "./AxiosConf";
import axios, {AxiosResponse} from 'axios'
import {TimeUtil} from "../utils";
import CryptoJS from 'crypto-js'
import {uuidv7} from "uuidv7";

const ossInstance = axios.create({
    timeout: 10000,
    baseURL:"https://property-manager-form.oss-cn-heyuan.aliyuncs.com"
});

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
    getOSSCredential: async (fileName: String | undefined) => {
        fileName = fileName || uuidv7();
        return appInstance.get<any, AxiosResponse<AppResult<SignatureDto>>>('attachment/init?fileName=' + fileName)
            .then(e => e.data.data)
    },
    uploaderOss: async (data: SignatureDto, file: File) => {
        let formData = new FormData();
        formData.append("success_action_status", "200");
        formData.append("policy", data.policy);
        formData.append("x-oss-signature", data.signature);
        formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        formData.append("x-oss-credential", data.credential);
        formData.append("x-oss-date", data.ossdate);
        formData.append("key", data.dir + file.name); // 文件名
        formData.append("x-oss-security-token", data.token);
        formData.append("file", file); // file 必须为最后一个表单域
        try {
            let _ = await ossInstance.post("", formData);
        }catch (e) {
            console.log("上传失败", JSON.stringify(e));
            alert(`上传失败${JSON.stringify(e)}`);
        }
    }
}


export interface SignatureDto {
    signature: string;
    policy: string;
    dir: string;
    host: string;
    credential: string;
    ossdate: string;
    version: string;
    token: string;
}



