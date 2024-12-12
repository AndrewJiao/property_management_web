import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AppResult,
    axiosAppendIdToKey,
    axiosGetContent,
    OwnerInfoDto,
    OwnerInfoInsertDto,
    OwnerInfoSearchDto,
    PaginateRequest,
    PriceBasicDto,
    REQUEST_OWNER_INFO,
} from "../../axios";
import {RootState} from "../store";

export interface OwnerInfoState extends HttpBasicState {
    result: AppResult<PriceBasicDto[]>;
    request?: PaginateRequest<OwnerInfoSearchDto>
}

const defaultOwnerInfoState: OwnerInfoState = default_pending();


export const thunkOwnerInfoDataGet = createAsyncThunk(
    "ownerInfo/getPage",
    async (param: PaginateRequest<OwnerInfoSearchDto>, thunkAPI) => {
        param.searchParam = param.searchParam || {roomNumber: "", ownerName: ""}
        if (param.searchParam === undefined) {
            let state = (thunkAPI.getState() as RootState).ownerInfoSlice;
            param.searchParam = state.request?.searchParam;
        }
        return await REQUEST_OWNER_INFO.getData<OwnerInfoDto[]>(param)
            .then(e => {
                e.data.data = e.data.data.map(e => ({
                    ...e,
                    "otherBasic.carNumber": e.otherBasic?.carNumber || 0,
                    "otherBasic.motorCycleNumber": e.otherBasic?.motorCycleNumber || 0,
                }))
                return e;
            })
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
            .then(e => ({request: param, result: e}))
    }
)

export const thunkOwnerInfoInsert = createAsyncThunk(
    "ownerInfo/postData",
    async (param: OwnerInfoInsertDto, thunkAPI) => {
        return await REQUEST_OWNER_INFO.postData(param)
            .then((e) =>
                thunkAPI.dispatch(thunkOwnerInfoDataGet(new PaginateRequest<OwnerInfoSearchDto>())))
    }
)

export const thunkOwnerInfoDelete = createAsyncThunk(
    "ownerInfo/deleteData",
    async (dataId: number, thunkAPI) => {
        return await REQUEST_OWNER_INFO.deleteData(dataId)
            .then((e) =>
                thunkAPI.dispatch(thunkOwnerInfoDataGet(new PaginateRequest<OwnerInfoSearchDto>())))
    }
)

export const ownerInfoSlice = createSlice({
    name: "ownerInfo",
    initialState: defaultOwnerInfoState,
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
            .addCase(thunkOwnerInfoDataGet.fulfilled,
                (state, action) => {
                    return {request: action.payload.request, ...default_success(action.payload.result)}
                })
            .addCase(thunkOwnerInfoDataGet.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkOwnerInfoDataGet.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
            .addCase(thunkOwnerInfoInsert.fulfilled,
                (state, action) => {
                })
            .addCase(thunkOwnerInfoInsert.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkOwnerInfoInsert.pending,
                (state) => {
                    return default_pending()
                })
            .addCase(thunkOwnerInfoDelete.fulfilled,
                (state, action) => {
                })
            .addCase(thunkOwnerInfoDelete.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkOwnerInfoDelete.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
    }

})
