import {default_pending, default_reject, default_success, HttpBasicState} from "../HttpBasicState";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppResult, axiosAppendIdToKey, axiosGetContent, PaginateRequest,} from "../../axios";
import {REQUEST_ROOM_INFO, RoomInfoDetailResultDto, RoomInfoDetailSearchDto} from "../../axios/AxiosRoomInfo";
import {EditingMark} from "../../component";

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
    editingMark?: EditingMark;
}

export interface RoomInfoState extends HttpBasicState {
    result: AppResult<RoomInfoData[]>;
    request?: PaginateRequest<RoomInfoDetailSearchDto>
}


export const thunkRoomInfoDataGet = createAsyncThunk(
    "roomInfo/getPage",
    async (param: PaginateRequest<RoomInfoDetailSearchDto>, thunkAPI) => {
        return await REQUEST_ROOM_INFO.getData(param)
            .then(axiosAppendIdToKey)
            .then(axiosGetContent)
    }
)

export const thunkRoomInfoInit = createAsyncThunk(
    "roomInfo/postData",
    async (_, thunkAPI) => {
        return await REQUEST_ROOM_INFO.initData()
            .then((_) =>
                thunkAPI.dispatch(thunkRoomInfoDataGet(new PaginateRequest<RoomInfoDetailSearchDto>())))
    }
)


export const roomInfoSlice = createSlice({
    name: "roomInfo",
    initialState: default_pending(),
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
                    return default_success(action.payload);
                })
            .addCase(thunkRoomInfoDataGet.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkRoomInfoDataGet.pending,
                (state) => {
                    return default_pending()
                })
            .addCase(thunkRoomInfoInit.fulfilled,
                (state, action) => {
                })
            .addCase(thunkRoomInfoInit.rejected,
                (state, action) => {
                    return default_reject(action.error.message)
                })
            .addCase(thunkRoomInfoInit.pending,
                (state) => {
                    return default_pending()
                })
    }

})
