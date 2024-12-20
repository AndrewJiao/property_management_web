import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, axiosAppendIdToKey, axiosGetContent, PaginateRequest,} from "../../axios";
import {PropertyFeeDetailSearchDto, PropertyFeeResultDto, REQUEST_PROPERTY_FEE} from "../../axios/AxiosPropertyFee";
import {RootState} from "../store";
import {FileUtil} from "../../utils/FileUtil";
import assert from "node:assert";

export interface PropertyFeeState extends HttpBasicState {
    result: AppResult<PropertyFeeResultDto[]> | null;
    request?: PaginateRequest<PropertyFeeDetailSearchDto> | null;
}

const defaultPropertyFeeState: PropertyFeeState = {
    request: null,
    result: null,
    errorMsg: null,
    isLoading: true
}


export const thunkPropertyFeeDataGet = createAsyncThunk(
    "propertyFee/getPage",
    async (param: PaginateRequest<PropertyFeeDetailSearchDto>, thunkAPI) => {

        //如果请求中没有条件，则用state的条件附加上
        let state = (thunkAPI.getState() as RootState).propertyFeeSlice;
        if (param.searchParam === undefined) {
            param.searchParam = state.request?.searchParam;
        }
        //如果没有order,就带上order
        if (param.searchOrder === undefined) {
            param.searchOrder = state.request?.searchOrder;
        }
        return await REQUEST_PROPERTY_FEE.getData(param)
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
            .then(result => ({request: param, result}))
    }
)

export const thunkPropertyFeeDataExport = createAsyncThunk(
    "propertyFee/exportData",
    async (param: PaginateRequest<PropertyFeeDetailSearchDto>, thunkAPI) => {

        //如果请求中没有条件，则用state的条件附加上
        let state = (thunkAPI.getState() as RootState).propertyFeeSlice;
        if (param.searchParam === undefined) {
            param.searchParam = state.request?.searchParam;
        }
        //如果没有order,就带上order
        if (param.searchOrder === undefined) {
            param.searchOrder = state.request?.searchOrder;
        }
        return await REQUEST_PROPERTY_FEE.exportData(param)
            .then((result) => {
                let headers = result.headers;
                FileUtil.saveData(result.data, headers);
            });
    }
)

export const thunkPropertyFeeInit = createAsyncThunk(
    "propertyFee/initData",
    async (monthVersion: string, thunkAPI) => {
        return await REQUEST_PROPERTY_FEE.initData(monthVersion)
            .then((_) =>
                thunkAPI.dispatch(thunkPropertyFeeDataGet(new PaginateRequest<PropertyFeeDetailSearchDto>())))
    }
)

export const thunkPropertyFeeDelete = createAsyncThunk(
    "propertyFee/deleteData",
    async (dataId: number | string, thunkAPI) => {
        let state: PropertyFeeState = (thunkAPI.getState() as RootState).propertyFeeSlice;

        return await REQUEST_PROPERTY_FEE.deleteData(dataId)
            .then((_) => {
                return thunkAPI.dispatch(thunkPropertyFeeDataGet(state.request || new PaginateRequest<PropertyFeeDetailSearchDto>()));
            });
    }
)

export const propertyFeeSlice = createSlice({
    name: "propertyFee",
    initialState: defaultPropertyFeeState,
    reducers: {
        putDataResponseUpdate: (state, action) => {
            if (state.result?.data) {
                let index = state.result.data.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.result.data[index] = action.payload;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkPropertyFeeDataGet.fulfilled,
                (state, action) => {
                    return {request: action.payload.request, ...default_success(action.payload.result)};
                })
            .addCase(thunkPropertyFeeDataGet.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkPropertyFeeDataGet.pending,
                (state) => {
                    return {request: state.request, ...default_pending()};
                })
            .addCase(thunkPropertyFeeInit.fulfilled,
                (state, action) => {
                })
            .addCase(thunkPropertyFeeInit.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkPropertyFeeInit.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
            .addCase(thunkPropertyFeeDelete.fulfilled,
                (state, action) => {
                })
            .addCase(thunkPropertyFeeDelete.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkPropertyFeeDelete.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
    }

})

export interface PropertyFeeDetailData {
    id: number;
    roomNumber?: string;
    roomOwnerName?: string;
    managementFee?: number;
    partFee?: number;
    liftFee?: number;
    machineRoomRenovationFee?: number;
    electricFee?: number;
    electricShareFee?: number;
    waterFee?: number;
    waterShareFee?: number;
    liquidateFee?: number;
    preStoreFee?: number;
    recordVersion?: string;
    createBy?: string;
    updateBy?: string;
    createTime: Date;
    updateTime: Date;
    comment?: string;
    totalFee?: number;
    relatedOrderNumber: string,
}
