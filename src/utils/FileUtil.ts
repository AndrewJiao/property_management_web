/**
 * 保存二进制文件
 * @param data
 */
import {decode} from "base-64";
import utf8 from "utf8";

export async function saveData(data: any, header: any) {
    let value: string = header['content-disposition'];
    let encodeFileName = value.split(';')[1]?.trim().split("=")[1]
    // let fileName = decode();
    let fileName = utf8.decode(decode(encodeFileName));
    let contentType = header["Content-Type"];
    let blob = new Blob([data],{type: contentType});
    alert(`保存文件${fileName}到文件夹`);
    // if ('showDirectoryPicker' in window) {
    //     const dirHandle = await(window as any).showDirectoryPicker();
    //     const fileHandle = await dirHandle.getFileHandle(fileName, {create: true});
    //     const writable = await fileHandle.createWritable();
    //     await writable.write(blob);
    //     await writable.close();
    // } else {
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // }
}

export const FileUtil = {saveData}