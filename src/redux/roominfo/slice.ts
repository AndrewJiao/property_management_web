import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, axiosAppendIdToKey, axiosGetContent, PaginateRequest,} from "../../axios";
import {REQUEST_ROOM_INFO, RoomInfoDetailSearchDto} from "../../axios/AxiosRoomInfo";
import {RootState} from "../store";

export interface RoomInfoData {
    id: number;
    roomNumber?: string;
    waterMeterNumBefore?: number;
    waterMeterNum?: number;
    waterMeterSub?: number;
    electricityMeterNumBefore?: number;
    electricityMeterNum?: number;
    electricityMeterSub?: number;
    monthVersion?: string;
    comment?: string;
    createBy?: string;
    updateBy?: string;
    createTime: Date;
    updateTime: Date;
}

export interface RoomInfoState extends HttpBasicState {
    result: AppResult<RoomInfoData[]>;
    request?: PaginateRequest<RoomInfoDetailSearchDto>
}
const defaultRoomInfoState: RoomInfoState = default_pending();


export const thunkRoomInfoDataGet = createAsyncThunk(
    "roomInfo/getPage",
    async (param: PaginateRequest<RoomInfoDetailSearchDto>, thunkAPI) => {
        if (param.searchParam === undefined) {
            let state = (thunkAPI.getState() as RootState).roomInfoSlice;
                param.searchParam = state.request?.searchParam;
        }

        return await REQUEST_ROOM_INFO.getData(param)
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
            .then(e => ({request: param, result: e}))
    }
)

export const thunkRoomInfoInit = createAsyncThunk(
    "roomInfo/init",
    async (_, thunkAPI) => {
        return await REQUEST_ROOM_INFO.initData()
            .then((_) =>
                thunkAPI.dispatch(thunkRoomInfoDataGet(new PaginateRequest<RoomInfoDetailSearchDto>())))
    }
)


export const roomInfoSlice = createSlice({
    name: "roomInfo",
    initialState: defaultRoomInfoState,
    reducers: {
        putDataResponseUpdate: (state, action) => {
            if (state.result.data) {
                let index = state.result.data.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.result.data[index] = action.payload;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkRoomInfoDataGet.fulfilled,
                (state, action) => {
                    return {request: action.payload.request, ...default_success(action.payload.result)};
                })
            .addCase(thunkRoomInfoDataGet.rejected,
                (state, action) => {
                    return {...state, ...default_reject(action.error.message)}
                })
            .addCase(thunkRoomInfoDataGet.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
            .addCase(thunkRoomInfoInit.fulfilled,
                (state, action) => {
                })
            .addCase(thunkRoomInfoInit.rejected,
                (state, action) => {
                    return {...state,...default_reject(action.error.message)}
                })
            .addCase(thunkRoomInfoInit.pending,
                (state) => {
                    return {...state, ...default_pending()}
                })
    }

})
