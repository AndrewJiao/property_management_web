import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, PaginateRequest, REQUEST_BASIC_PRICE} from "../../AxiosConf";
import {plainToInstance} from "class-transformer";

export interface BasicPriceState extends HttpBasicState {
    result: AppResult<DataType[]>;
    request?: PaginateRequest
}


interface DataType {
    key: number;
    name: string;
    priceNumber: number;
    comment: string;
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
}

export const thunkBasicPriceDataGet = createAsyncThunk(
    "basicPrice/getPage",
    async (param: PaginateRequest, thunkAPI) => {
        return await REQUEST_BASIC_PRICE.getData<DataType[]>(param.currentPage, param.pageSize)
            .then((e) => {
                return e.data
            })
    }
)

export const basicPriceSlice = createSlice({
    name: "basicPrice",
    initialState: default_pending(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(thunkBasicPriceDataGet.fulfilled,
            (state, action) => {
                return default_success(action.payload);
            })
            .addCase(thunkBasicPriceDataGet.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkBasicPriceDataGet.pending,
                (state) => {
                    return default_pending()
                })
    }

})