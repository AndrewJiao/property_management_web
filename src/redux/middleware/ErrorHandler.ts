import {message} from "antd";
import {ErrorResult} from "../../axios";

export const ErrorHandlerMiddleWare = (store) => (next) => (action) => {
    if (action.type.endsWith("/rejected")) {
        let statusCode = action?.payload?.status;
        //如果是401就跳转登陆页面
        alertError({message: action.error?.message || action?.payload?.data});
    }
    return next(action);
}

export async function alertError(errorResult: ErrorResult) {
    let alertMsg = `错误信息: ${errorResult.message}`;
    await message.error(alertMsg);
}

export default {ErrorHandlerMiddleWare, alertError}