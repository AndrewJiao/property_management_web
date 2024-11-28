import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, axiosAppendIdToKey, axiosGetContent, PaginateRequest,} from "../../axios";
import {
    PropertyFeeDetailInitDto,
    PropertyFeeDetailSearchDto,
    PropertyFeeResultDto,
    REQUEST_PROPERTY_FEE
} from "../../axios/AxiosPropertyFee";
import {PropertyFeeTable} from "../../page";
import {RootState} from "../store";

export interface PropertyFeeState extends HttpBasicState {
    result: AppResult<PropertyFeeResultDto[]>;
    request?: PaginateRequest<PropertyFeeDetailSearchDto>
}


export const thunkPropertyFeeDataGet = createAsyncThunk(
    "propertyFee/getPage",
    async (param: PaginateRequest<PropertyFeeDetailSearchDto>, thunkAPI) => {
        return await REQUEST_PROPERTY_FEE.getData(param)
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
    }
)

export const thunkPropertyFeeInit = createAsyncThunk(
    "propertyFee/postData",
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
    initialState: default_pending(),
    reducers: {
        putDataResponseUpdate: (state, action) => {
            if (state.result.data) {
                let index = state.result.data.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    console.log(`action = ${JSON.stringify(action.payload)}`)
                    state.result.data[index] = action.payload;
                }
            }


        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkPropertyFeeDataGet.fulfilled,
                (state, action) => {
                    return default_success(action.payload);
                })
            .addCase(thunkPropertyFeeDataGet.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkPropertyFeeDataGet.pending,
                (state) => {
                    return default_pending()
                })
        // .addCase(thunkOwnerInfoInsert.fulfilled,
        //     (state, action) => {
        //     })
        // .addCase(thunkOwnerInfoInsert.rejected,
        //     (state, action) => {
        //         return default_reject(action.error.message)
        //     })
        // .addCase(thunkOwnerInfoInsert.pending,
        //     (state) => {
        //         return default_pending()
        //     })
        // .addCase(thunkOwnerInfoDelete.fulfilled,
        //     (state, action) => {
        //     })
        // .addCase(thunkOwnerInfoDelete.rejected,
        //     (state, action) => {
        //         return default_reject(action.error.message)
        //     })
        // .addCase(thunkOwnerInfoDelete.pending,
        //     (state) => {
        //         return default_pending()
        //     })
    }

})

export interface PropertyFeeDetailData {
    id: number;
    roomNumber?: string;
    roomOwnerName?: string;
    managementFee?: number;
    partFee?: number;
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
}
