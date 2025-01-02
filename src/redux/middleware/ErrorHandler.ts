import {message} from "antd";
import {ErrorResult} from "../../axios";
import {Simulate} from "react-dom/test-utils";


export const ErrorHandlerMiddleWare = (store) => (next) => (action) => {
    if (action.type.endsWith("/rejected")) {
        let statusCode = action?.payload?.status;

        //如果是401就跳转登陆页面
        if (statusCode === 401) {
            window.location.href = "/login";
        }
        alertError({message: action?.payload?.data.message || action.error?.message});
    }
    return next(action);
}

export async function alertError(errorResult: ErrorResult) {
    let alertMsg = `错误信息: ${errorResult.message}`;
    await message.error(alertMsg);
}

export default {ErrorHandlerMiddleWare, alertError}